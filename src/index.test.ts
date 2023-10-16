import * as assert from "node:assert/strict";
import test from "node:test";
import { applyEdits, getFormattingOptions, setProperty } from "../dist";

void test("Adding a property to an empty object", () => {
	const input = "{}";
	const expected = '{\n  "foo": "bar"\n}';
	const formattingOptions = getFormattingOptions(input);
	const edit = setProperty(input, ["foo"], "bar", formattingOptions);
	const actual = applyEdits(input, edit);

	assert.equal(actual, expected);
});
