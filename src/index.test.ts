/* eslint-disable @typescript-eslint/no-floating-promises */
import * as assert from "node:assert/strict";
import test from "node:test";
import { applyEdits, getFormattingOptions, setProperty } from "../dist";

test("Adding a property to an empty object", () => {
	const input = "{}";
	const expected = '{\n  "foo": "bar"\n}';
	const formattingOptions = getFormattingOptions(input);
	const edit = setProperty(input, ["foo"], "bar", formattingOptions);
	const actual = applyEdits(input, edit);

	assert.equal(actual, expected);
});

test("Adding a property to an object that is indented with tabs", () => {
	const input = '{\n\t"foo1": "bar1"\n}';
	const expected = '{\n\t"foo1": "bar1",\n\t"foo2": "bar2"\n}';
	const formattingOptions = getFormattingOptions(input);
	const edit = setProperty(input, ["foo2"], "bar2", formattingOptions);
	const actual = applyEdits(input, edit);

	assert.equal(actual, expected);
});

test("Adding a property to an object that is indented with 2 tabs", () => {
	const input = '{\n\t\t"foo1": "bar1"\n}';
	const expected = '{\n\t\t"foo1": "bar1",\n\t\t"foo2": "bar2"\n}';
	const formattingOptions = getFormattingOptions(input);
	const edit = setProperty(input, ["foo2"], "bar2", formattingOptions);
	const actual = applyEdits(input, edit);

	assert.equal(actual, expected);
});

test("Adding a property to an object that is indented with 7 spaces", () => {
	const input = '{\n       "foo1": "bar1"\n}';
	const expected = '{\n       "foo1": "bar1",\n       "foo2": "bar2"\n}';
	const formattingOptions = getFormattingOptions(input);
	const edit = setProperty(input, ["foo2"], "bar2", formattingOptions);
	const actual = applyEdits(input, edit);

	assert.equal(actual, expected);
});

test("Adding a property to an empty object with \\r as EOL character", () => {
	const input = "{}\r";
	const expected = '{\r  "foo2": "bar2"\r}\r';
	const formattingOptions = getFormattingOptions(input);
	const edit = setProperty(input, ["foo2"], "bar2", formattingOptions);
	const actual = applyEdits(input, edit);

	assert.equal(actual, expected);
});
