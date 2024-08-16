import * as assert from "assert"
import { CronJob, isValidCronExpression } from "./cron"

export async function cronJobTest() {
	await new Promise<void>(resolve => {
		const job = new CronJob("* * * * * *", () => {
			job.stop()
			assert.ok(1)
			resolve()
		})
		job.start()
	})
}

export function isValidCronExpressionTest() {
	assert.strictEqual(isValidCronExpression("*/2 * * * *"), true)
	assert.strictEqual(isValidCronExpression("* * * * *"), true)
	assert.strictEqual(isValidCronExpression("* * * * *"), true)
	assert.strictEqual(isValidCronExpression("0 */5 * *"), false)
}