import * as assert from "assert"
import * as chineseID from "./chineseID"

export function parseChineseIdTest() {
	assert.deepStrictEqual(chineseID.parseChineseID("152500198909267865"), {
		birthday: new Date("Tue Sep 26 1989 00:00:00 GMT+0800"),
		city: 25,
		county: 0,
		province: 15,
		sex: chineseID.ChineseIDSex.famale,
		valid: true
	})
}

export function getAgeFromChineseIdTest() {
	assert.strictEqual(chineseID.getAgeFromChineseId("152500198909267865", new Date("2010/1/1")), 20)
}