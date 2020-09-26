# Ace Custom Element

[![npm version](https://badge.fury.io/js/ace-custom-element.svg)](https://www.npmjs.com/package/ace-custom-element)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/ace-custom-element)

This is a custom element wrapper for the [Ace code editor](https://ace.c9.io/).

The primary reason for this package over other similar packages is to make it easier to use with by including a single
script resource so that it can be accessed using services like unpkg.com.

## Usage

### CDN

Using a CDN like unpkg.com:

<!--
```
<custom-element-demo>
  <template>
    <style>
      ace-editor {
        height: 300px;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<!-- pin to a specific version if required -->
<script type="module" src="https://unpkg.com/ace-custom-element@latest/dist/index.min.js"></script>

<ace-editor theme="ace/theme/monokai" value="console.log('hello world');"></ace-editor>
```

Try it out on [JSFiddle](https://jsfiddle.net/4ejdon81/).

### Locally

Using a local file:

```
npm install ace-custom-element
```

```html
<script type="module" src="./node_modules/ace-custom-element/dist/index.min.js"></script>

<ace-editor theme="ace/theme/monokai" value="console.log('hello world');"></ace-editor>
```

## Supported properties

| Property                  | Attribute                    | Type         | Default value                                 | Description                                              |
| :------------------------ | :--------------------------- | :----------- | :-------------------------------------------- | :------------------------------------------------------- |
| `editor`                  | -                            | `Ace.Editor` | -                                             | A reference to the ace editor.                           |
| `value`                   | `value`                      | `string`     | `""`                                          | Editor text value.                                       |
| `mode`                    | `mode`                       | `string`     | `ace/mode/javascript`                         | Editor mode.                                             |
| `theme`                   | `theme`                      | `string`     | `ace/theme/eclipse`                           | Editor theme.                                            |
| `tabSize`                 | `tab-size`                   | `number`     | `2`                                           | Editor tab size.                                         |
| `readonly`                | `readonly`                   | `boolean`    | `false`                                       | Places editor in readonly mode.                          |
| `softTabs`                | `soft-tabs`                  | `boolean`    | `false`                                       | Sets editor to use soft tabs.                            |
| `wrap`                    | `wrap`                       | `boolean`    | `false`                                       | Sets editor to wrap text.                                |
| `hideActiveLineHighlight` | `hide-active-line-highlight` | `boolean`    | `false`                                       | Hides highlight for the current line.                    |
| `hideGutter`              | `hide-gutter`                | `boolean`    | `false`                                       | Hides the editor gutter.                                 |
| `hideGutterLineHighlight` | `hide-gutter-line-highlight` | `boolean`    | `false`                                       | Hides gutter highlight for the current line.             |
| `hidePrintMargin`         | `hide-print-margin`          | `boolean`    | `false`                                       | Hides the print margin (vertical ruler).                 |
| `basePath`                | `base-path`                  | `string`     | `ace/` folder relative to module import path. | Specifies the location to load additional ACE resources. |

## Supported events

| Event    | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `change` | Triggered when the editor's value changes (will trigger for each keystroke). |
| `ready`  | Triggered after the ace editor has been initialized.                         |
| `blur`   | Triggered when the editor loses focus.                                       |
