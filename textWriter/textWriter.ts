import { SourceMapData } from "../sourceMap/sourceMap"

/** 表示一个文本写入器 */
export class TextWriter {

	/** 获取或设置已写入的文本内容 */
	content = ""

	/** 获取已写入的文本内容 */
	toString() { return this.content }

	/** 获取或设置缩进字符 */
	indentChar = "\t"

	/** 获取或设置当前使用的缩进字符串 */
	indentString = ""

	/** 增加一个缩进 */
	indent() { this.indentString += this.indentChar }

	/** 减少一个缩进 */
	unindent() { this.indentString = this.indentString.substring(this.indentChar.length) }

	/**
	 * 在末尾写入一段文本
	 * @param content 要写入的内容
	 * @param startIndex 要写入的内容的开始索引（从 0 开始）
	 * @param endIndex 要写入的内容的结束索引（从 0 开始）（不含）
	 * @param sourcePath 内容的源文件路径或索引
	 * @param sourceLine 内容在源文件中的行号（从 0 开始）
	 * @param sourceColumn 内容在源文件中的列号（从 0 开始）
	 * @param name 内容对应的符号名称或索引
	 * @param sourceMap 如果指定了源文件的源映射，则复制所有映射点
	 */
	write(content: string, startIndex = 0, endIndex = content.length, sourcePath?: string | number, sourceLine?: number, sourceColumn?: number, name?: string | number, sourceMap?: SourceMapData) {
		let lastIndex = startIndex
		if (this.indentString) {
			const prevChar = this.content.charCodeAt(this.content.length - 1)
			let isLineStart = prevChar === 10 /* \n */ || prevChar === 13 /* \r */ || prevChar !== prevChar /* NaN */
			for (; startIndex < endIndex; startIndex++) {
				const char = content.charCodeAt(startIndex)
				if (char === 10 /* \n */) {
					isLineStart = true
				} else if (char === 13 /* \r */) {
					if (content.charCodeAt(startIndex + 1) === 10 /* \n */) {
						startIndex++
					}
					isLineStart = true
				} else if (isLineStart) {
					if (startIndex > lastIndex) {
						this.content += content.substring(lastIndex, startIndex)
						lastIndex = startIndex
					}
					this.content += this.indentString
					isLineStart = false
				}
			}
		}
		this.content += content.substring(lastIndex, endIndex)
	}

}