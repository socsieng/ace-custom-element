# Ace Custom Element

This is a custom element wrapper for the [Ace code editor](https://ace.c9.io/).

## Installation

```
npm install ace-custom-element
```

## Usage

```html
<script type="module" src="./node_modules/ace-custom-element/dist/index.js"></script>

<ace-editor theme="ace/theme/monokai" value="console.log('hello world');"></ace-editor>
```

## Supported properties

- `value`:
  - type: `string`
  - description: Editor text value.
- `mode`:
  - type: `string`
  - default: `ace/mode/javascript`
  - description: Editor more.
- `theme`:
  - type: `string`
  - default: `ace/theme/eclipse`
  - description: Editor theme.
- `tabSize`:
  - type: `number`
  - default: `2`
  - description: Editor tab size.
- `readonly`:
  - type: `boolean`
  - default: `false`
  - description: Places editor in readonly mode.
- `softTabs`:
  - type: `boolean`
  - default: `false`
  - description: Sets editor to use soft tabs.
- `wrap`:
  - type: `boolean`
  - default: `false`
  - description: Sets editor to wrap text.
- `basePath`:
  - type: `string`
  - default: `ace/` folder relative to import path.
  - description: Specifies the location to load additional ACE resources.

## Supported events

- `change`: triggered when the editor's value changes.
