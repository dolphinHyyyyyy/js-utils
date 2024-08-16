/** 表示一个树节点 */
export class TreeNode {

	/** 获取父节点 */
	parentNode?: TreeNode

	/** 获取根节点 */
	get rootNode() {
		let node: TreeNode = this
		while (node.parentNode) {
			node = node.parentNode
		}
		return node
	}

	/** 获取最后一个子节点 */
	firstChild?: TreeNode

	/** 获取最后一个子节点 */
	lastChild?: TreeNode

	/** 获取上一个兄弟节点 */
	previousSibling?: TreeNode

	/** 获取下一个兄弟节点 */
	nextSibling?: TreeNode

	/** 判断当前节点是否存在子节点 */
	get hasChild() { return !!this.firstChild }

	/** 计算直接子节点的个数 */
	get childCount() {
		let result = 0
		for (let node = this.firstChild; node; node = node.nextSibling) {
			result++
		}
		return result
	}

	/**
	 * 在当前节点下添加一个子节点
	 * @param node 要添加的子节点
	 */
	append(node: TreeNode) {
		node.remove()
		node.parentNode = this
		if (this.lastChild) {
			node.previousSibling = this.lastChild
			this.lastChild = this.lastChild.nextSibling = node
		} else {
			this.lastChild = this.firstChild = node
		}
	}

	/**
	 * 在当前节点下插入第一个子节点
	 * @param node 要插入的子节点
	 */
	prepend(node: TreeNode) {
		if (this.firstChild) {
			this.firstChild.before(node)
		} else {
			this.append(node)
		}
	}

	/**
	 * 在当前节点前插入一个节点
	 * @param node 要插入的节点
	 */
	before(node: TreeNode) {
		if (!this.parentNode) {
			return
		}
		node.remove()
		node.parentNode = this.parentNode
		node.nextSibling = this
		node.previousSibling = this.previousSibling
		if (this.previousSibling) {
			this.previousSibling = this.previousSibling.nextSibling = node
		} else {
			this.previousSibling = this.parentNode.firstChild = node
		}
	}

	/**
	 * 在当前节点后插入一个节点
	 * @param node 要插入的节点
	 */
	after(node: TreeNode) {
		if (this.nextSibling) {
			this.nextSibling.before(node)
		} else if (this.parentNode) {
			this.parentNode.append(node)
		}
	}

	/** 移除当前节点 */
	remove() {
		if (!this.parentNode) {
			return
		}
		if (this.previousSibling) {
			this.previousSibling.nextSibling = this.nextSibling
		} else {
			this.parentNode.firstChild = this.nextSibling
		}
		if (this.nextSibling) {
			this.nextSibling.previousSibling = this.previousSibling
		} else {
			this.parentNode.lastChild = this.previousSibling
		}
		this.previousSibling = this.nextSibling = this.parentNode = undefined
	}

	/**
	 * 判断当前节点是否包含目标节点
	 * @param node 要判断的目标节点
	 */
	contains(node: TreeNode) {
		do {
			if (node === this) {
				return true
			}
		} while (node = node.parentNode!)
		return false
	}

	/**
	 * 从当前节点向上遍历所有父节点，返回匹配的第一个节点
	 * @param callback 判断节点是否匹配的回调函数
	 * @param callback.node 正在遍历的节点
	 */
	closest(callback: (node: TreeNode) => boolean) {
		for (let node: TreeNode = this; node; node = node.parentNode!) {
			if (callback(node)) {
				return node
			}
		}
	}

	/**
	 * 遍历当前节点及所有子节点
	 * @param callback 遍历的回调函数
	 * @param callback.node 正在遍历的节点
	 * @param callback.return 如果返回 `false` 则停止所有遍历；如果返回 `true` 则停止所有当前节点的子节点
	 */
	walk(callback: (node: TreeNode) => boolean | void) {
		const result = callback(this)
		if (typeof result === "boolean") {
			return result
		}
		for (let child = this.firstChild; child; child = child.nextSibling) {
			if (child.walk(callback) === false) {
				return false
			}
		}
		return true
	}
}