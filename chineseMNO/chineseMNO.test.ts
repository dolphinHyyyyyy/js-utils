import * as assert from "assert"
import * as chineseMNO from "./chineseMNO"

export function getChineseMNOTest() {
	assert.strictEqual(chineseMNO.getChineseMNO("13645465454"), "chinaMobile")
}