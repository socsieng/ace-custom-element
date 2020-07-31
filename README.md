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

Try it out on [JSFiddle](https://jsfiddle.net/4ejdon81/).

## Supported properties

| Property     | Attribute     | Type         | Default value                                 | Description                                              |
| ------------ | ------------- | ------------ | --------------------------------------------- | -------------------------------------------------------- |
| `editor`     | -             | `Ace.Editor` | -                                             | A reference to the ace editor.                           |
| `value`      | `value`       | `string`     | `""`                                          | Editor text value.                                       |
| `mode`       | `mode`        | `string`     | `ace/mode/javascript`                         | Editor more.                                             |
| `theme`      | `theme`       | `string`     | `ace/theme/eclipse`                           | Editor theme.                                            |
| `tabSize`    | `tab-size`    | `number`     | `2`                                           | Editor tab size.                                         |
| `readonly`   | `readonly`    | `boolean`    | `false`                                       | Places editor in readonly mode.                          |
| `softTabs`   | `soft-tabs`   | `boolean`    | `false`                                       | Sets editor to use soft tabs.                            |
| `wrap`       | `wrap`        | `boolean`    | `false`                                       | Sets editor to wrap text.                                |
| `hideGutter` | `hide-gutter` | `boolean`    | `false`                                       | Hides the editor gutter.                                 |
| `basePath`   | `base-path`   | `string`     | `ace/` folder relative to module import path. | Specifies the location to load additional ACE resources. |

## Supported events

| Event    | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `change` | Triggered when the editor's value changes (will trigger for each keystroke). |
| `ready`  | Triggered after the ace editor has been initialized.                         |
| `blur`   | Triggered when the editor loses focus.                                       |
