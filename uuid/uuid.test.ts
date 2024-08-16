import * as assert from "assert"
import * as uuid from "./uuid"

export function uuidTest() {
	assert.notStrictEqual(uuid.uuid(), uuid.uuid())
}

export function isUUIDTest() {
	assert.strictEqual(uuid.isUUID(uuid.emptyUUID), false)
	assert.strictEqual(uuid.isUUID(uuid.uuid()), true)
	assert.strictEqual(uuid.isUUID(""), false)
	assert.strictEqual(uuid.isUUID("6ba7b810-9dad-91d1-80b4-00c04fd430c8"), false, "Invalid version")
}