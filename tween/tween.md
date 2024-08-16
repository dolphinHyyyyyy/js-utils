# 补间动画
底层实现补间动画算法，以便实现平滑渐变的效果。

给定一个初始值、结束值和变换时间，即可自动计算每隔一段时间（默认为 20ms）当前值的最新状态。
将值运用于节点的位置，即可实现节点的平滑移动。

```html demo .doc
<div style="border: 1px solid #E89109; width: 318px;">
    <div id="box" style="width: 18px; height: 18px; background: #E89109; position: relative;"></div>
</div>
<div id="btns" class="doc" style="margin-top: 1rem;"></div>
<script>
    import { Tween } from "./tween"
    import * as easings from "./easings"

    btns.innerHTML = generateButtons()

    function generateButtons() {
        var html = ""
        for (var key in easings) {
            if (!key.startsWith("ease")) {
                html += `<input type="button" onclick="run(easings.${key})" value="${key}"> `
                html += `<input type="button" onclick="run(easings.easeOut(easings.${key}))" value="easeOut(${key})"> `
                html += `<input type="button" onclick="run(easings.easeInOut(easings.${key}))" value="easeInOut(${key})"> `
                html += `<br>`
            }
        }
        return html
    }

    var tween = new Tween()
    tween.duration = 1000
    tween.set = (x) => {
        box.style.left = 300 * x + 'px'
    }
    
    export function run(easing) {
        if (tween.isRunning) {
            return
        }
        tween.reset()
        tween.easing = easing
        tween.start()
    }

    export { easings }
</script>
```