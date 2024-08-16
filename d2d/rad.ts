/**
 * 将度数转为弧度
 * @param deg 要转换的度数
 */
export function degreesToRads(deg: number) {
	return (deg * Math.PI) / 180
}

/**
 * 将弧度转为度数
 * @param rad 要转换的弧度
 */
export function radsToDegrees(rad: number) {
	return (rad * 180) / Math.PI
}