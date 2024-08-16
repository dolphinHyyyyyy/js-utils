/** 表示当前属性是一个事件 */
export function event(target: any, propertyKey: string): any {
	let functions: Function | Function[] | undefined
	const eventHandler = function (this: any) {
		if (!functions) {
			return
		}
		if (typeof functions === "function") {
			return functions.apply(this, arguments)
		}
		for (const func of functions.slice(0)) {
			func.apply(this, arguments)
		}
	}
	eventHandler.valueOf = thisValueOfHook
	return {
		get() {
			return eventHandler
		},
		set(value: any) {
			if (value > 0) {
				if (functions) {
					if (typeof functions === "function") {
						functions = [functions, currentFunction!]
					} else {
						functions.push(currentFunction!)
					}
				} else {
					functions = currentFunction
				}
			} else if (value < 0) {
				if (functions) {
					if (typeof functions === "function") {
						if (functions === currentFunction) {
							functions = undefined
						}
					} else {
						const index = functions.indexOf(currentFunction!)
						if (index >= 0) {
							functions.splice(index, 1)
						}
					}
				}
			} else {
				functions = value
			}
			currentFunction = undefined
		},
		configurable: true,
		enumerable: true
	}
}

const nativeValueOf = Function.prototype.valueOf
let currentFunction: Function | undefined
function targetValueOfHook(this: Function) {
	currentFunction = this
	Function.prototype.valueOf = nativeValueOf
	return 2
}

function thisValueOfHook() {
	Function.prototype.valueOf = targetValueOfHook
	return 1
}