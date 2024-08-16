# 定时器
解析 CRON 表达式实现计划任务。

## 定时器表达式
定时器表达式一般由 7 个部分组成，每个部分用空格隔开，依次代表：
```
秒(0-59) 分钟(0-59) 小时(0-23) 日期(1-31) 月份(1-12) 星期(1-7，其中 1 代表星期天) 年
```
如果表达式只包含 6 个部分，认为“年”部分缺省；如果只有 5 个部分，认为“年”和“秒”部分缺省。

每个部分由多个规则组成，每个规则用逗号隔开，规则有以下几种格式：
1. `d`：匹配 d
2. `d1-d2`: 匹配 d1 到 d2(含边界) 的所有数值
3. `d1-d2/s`: 匹配 d1 到 d2(含边界) ，每隔 s 的索引数值
4. `*`: 匹配所有数值

对于日期部分还可以额外使用以下规则（其中字母可忽略大小写）：
1. `L`: 匹配当月最后一天
2. `dW`: 匹配离目标日期最近且不跨月的工作日（比如 5W：如果5日是星期六，则将在最近的工作日期五，即4日触发；如果5日是星期天，则将在最近的工作日星期一，即6日触发；如果5日在星期一星期五之间，则在5日触发）
3. `LW`: 匹配当月最后一个工作日
4. `?`: 忽略本规则，日由星期部分决定

对于星期部分还可以额外使用以下规则（其中字母可忽略大小写）：
1. `L`: 匹配星期天
2. `dL`: 表示当月最后一个星期 d
3. `d#n`: 表示当月第 n 个星期 d
4. `?`: 忽略本规则，日由日期部分决定

对于月份部分还可以使用以下英文简写代表对应的月份：
- JAN: 1
- FEB: 2
- MAR: 3
- APR: 4
- MAY: 5
- JUN: 6
- JUL: 7
- AUG: 8
- SEP: 9
- OCT: 10
- NOV: 11
- DEC: 12

对于星期部分还可以使用以下英文简写代表对应的星期：
- SUN: 1
- MON: 2
- TUE: 3
- WED: 4
- THU: 5
- FRI: 6
- SAT: 7

## 基本用法

```html demo .doc
<input id="input" value="*/3 * * * * ?" onchange="changeJob()">
<button onclick="start()">开始任务</button>
<button onclick="stop()">停止任务</button>
<div id="output"></div>
<script>
    import { CronJob } from "../cron/cron"

    let index = 1
    let job

    export function start() {
        job ??= new CronJob(input.value, () => {
            output.innerHTML += `第 ${index++} 次执行： ${new Date().toLocaleString()} <br>`
        })
        job.start()
    }

    export function stop() {
        job?.stop()
    }

    export function changeJob() {
        stop()
        job = null
    }
</script>
```

> ##### [!]限制
> 1. 不支持超时超过 2147483647ms 的计划任务。
> 2. 不支持时区。

> ##### 另参考
> [Cron](https://en.wikipedia.org/wiki/Cron)