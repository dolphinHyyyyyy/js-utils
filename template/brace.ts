/**
 * 编译一个大括号模板
 * @param template 模板内容，在模板中使用 `{{ ... }}` 插入 JavaScript 表达式，默认使用 `$` 获取传入的数据
 * @returns 返回编译后的模板函数
 * @param return.data 传递给模板的数据
 * @param return.return 返回模板渲染的结果
*/
export function compileTemplate(template: string) {
	let source = `var $output="",$t;`
	let index = 0
	while (index < template.length) {
		const braceStart = template.indexOf("{{", index)
		if (braceStart < 0) {
			break
		}
		const braceEnd = template.indexOf("}}", braceStart)
		if (braceEnd < 0) {
			break
		}
		const expression = template.substring(braceStart + "{{".length, braceEnd)
		source += `$output+=${JSON.stringify(template.substring(index, braceStart))};$t=${/^[\u4E00-\u9FA5\uFE30-\uFFA0a-zA-Z_$][\u4E00-\u9FA5\uFE30-\uFFA0\w$]+$/.test(expression) ? `${argument}.${expression}` : expression};if($t!=null)$output+=$t;`
		index = braceEnd + "}}".length
	}
	if (index < template.length) {
		source += `$output+=${JSON.stringify(template.substring(index))};`
	}
	return `${source}return $output`
}

/** 所有模板编译缓存 */
export const templatesCache = new Map<string, Function>()

/**
 * 渲染指定的模板
 * @param template 模板内容
 * @param data 模板数据
 * @param templateID 模板编译缓存键
 * @example renderTemplate("Hello {{name}}!", {name: "World"}) // "Hello world!"
 */
export function renderTemplate(template: string, data: any, templateID = template) {
	let tpl = templatesCache.get(templateID)
	if (!tpl) {
		templatesCache.set(templateID, tpl = new Function("$", compileTemplate(template)))
	}
	return tpl.call(data, data)
}