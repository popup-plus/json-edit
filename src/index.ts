import { applyEdits, setProperty } from "vs/base/common/jsonEdit";
import { FormattingOptions, getEOL } from "vs/base/common/jsonFormatter";
import { DefaultEndOfLine } from "vs/editor/common/model";
import { guessIndentation } from "vs/editor/common/model/indentationGuesser";
import { createTextBufferFactory } from "vs/editor/common/model/textModel";

/**
 * Based on the contents of a JSON file, return the formatting options that
 * should be used when editing the file.
 *
 * @param originalJson The JSON file contents.
 * @returns The tab size, whether to use spaces, and the end of line character.
 */
export function getFormattingOptions(originalJson: string): FormattingOptions {
	// TODO: This takes a lot of resources. The text buffer can probabily be
	// created without the need for a disposable.
	const { textBuffer, disposable } = createTextBufferFactory(
		originalJson,
	).create(DefaultEndOfLine.LF);

	const indentation = guessIndentation(textBuffer, 2, true);
	disposable.dispose();

	const eol = getEOL({}, originalJson);

	return {
		tabSize: indentation.tabSize,
		insertSpaces: indentation.insertSpaces,
		eol,
	};
}

export {
	applyEdits,
	createTextBufferFactory,
	getEOL,
	guessIndentation,
	setProperty,
};
