# JSON Edit

Easily change (nested) properties in a JSON files, keeping the original formatting.

The code is extracted from the VSCode source, which uses this functionality to alter the settings.json file when settings are changed through the user interface.

## Usage

```typescript
import {
	applyEdits,
	getFormattingOptions,
	setProperty,
} from "@popup-io/json-edit";
import * as fs from "fs";

const input = fs.readFileSync("package.json", "utf8");

const formattingOptions = getFormattingOptions(input);
const edit = setProperty(input, ["type"], "module", formattingOptions);
const output = applyEdits(input, edit);

fs.writeFileSync("package.json", output, "utf8");
```

## API

### _**getFormattingOptions**(**text**: string): FormattingOptions_

Input the JSON file contents to detect how the file is formatted.

Returns an object with these properties:

- `insertSpaces` (boolean) - Is indentation based on spaces?
- `tabSize` (number) - If indentation is based on spaces (`insertSpaces` = true), then what is the number of spaces that make an indent?
- `eol` (string) - The default 'end of line' character. If not set, '\n' is used as default.

### _**setProperty**(**text**: string, **originalPath**: JSONPath, **value**: any, **formattingOptions**: FormattingOptions, **getInsertionIndex**?: (properties: string[]) => number): Edit[];_

Detect what needs to be changed in a JSON file, to set or change a property to a certain value.

A nested property can be changed by passing an array to `originalPath`.

The returned value can be passed to `applyEdits` to get the new file contents.

### _**removeProperty**(**text**: string, **path**: JSONPath, **formattingOptions**: FormattingOptions): Edit[]_

Same as `setProperty`, but removes a property instead of adding/changing one.

### _**applyEdits**(**text**: string, **edits**: Edit[]): string_

Change the file contents by applying one or more edits. Returns the new file contents.

## License

This source code is available to everyone under the standard MIT license, just like VSCode.
