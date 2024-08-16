# 颜色计算
计算得到更多颜色。

```html demo .doc
<input type="color" id="input_color" value="#ff0000">
<input type="color" id="input_mix" value="#0000ff">
<button onclick="input_color.value=mix(input_color.value, input_mix.value)">混合</button>
<br>
<input type="number" id="input_value" step="0.1" min="-1" max="1" value="0.1">
<button onclick="input_color.value=darken(input_color.value, +input_value.value)">更暗</button>
<button onclick="input_color.value=lighten(input_color.value, +input_value.value)">更亮</button>
<button onclick="input_color.value=mix(input_color.value, '#fff', +input_value.value)">更透明</button>
```

> ##### 另参考
> - http://en.wikipedia.org/wiki/HSL_color_space
> - [HSL to RGB color conversion](http://www.rapidtables.com/convert/color/hsl-to-rgb.htm)
> - [RGB to HSL color conversion](http://www.rapidtables.com/convert/color/rgb-to-hsl.htm)