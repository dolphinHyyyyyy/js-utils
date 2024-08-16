/**
 * 编译一个 EJS（ASP/JSP）模板
 * @param template 模板内容，在模板中使用 `<% ... %>` 插入 JavaScript 语句，使用 `<%= ... %>` 插入 JavaScript 表达式，默认使用 `$` 获取传入的数据
 * @param argument 模板中获取数据的参数名
 * @returns 返回编译后的模板函数
 * @param return.data 传递给模板的数据
 * @param return.return 返回模板渲染的结果
*/
export function compileTemplate(template: string, argument = "$") {
	let end = ""
	template = `var $output="",$t${(`%>${template}<%`).replace(/%>([\s\S]*?)<%(=?)/g, (source, content: string, eq?: string) => {
		source = `${end};${content ? `$output+=${JSON.stringify(content)};` : ""}`
		if (eq) {
			source += `$t =(`
			end = ");if($t!=null)$output+=$t"
		} else {
			end = ""
		}
		return source
	})}`
	return new Function(argument, `${template}${end}return $output`) as (data: any) => string
}

/** 所有模板编译缓存 */
export const templatesCache = new Map<string, ReturnType<typeof compileTemplate>>()

/**
 * 渲染指定的模板
 * @param template 模板内容
 * @param data 模板数据
 * @param templateID 模板编译缓存键
 * @example renderTemplate("Hello <%= $.name %>!", {name: "World"}) // "Hello world!"
 */
export function renderTemplate(template: string, data: any, templateID = template) {
	let tpl = templatesCache.get(templateID)
	if (!tpl) {
		templatesCache.set(templateID, tpl = compileTemplate(template))
	}
	return tpl.call(data, data)
}