/** 表示一个向量 */
export class Vector2D {

	/**
	 * 初始化新的向量
	 * @param x 水平坐标
	 * @param y 垂直坐标
	 */
	constructor(public x: number, public y: number) { }

	/** 获取向量的长度 */
	get length() {
		return Math.hypot(this.x, this.y)
	}

	/** 获取向量的方向 */
	get direction() {
		return Math.atan2(this.y, this.x)
	}

	/** 创建当前向量的副本 */
	clone() {
		return new Vector2D(this.x, this.y)
	}

	/**
	 * 判断当前向量是否和另一个向量相等
	 * @param other 要比较的向量
	 */
	equalsTo(other: Vector2D) {
		return this.x === other.x && this.y === other.y
	}

	/**
	 * 从当前向量添加一个向量
	 * @param other 目标向量
	 */
	addSelf(other: Vector2D) {
		this.x += other.x
		this.y += other.y
		return this;
	}

	/**
	 * 从当前向量减少一个向量
	 * @param other 目标向量
	 */
	subtractSelf(other: Vector2D) {
		this.x -= other.x
		this.y -= other.y
		return this
	}

	/**
	 * 计算两个向量的叉乘
	 * @param other 目标向量
	 */
	cross(other: Vector2D) {
		return this.x * other.y - other.x * this.y
	}

	/**
	 * 计算两个向量的点乘
	 * @param other 目标向量
	 */
	dot(other: Vector2D) {
		return this.x * other.x + other.y * this.y
	}

	/**
	 * 放大当前向量
	 * @param scale 放大比，1 表示不变
	 */
	scaleSelf(scale: number) {
		this.x *= scale
		this.y *= scale
		return this
	}

	/** 归一化当前向量 */
	normalize() {
		return this.scaleSelf(1 / this.length)
	}

	/**
	 * 逆时针旋转当前向量
	 * @param rad 弧度
	 */
	rotateSelf(rad: number) {
		const c = Math.cos(rad)
		const s = Math.sin(rad)
		const x = this.x
		const y = this.y
		this.x = x * c - y * s
		this.y = x * s + y * c
		return this
	}

}