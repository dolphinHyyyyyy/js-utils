/**
 * 生成一个贝塞尔曲线
 * @param startX 起始点的水平坐标（单位：像素）
 * @param startY 起始点的垂直坐标（单位：像素）
 * @param endX 结束点的水平坐标（单位：像素）
 * @param endY 结束点的垂直坐标（单位：像素）
 * @param callback 处理生成的点的回调函数。函数接收以下参数：
 * @param callback.x 生成点的水平坐标（单位：像素）
 * @param callback.y 生成点的垂直坐标（单位：像素）
 */
export function bezier(startX: number, startY: number, endX: number, endY: number, callback: (x: number, y: number) => void): void {
	const dx = endX - startX
	const dy = endY - startY
	const adx = Math.abs(dx)
	const ady = Math.abs(dy)
	const sx = dx > 0 ? 1 : -1
	const sy = dy > 0 ? 1 : -1
	let eps = 0
	if (adx > ady) {
		for (let x = startX, y = startY; sx < 0 ? x >= endX : x <= endX; x += sx) {
			callback(x, y)
			eps += ady
			if ((eps << 1) >= adx) {
				y += sy
				eps -= adx
			}
		}
	} else {
		for (let x = startX, y = startY; sy < 0 ? y >= endY : y <= endY; y += sy) {
			callback(x, y)
			eps += adx
			if ((eps << 1) >= ady) {
				x += sx
				eps -= ady
			}
		}
	}
}