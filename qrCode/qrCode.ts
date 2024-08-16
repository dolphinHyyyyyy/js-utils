// #region 对外接口

/**
 * 生成一个 SVG 格式二维码
 * @param data 二维码的内容
 * @param options 附加选项
 */
export function createQRCodeSVG(data: string, options: QRCodeOptions = {}) {
	return renderSVG(createQRCode(data, options.errorCorrectionLevel, options.version, options.maskPattern).modules, options)
}

/** 生成二维码的选项 */
export interface QRCodeOptions {
	/** 容错等级 */
	errorCorrectionLevel?: ErrorCorrectionLevel
	/** 版本（1-40） */
	version?: number
	/** 掩码（1-7） */
	maskPattern?: number
	/** 图片宽度 */
	width?: number
	/** 图片内边距 */
	padding?: number
	/** 使用的深色 */
	darkColor?: string
	/** 使用的淡色，如果为 `"transparent"` 则无背景色 */
	lightColor?: string
	/** 插入的品牌图地址 */
	logo?: string
	/** 插入的品牌图宽度 */
	logoWidth?: number
	/** 插入的品牌图高度 */
	logoHeight?: number
	/** 插入的品牌图背景色，如果为 `"transparent"` 则无背景色 */
	logoBackgroundColor?: string
	/** 插入的品牌图背景圆角 */
	logoBorderRadius?: number
	/** 插入的品牌图内边距 */
	logoPadding?: number
}

/** 表示二维码容错等级 */
export const enum ErrorCorrectionLevel {
	/** 低(7%) */
	L = 1,
	/** 中(15%) */
	M = 0,
	/** 中高(25%) */
	Q = 3,
	/** 高(30%) */
	H = 2
}

/** 表示二维码编码模式 */
export const enum EncodingMode {
	/** 纯数字 */
	numeric = 0b1,
	/** 数字或字母（大写 A-Z）或符号（空格、$、%、*、+、-、.、/、:） */
	alphanumeric = 0b10,
	/** 字节 */
	byte = 0b100,
}

/**
 * 将 SVG 图片转换为地址
 * @param svgString SVG 图片源码
 */
export function svgToURL(svgString: string) {
	return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`
}

// #endregion

// #region 生成数据

/**
 * 创建一个二维码数据
 * @param data 要包含的数据
 * @param errorCorrectionLevel 容错等级
 * @param version 版本（1-40），默认根据数据自动推导
 * @param maskPattern 掩码（1-7），默认根据数据自动推导
 * @param mode 使用的数据编码，默认根据数据自动推导
 */
export function createQRCode(data: string, errorCorrectionLevel = ErrorCorrectionLevel.Q, version?: number, maskPattern?: number, mode = getBestEncodingMode(data)) {
	// 1) 根据数据实际长度，推导最合适的版本
	const encodedByteLength = getEncodedByteLength(data, mode)
	if (version === undefined) {
		for (version = 1; version < 40; version++) {
			const usableBitCount = getDataByteLength(version, errorCorrectionLevel) * 8 - 4 - getLengthBitCount(version, mode)
			const usableByteLength = Math.floor(mode === EncodingMode.numeric ? (usableBitCount / 10) * 3 : mode === EncodingMode.alphanumeric ? (usableBitCount / 11) * 2 : usableBitCount / 8)
			if (encodedByteLength <= usableByteLength) {
				break
			}
		}
	}
	const totalByteLength = getTotalByteLength(version)
	const dataByteLength = getDataByteLength(version, errorCorrectionLevel)
	const dataBitCount = dataByteLength * 8

	// 2) 生成数据区
	const bitBuffer = new Uint8Array(dataByteLength) as BitBuffer
	bitBuffer.bitCount = 0
	// 模式标记
	writeBitsToBitBuffer(bitBuffer, mode, 4)
	// 字符长度
	writeBitsToBitBuffer(bitBuffer, encodedByteLength, getLengthBitCount(version, mode))
	// 数据
	writeData(bitBuffer, data, mode)
	// 结束符
	if (bitBuffer.bitCount + 4 <= dataBitCount) {
		writeBitsToBitBuffer(bitBuffer, 0, 4)
	}
	// 对齐至字节
	const extraBit = bitBuffer.bitCount % 8
	if (extraBit !== 0) {
		bitBuffer.bitCount += 8 - extraBit
	}
	// 剩余的空白位置
	const remainingByte = (dataBitCount - bitBuffer.bitCount) / 8
	for (let i = 0; i < remainingByte; i++) {
		writeByteToBitBuffer(bitBuffer, i & 1 ? 0b00010001 : 0b11101100)
	}

	// 3) 生成恢复区
	const ecBlockCount = getErrorCorrectionBlockCount(version, errorCorrectionLevel)
	const blockCountInGroup2 = totalByteLength % ecBlockCount
	const blockCountInGroup1 = ecBlockCount - blockCountInGroup2

	const totalByteLengthInGroup1 = Math.floor(totalByteLength / ecBlockCount)
	const dataByteLengthInGroup1 = Math.floor(dataByteLength / ecBlockCount)
	const dataByteLengthInGroup2 = dataByteLengthInGroup1 + 1

	const ecByteLengthInGroup1 = totalByteLengthInGroup1 - dataByteLengthInGroup1

	const dcData = new Array<Uint8Array>(ecBlockCount)
	const ecData = new Array<Uint8Array>(ecBlockCount)
	let maxDataSize = 0
	const rs = new ReedSolomonEncoder(ecByteLengthInGroup1)
	let offset = 0
	for (let b = 0; b < ecBlockCount; b++) {
		const dataSize = b < blockCountInGroup1 ? dataByteLengthInGroup1 : dataByteLengthInGroup2
		ecData[b] = rs.encode(dcData[b] = bitBuffer.slice(offset, offset + dataSize))
		offset += dataSize
		if (dataSize > maxDataSize) {
			maxDataSize = dataSize
		}
	}

	// 4) 合并数据区和恢复区
	const dataBits = new Uint8Array(totalByteLength)
	let index = 0
	for (let i = 0; i < maxDataSize; i++) {
		for (let r = 0; r < ecBlockCount; r++) {
			if (i < dcData[r].length) {
				dataBits[index++] = dcData[r][i]
			}
		}
	}
	for (let i = 0; i < ecByteLengthInGroup1; i++) {
		for (let r = 0; r < ecBlockCount; r++) {
			dataBits[index++] = ecData[r][i]
		}
	}

	// 5) 合成二维表
	const size = version * 4 + 17
	const matrix = createBitMatrix(size)
	const reversedMatrix = createBitMatrix(size)
	setupFinderPattern(matrix, reversedMatrix, 0, 0)
	setupFinderPattern(matrix, reversedMatrix, size - 7, 0)
	setupFinderPattern(matrix, reversedMatrix, 0, size - 7)
	setupTimingPattern(matrix, reversedMatrix)
	setupAlignmentPattern(matrix, reversedMatrix, version)
	setupFormatInfo(matrix, reversedMatrix, errorCorrectionLevel, 0)
	if (version >= 7) {
		setupVersionInfo(matrix, reversedMatrix, version)
	}
	setupData(matrix, reversedMatrix, dataBits)
	maskPattern ??= getBestMask(matrix, reversedMatrix, errorCorrectionLevel)
	applyMask(maskPattern, matrix, reversedMatrix)
	setupFormatInfo(matrix, reversedMatrix, errorCorrectionLevel, maskPattern)
	return {
		/** 生成的二维表数据 */
		modules: matrix,
		/** 实际使用的版本 */
		version: version,
		/** 实际使用的容错等级 */
		errorCorrectionLevel: errorCorrectionLevel,
		/** 实际使用的掩码 */
		maskPattern: maskPattern,
		/** 实际使用的编码模式 */
		mode
	}
}

/** 获取体积最小的编码方式 */
function getBestEncodingMode(data: string) {
	return /^[A-Z0-9 $%*+\-./:]+$/.test(data) ? /^\d+$/.test(data) ? EncodingMode.numeric : EncodingMode.alphanumeric : EncodingMode.byte
}

/** 计算使用指定编码的最终字节长度 */
function getEncodedByteLength(data: string, encodingMode: EncodingMode) {
	const length = data.length
	if (encodingMode !== EncodingMode.byte) {
		return length
	}
	let count = 0
	for (let i = 0; i < length; i++) {
		let char = data.charCodeAt(i)
		if (char >= 0xD800 && char <= 0xDBFF && data.length > i + 1) {
			const nextChar = data.charCodeAt(i + 1)
			if (nextChar >= 0xDC00 && nextChar <= 0xDFFF) {
				char = (char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000
				i++
			}
		}
		if (char < 0x80) {
			count++
		} else if (char < 0x800) {
			count += 2
		} else if (char < 0xD800 || char >= 0xE000 && char < 0x10000) {
			count += 3
		} else if (char >= 0x10000 && char <= 0x10FFFF) {
			count += 4
		} else {
			count += 3
		}
	}
	return count
}

const totalByteLengthMap = [26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706]

/** 获取指定版本可容纳的总字节数(含数据区和恢复区) */
function getTotalByteLength(version: number) {
	return totalByteLengthMap[version - 1]
}

const dataByteLengthMap = [
	[16, 28, 44, 64, 86, 108, 124, 154, 182, 216, 254, 290, 334, 365, 415, 453, 507, 563, 627, 669, 714, 782, 860, 914, 1000, 1062, 1128, 1193, 1267, 1373, 1455, 1541, 1631, 1725, 1812, 1914, 1992, 2102, 2216, 2334],
	[19, 34, 55, 80, 108, 136, 156, 194, 232, 274, 324, 370, 428, 461, 523, 589, 647, 721, 795, 861, 932, 1006, 1094, 1174, 1276, 1370, 1468, 1531, 1631, 1735, 1843, 1955, 2071, 2191, 2306, 2434, 2566, 2702, 2812, 2956],
	[9, 16, 26, 36, 46, 60, 66, 86, 100, 122, 140, 158, 180, 197, 223, 253, 283, 313, 341, 385, 406, 442, 464, 514, 538, 596, 628, 661, 701, 745, 793, 845, 901, 961, 986, 1054, 1096, 1142, 1222, 1276],
	[13, 22, 34, 48, 62, 76, 88, 110, 132, 154, 180, 206, 244, 261, 295, 325, 367, 397, 445, 485, 512, 568, 614, 664, 718, 754, 808, 871, 911, 985, 1033, 1115, 1171, 1231, 1286, 1354, 1426, 1502, 1582, 1666]
]

/** 获取指定版本对应的数据区可容纳的字节数 */
function getDataByteLength(version: number, errorCorrectionLevel: ErrorCorrectionLevel) {
	return dataByteLengthMap[errorCorrectionLevel][version - 1]
}

/** 获取指定版本和编码对应的数据长度位数 */
function getLengthBitCount(version: number, mode: EncodingMode) {
	switch (mode) {
		case EncodingMode.numeric:
			return version >= 1 && version < 10 ? 10 : version < 27 ? 12 : 14
		case EncodingMode.alphanumeric:
			return version >= 1 && version < 10 ? 9 : version < 27 ? 11 : 13
		default:
			return version >= 1 && version < 10 ? 8 : version < 27 ? 16 : 16
	}
}

const errorCorrectionBlockCountMap = [
	[1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
	[1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
	[1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
	[1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68]
]

/** 获取指定版本对应的恢复区块数 */
function getErrorCorrectionBlockCount(version: number, errorCorrectionLevel: ErrorCorrectionLevel) {
	return errorCorrectionBlockCountMap[errorCorrectionLevel][version - 1]
}

// #region 位数组

/** 表示二进制数据缓存 */
type BitBuffer = Uint8Array & { bitCount: number }

/** 写入一个字节 */
function writeByteToBitBuffer(buffer: BitBuffer, value: number) {
	if (buffer.bitCount % 8 === 0) {
		buffer[buffer.bitCount >> 3] = value
		buffer.bitCount += 8
	} else {
		writeBitsToBitBuffer(buffer, value, 8)
	}
}

/** 写入一个数值 */
function writeBitsToBitBuffer(buffer: BitBuffer, value: number, bitCount: number) {
	for (let i = 0; i < bitCount; i++) {
		writeBitToBitBuffer(buffer, (value >>> (bitCount - i - 1)) & 1)
	}
}

/** 写入一个字节 */
function writeBitToBitBuffer(buffer: BitBuffer, bit: number) {
	if (bit) {
		buffer[buffer.bitCount >> 3] |= 0b10000000 >>> (buffer.bitCount % 8)
	}
	buffer.bitCount++
}

// #endregion

// #region 编码数据

const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"

/** 使用指定的编码写入数据 */
function writeData(bitBuffer: BitBuffer, data: string, encodingMode: EncodingMode) {
	switch (encodingMode) {
		case EncodingMode.numeric: {
			let index = 0
			for (; index + 3 <= data.length; index += 3) {
				writeBitsToBitBuffer(bitBuffer, parseInt(data.substring(index, index + 3)), 10)
			}
			const remainingCount = data.length - index
			if (remainingCount > 0) {
				writeBitsToBitBuffer(bitBuffer, parseInt(data.substring(index)), remainingCount * 3 + 1)
			}
			break
		}
		case EncodingMode.alphanumeric: {
			let index = 0
			for (; index + 2 <= data.length; index += 2) {
				writeBitsToBitBuffer(bitBuffer, alphanumericChars.indexOf(data[index]) * 45 + alphanumericChars.indexOf(data[index + 1]), 11)
			}
			if (index === data.length - 1) {
				writeBitsToBitBuffer(bitBuffer, alphanumericChars.indexOf(data[index]), 6)
			}
			break
		}
		default:
			for (let i = 0; i < data.length; i++) {
				let char = data.charCodeAt(i)
				if (char >= 0xD800 && char <= 0xDBFF && data.length > i + 1) {
					const nextChar = data.charCodeAt(i + 1)
					if (nextChar >= 0xDC00 && nextChar <= 0xDFFF) {
						char = (char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000
						i++
					}
				}
				if (char < 0x80) {
					writeByteToBitBuffer(bitBuffer, char)
				} else if (char < 0x800) {
					writeByteToBitBuffer(bitBuffer, (char >> 6) | 192)
					writeByteToBitBuffer(bitBuffer, (char & 63) | 128)
				} else if (char < 0xD800 || (char >= 0xE000 && char < 0x10000)) {
					writeByteToBitBuffer(bitBuffer, (char >> 12) | 224)
					writeByteToBitBuffer(bitBuffer, ((char >> 6) & 63) | 128)
					writeByteToBitBuffer(bitBuffer, (char & 63) | 128)
				} else if (char >= 0x10000 && char <= 0x10FFFF) {
					writeByteToBitBuffer(bitBuffer, (char >> 18) | 240)
					writeByteToBitBuffer(bitBuffer, ((char >> 12) & 63) | 128)
					writeByteToBitBuffer(bitBuffer, ((char >> 6) & 63) | 128)
					writeByteToBitBuffer(bitBuffer, (char & 63) | 128)
				} else {
					writeByteToBitBuffer(bitBuffer, 0xEF)
					writeByteToBitBuffer(bitBuffer, 0xBF)
					writeByteToBitBuffer(bitBuffer, 0xBD)
				}
			}
			break
	}
}

// #endregion

// #region 错误恢复

const galoisFieldExp = new Uint8Array(256)
const galoisFieldLog = new Uint8Array(256)
let t = 1
for (let i = 0; i < 255; i++) {
	galoisFieldExp[i] = t
	galoisFieldLog[t] = i
	t <<= 1
	if (t & 0b100000000) {
		t ^= 0b100011101
	}
}

/** 实现 RS 纠错算法编码 */
export class ReedSolomonEncoder {

	/** 初始多项式次数 */
	readonly degree: number

	/** 初始多项式 */
	readonly ecPolynomial: Uint8Array

	/**
	 * 初始化新的编码器
	 * @param degree 初始多项式次数
	 */
	constructor(degree: number) {
		this.degree = degree
		let polynomial = new Uint8Array([1])
		for (let i = 0; i < degree; i++) {
			polynomial = multipyPolynomial(polynomial, new Uint8Array([1, galoisFieldExp[i]]))
		}
		this.ecPolynomial = polynomial
	}

	/**
	 * 编码一段数据
	 * @param data 要编码的数据
	 */
	encode(data: Uint8Array) {
		const paddedData = new Uint8Array(data.length + this.degree)
		paddedData.set(data)
		const remainder = moduloPolynomial(paddedData, this.ecPolynomial)
		const start = this.degree - remainder.length
		if (start > 0) {
			const buffer = new Uint8Array(this.degree)
			buffer.set(remainder, start)
			return buffer
		}
		return remainder
	}

}

function multipyPolynomial(p1: Uint8Array, p2: Uint8Array) {
	const result = new Uint8Array(p1.length + p2.length - 1)
	for (let i = 0; i < p1.length; i++) {
		for (let j = 0; j < p2.length; j++) {
			result[i + j] ^= multipyGaloisField(p1[i], p2[j])
		}
	}
	return result
}

function multipyGaloisField(x: number, y: number) {
	if (x === 0 || y === 0) return 0
	const n = galoisFieldLog[x] + galoisFieldLog[y]
	return galoisFieldExp[n < 255 ? n : n - 255]
}

function moduloPolynomial(divident: Uint8Array, divisor: Uint8Array) {
	let result = new Uint8Array(divident)
	while ((result.length - divisor.length) >= 0) {
		const coeff = result[0]
		for (let i = 0; i < divisor.length; i++) {
			result[i] ^= multipyGaloisField(divisor[i], coeff)
		}
		let offset = 0
		while (offset < result.length && result[offset] === 0) offset++
		result = result.slice(offset)
	}
	return result
}

// #endregion

// #region 生成矩阵

/** 表示一个二进制矩阵 */
export type BitMatrix = Uint8Array[]

/** 创建一个二进制矩阵 */
function createBitMatrix(size: number) {
	const result: BitMatrix = Array(size)
	for (let i = 0; i < size; i++) {
		result[i] = new Uint8Array(size)
	}
	return result
}

function setupFinderPattern(matrix: BitMatrix, reversedMatrix: BitMatrix, rowStart: number, columnStart: number) {
	for (let rowIndex = -1; rowIndex <= 7; rowIndex++) {
		const row = rowStart + rowIndex
		if (row <= -1 || row >= matrix.length) {
			continue
		}
		for (let columnIndex = -1; columnIndex <= 7; columnIndex++) {
			const column = columnStart + columnIndex
			if (column <= -1 || column >= matrix[row].length) {
				continue
			}
			matrix[row][column] = rowIndex >= 0 && rowIndex <= 6 && (columnIndex === 0 || columnIndex === 6) ||
				columnIndex >= 0 && columnIndex <= 6 && (rowIndex === 0 || rowIndex === 6) ||
				rowIndex >= 2 && rowIndex <= 4 && columnIndex >= 2 && columnIndex <= 4 ? 1 : 0
			reversedMatrix[row][column] = 1
		}
	}
}

function setupTimingPattern(matrix: BitMatrix, reversedMatrix: BitMatrix) {
	for (let row = 8; row < matrix.length - 8; row++) {
		matrix[6][row] = matrix[row][6] = 1 - row % 2
		reversedMatrix[6][row] = reversedMatrix[row][6] = 1
	}
}

function setupAlignmentPattern(matrix: BitMatrix, reversedMatrix: BitMatrix, version: number) {
	const positions: number[] = []
	if (version !== 1) {
		const symbolSize = matrix.length
		const count = Math.floor(version / 7) + 2
		const step = symbolSize === 145 ? 26 : Math.ceil((symbolSize - 13) / (2 * count - 2)) * 2
		positions[count - 1] = symbolSize - 7
		positions[0] = 6
		for (let i = count - 2; i >= 1; i--) {
			positions[i] = positions[i + 1] - step
		}
	}
	for (let i = 0; i < positions.length; i++) {
		for (let j = 0; j < positions.length; j++) {
			// 跳过定位器所在的位置
			if (i === 0 && j === 0 || // 左上
				i === 0 && j === positions.length - 1 || // 左下
				i === positions.length - 1 && j === 0) { // 右上
				continue
			}
			const rowStart = positions[i]
			const columnStart = positions[j]
			for (let rowIndex = -2; rowIndex <= 2; rowIndex++) {
				const row = rowStart + rowIndex
				for (let columnIndex = -2; columnIndex <= 2; columnIndex++) {
					const column = columnStart + columnIndex
					matrix[row][column] = rowIndex === -2 || rowIndex === 2 || columnIndex === -2 || columnIndex === 2 || rowIndex === 0 && columnIndex === 0 ? 1 : 0
					reversedMatrix[row][column] = 1
				}
			}
		}
	}
}

function setupVersionInfo(matrix: BitMatrix, reversedMatrix: BitMatrix, version: number) {
	let d = version << 12
	while (getBCHDigit(d) >= 13) {
		d ^= (0b1111100100101 << (getBCHDigit(d) - 13))
	}
	const bits = (version << 12) | d
	for (let i = 0; i < 18; i++) {
		const row = Math.floor(i / 3)
		const column = i % 3 + matrix.length - 8 - 3
		matrix[column][row] = matrix[row][column] = (bits >> i) & 1
		reversedMatrix[column][row] = reversedMatrix[row][column] = 1
	}
}

function getBCHDigit(data: number) {
	let digit = 0
	while (data !== 0) {
		digit++
		data >>>= 1
	}
	return digit
}

function setupData(matrix: BitMatrix, reversedMatrix: BitMatrix, dataBits: Uint8Array) {
	const size = matrix.length
	let inc = -1
	let row = size - 1
	let byteIndex = 0
	let bitIndex = 7
	for (let column = size - 1; column > 0; column -= 2) {
		if (column === 6) column--
		while (true) {
			for (let c = 0; c < 2; c++) {
				if (!reversedMatrix[row][column - c]) {
					matrix[row][column - c] = byteIndex < dataBits.length ? (dataBits[byteIndex] >>> bitIndex) & 1 : 0
					bitIndex--
					if (bitIndex === -1) {
						byteIndex++
						bitIndex = 7
					}
				}
			}
			row += inc
			if (row < 0 || size <= row) {
				row -= inc
				inc = -inc
				break
			}
		}
	}
}

function setupFormatInfo(matrix: BitMatrix, reversedMatrix: BitMatrix, errorCorrectionLevel: ErrorCorrectionLevel, maskPattern: number) {
	const size = matrix.length
	const data = ((errorCorrectionLevel << 3) | maskPattern)
	let d = data << 10
	while (getBCHDigit(d) - 11 >= 0) {
		d ^= (0b10100110111 << (getBCHDigit(d) - 11))
	}
	const bits = ((data << 10) | d) ^ 0b101010000010010
	for (let i = 0; i < 15; i++) {
		const row = i < 6 ? i : i < 8 ? i + 1 : size - 15 + i
		const column = i < 8 ? size - i - 1 : i < 9 ? 15 - i - 1 + 1 : 15 - i - 1
		matrix[8][column] = matrix[row][8] = (bits >> i) & 1
		reversedMatrix[8][column] = reversedMatrix[row][8] = 1
	}
	reversedMatrix[size - 8][8] = matrix[size - 8][8] = 1
}

function applyMask(maskPattern: number, matrix: BitMatrix, reservedMatrix: BitMatrix) {
	for (let column = 0; column < matrix.length; column++) {
		for (let row = 0; row < matrix.length; row++) {
			if (reservedMatrix[row][column]) continue
			matrix[row][column] ^= (maskPattern === 0b000 ? (row + column) % 2 :
				maskPattern === 0b001 ? row % 2 :
					maskPattern === 0b010 ? column % 3 :
						maskPattern === 0b011 ? (row + column) % 3 :
							maskPattern === 0b100 ? (Math.floor(row / 2) + Math.floor(column / 3)) % 2 :
								maskPattern === 0b101 ? (row * column) % 2 + (row * column) % 3 :
									maskPattern === 0b110 ? ((row * column) % 2 + (row * column) % 3) % 2 :
										((row * column) % 3 + (row + column) % 2) % 2) === 0 ? 1 : 0
		}
	}
}

function getBestMask(matrix: BitMatrix, reservedMatrix: BitMatrix, errorCorrectionLevel: ErrorCorrectionLevel) {
	let bestPattern = 0
	let lowerPenalty = Infinity
	for (let p = 0; p < 8; p++) {
		setupFormatInfo(matrix, reservedMatrix, errorCorrectionLevel, p)
		applyMask(p, matrix, reservedMatrix)
		const penalty = getPenaltyN1(matrix) + getPenaltyN2(matrix) + getPenaltyN3(matrix) + getPenaltyN4(matrix)
		applyMask(p, matrix, reservedMatrix)
		if (penalty < lowerPenalty) {
			lowerPenalty = penalty
			bestPattern = p
		}
	}
	return bestPattern
}

const enum PenaltyScores {
	N1 = 3,
	N2 = 3,
	N3 = 40,
	N4 = 10
}

function getPenaltyN1(matrix: BitMatrix) {
	const size = matrix.length
	let points = 0
	let sameCountCol = 0
	let sameCountRow = 0
	let lastCol = null
	let lastRow = null

	for (let row = 0; row < size; row++) {
		sameCountCol = sameCountRow = 0
		lastCol = lastRow = null

		for (let col = 0; col < size; col++) {
			let module = matrix[row][col]
			if (module === lastCol) {
				sameCountCol++
			} else {
				if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
				lastCol = module
				sameCountCol = 1
			}

			module = matrix[col][row]
			if (module === lastRow) {
				sameCountRow++
			} else {
				if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
				lastRow = module
				sameCountRow = 1
			}
		}

		if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
		if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
	}

	return points
}

function getPenaltyN2(matrix: BitMatrix) {
	const size = matrix.length
	let points = 0

	for (let row = 0; row < size - 1; row++) {
		for (let col = 0; col < size - 1; col++) {
			const last = matrix[row][col] +
				matrix[row][col + 1] +
				matrix[row + 1][col] +
				matrix[row + 1][col + 1]

			if (last === 4 || last === 0) points++
		}
	}

	return points * PenaltyScores.N2
}

function getPenaltyN3(matrix: BitMatrix) {
	const size = matrix.length
	let points = 0
	let bitsCol = 0
	let bitsRow = 0

	for (let row = 0; row < size; row++) {
		bitsCol = bitsRow = 0
		for (let col = 0; col < size; col++) {
			bitsCol = ((bitsCol << 1) & 0x7FF) | matrix[row][col]
			if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++

			bitsRow = ((bitsRow << 1) & 0x7FF) | matrix[col][row]
			if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++
		}
	}

	return points * PenaltyScores.N3
}

function getPenaltyN4(matrix: BitMatrix) {
	let darkCount = 0
	const modulesCount = matrix.length * matrix.length

	for (let i = 0; i < modulesCount; i++) darkCount += matrix[Math.floor(i / matrix.length)][i % matrix.length]

	const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10)

	return k * PenaltyScores.N4
}

// #endregion

// #endregion

// #region 绘制 SVG

/**
 * 绘制一个二维码为 SVG 图片源码
 * @param modules 矩阵数据
 * @param options 附加选项
 */
export function renderSVG(modules: BitMatrix, options: QRCodeOptions = {}) {
	const padding = options.padding ?? 0.5
	const viewBox = modules.length + padding * 2
	let result = `<svg xmlns="http://www.w3.org/2000/svg"${options.width ? ` width="${options.width}" height="${options.width}"` : ""} viewBox="0 0 ${viewBox} ${viewBox}" shape-rendering="crispEdges">`
	if (options.lightColor !== "transparent") {
		result += `<rect fill="${options.lightColor ?? "#ffffff"}" x="0" y="0" height="${viewBox}" width="${viewBox}"/>`
	}
	result += `<path stroke="${options.darkColor ?? "#000000"}" d="`
	let moveBy = 0
	let newRow = false
	let lineLength = 0
	for (let row = 0; row < modules.length; row++) {
		for (let column = 0; column < modules.length; column++) {
			if (!column && !newRow) newRow = true
			if (modules[row][column]) {
				lineLength++
				if (!(column > 0 && modules[row][column - 1])) {
					result += newRow ? `M${column + padding} ${0.5 + row + padding}` : `m${moveBy} 0`
					moveBy = 0
					newRow = false
				}
				if (column + 1 < modules.length && modules[row][column + 1]) {
					continue
				}
				result += `h${lineLength}`
				lineLength = 0
			} else {
				moveBy++
			}
		}
	}
	result += `"/>`
	if (options.logo) {
		const logoWidth = options.logoWidth ?? viewBox / 7.5
		const logoHeight = options.logoHeight ?? logoWidth
		if (options.logoBackgroundColor !== "transparent") {
			const logoPadding = options.logoPadding ?? 0.5
			const logoOuterWidth = logoWidth + logoPadding * 2
			const logoOuterHeight = logoHeight + logoPadding * 2
			const logoBorderRadius = options.logoBorderRadius ?? 1
			result += `<rect fill="${options.logoBackgroundColor ?? "#ffffff"}" x="${(viewBox - logoOuterWidth) / 2}" y="${(viewBox - logoOuterHeight) / 2}" rx="${logoBorderRadius}" ry="${logoBorderRadius}" width="${logoOuterWidth}" height="${logoOuterHeight}"/>`
		}
		result += `<image xlink:href="${options.logo}" x="${(viewBox - logoWidth) / 2}" y="${(viewBox - logoHeight) / 2}" width="${logoWidth}" height="${logoHeight}" />`
	}
	result += `</svg>`
	return result
}

// #endregion