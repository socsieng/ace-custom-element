# Ace Custom Element

This is a custom element wrapper for the [Ace code editor](https://ace.c9.io/).

## Installation

```
npm install ace-custom-element
```

## Usage

Using a local file:

```html
<script type="module" src="./node_modules/ace-custom-element/dist/index.min.js"></script>

<ace-editor theme="ace/theme/monokai" value="console.log('hello world');"></ace-editor>
```

Using a CDN like unpkg.com:

```html
<!-- pin to a specific version if required -->
<script type="module" src="https://unpkg.com/ace-custom-element@latest/dist/index.min.js"></script>

<ace-editor theme="ace/theme/monokai" value="console.log('hello world');"></ace-editor>
```

## Supported properties

- `editor`:
  - type: `Ace.Editor`
  - description: A reference to the ace editor.
- `value`:
  - type: `string`
  - attribute: `value`
  - description: Editor text value.
- `mode`:
  - type: `string`
  - attribute: `mode`
  - default: `ace/mode/javascript`
  - description: Editor more.
- `theme`:
  - type: `string`
  - attribute: `theme`
  - default: `ace/theme/eclipse`
  - description: Editor theme.
- `tabSize`:
  - type: `number`
  - attribute: `tab-size`
  - default: `2`
  - description: Editor tab size.
- `readonly`:
  - type: `boolean`
  - attribute: `readonly`
  - default: `false`
  - description: Places editor in readonly mode.
- `softTabs`:
  - type: `boolean`
  - attribute: `soft-tabs`
  - default: `false`
  - description: Sets editor to use soft tabs.
- `wrap`:
  - type: `boolean`
  - attribute: `wrap`
  - default: `false`
  - description: Sets editor to wrap text.
- `hideGutter`:
  - type: `boolean`
  - attribute: `hide-gutter`
  - default: `false`
  - description: Hides the editor gutter.
- `basePath`:
  - type: `string`
  - attribute: `base-path`
  - default: `ace/` folder relative to module import path.
  - description: Specifies the location to load additional ACE resources.

## Supported events

- `change`: Triggered when the editor's value changes.
- `ready`: Triggered after the ace editor has been initialized.
