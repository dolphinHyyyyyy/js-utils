import * as assert from "assert"
import * as masking from "./masking"

export function maskMobileTest() {
	assert.strictEqual(masking.maskMobile("13888529999"), "138****9999")
	assert.strictEqual(masking.maskMobile("1334234"), "1334234")
}

export function maskEmail() {
	assert.strictEqual(masking.maskEmail("23456@vip.com"), "2****@vip.com")
	assert.strictEqual(masking.maskEmail("@"), "@")
}

export function maskChineseName() {
	assert.strictEqual(masking.maskChineseName("王二小"), "王*小")
	assert.strictEqual(masking.maskChineseName("小明"), "小*")
}

export function maskChineseID() {
	assert.strictEqual(masking.maskChineseID("123456789123456789"), "1234************89")
}