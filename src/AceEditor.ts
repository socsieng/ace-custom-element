import 'ace-builds/src-noconflict/ace';

import { NotifyAttribute, NotifyBooleanAttribute, NotifyNumericAttribute } from './lib/property-decorators';
import { name as aceName, version as aceVersion } from 'ace-builds/package.json';
import { name as editorName, version as editorVersion } from '../package.json';
import { Ace } from 'ace-builds';
import { debounce } from './lib/debounce';

/**
 * Custom element Ace code editor
 */
class AceEditor extends HTMLElement {
  private static _observedAttributes: string[] = [];

  private _editor?: Ace.Editor;
  get editor(): Ace.Editor | undefined {
    return this._editor;
  }

  get version(): { [key: string]: string } {
    return {
      [editorName]: editorVersion,
      [aceName]: aceVersion,
    };
  }

  @NotifyAttribute()
  value?: string;

  @NotifyAttribute()
  mode?: string;

  @NotifyAttribute()
  theme?: string;

  @NotifyNumericAttribute()
  tabSize?: number;

  @NotifyBooleanAttribute()
  readonly?: boolean;

  @NotifyBooleanAttribute()
  softTabs?: boolean;

  @NotifyBooleanAttribute()
  wrap?: boolean;

  @NotifyBooleanAttribute()
  hideGutter?: boolean;

  @NotifyBooleanAttribute()
  hidePrintMargin?: boolean;

  @NotifyAttribute()
  basePath?: string;

  static get observedAttributes(): string[] {
    return AceEditor._observedAttributes;
  }

  /**
   * Registers an attribute to be observed.
   *
   * @param name Attribute name to observe.
   * @internal
   */
  addObservedAttribute(name: string): void {
    AceEditor._observedAttributes.push(name);
  }

  private dispatch<T>(type: string, detail: T): void {
    this.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        cancelable: false,
        detail,
      }),
    );
  }

  private initializeEditor = debounce(() => {
    const basePath = this.basePath || import.meta.url.replace(/[^\/]+$/, 'ace/');
    ace.config.set('basePath', basePath);

    const editor = this._editor || ace.edit(this);

    this.appendStyles();

    editor.session.setMode(this.mode || 'ace/mode/javascript');
    editor.setTheme(this.theme || 'ace/theme/eclipse');

    const text = editor.getValue() || '';
    if (text !== this.value) {
      editor.setValue(this.value || '');
    }

    editor.getSession().setTabSize(this.tabSize || 2);
    editor.getSession().setUseSoftTabs(!!this.softTabs);

    editor.setReadOnly(!!this.readonly);
    editor.setHighlightActiveLine(!this.readonly);
    editor.setHighlightGutterLine(!this.readonly);

    editor.renderer.setShowGutter(!this.hideGutter);
    editor.renderer.setShowPrintMargin(!this.hidePrintMargin);

    editor.getSession().setUseWrapMode(!!this.wrap);

    editor.off('change', this.handleChange);
    editor.on('change', this.handleChange);
    editor.off('blur', this.handleBlur);
    editor.on('blur', this.handleBlur);

    this.resize();

    this._editor = editor;
  });

  private appendStyles() {
    const rootNode = this.getRootNode() as Document | ShadowRoot | undefined;
    const aceStyleId = `ace_editor.css`;
    const customStyleId = `ace-custom-element-style`;

    // initialize styles if rendering on the client:
    if (rootNode) {
      if (!rootNode.getElementById?.(customStyleId)) {
        const style = document.createElement('style');
        style.id = customStyleId;
        style.type = 'text/css';
        style.innerHTML = `
        ace-editor {
          display: block;
          width: 100%;
          height: 250px;
        }
        `;

        if (rootNode instanceof Document && rootNode.head) {
          rootNode.head.appendChild(style);
        } else {
          rootNode.appendChild(style);
        }
      }

      if (!rootNode.getElementById?.(aceStyleId)) {
        const editorStyle = document.getElementById(aceStyleId);
        if (editorStyle) {
          if (rootNode instanceof Document && rootNode.head) {
            rootNode.head.appendChild(editorStyle.cloneNode(true));
          } else {
            rootNode.appendChild(editorStyle.cloneNode(true));
          }
        }
      }
    }
  }

  connectedCallback(): void {
    this.initializeEditor().then(() => {
      this.dispatch('ready', {
        editor: this.editor,
      });
    });
  }

  disconnectedCallback(): void {
    if (!this._editor) return;

    this._editor.off('change', this.handleChange);
    this._editor.off('blur', this.handleBlur);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attributeChangedCallback(name: string): void {
    this.initializeEditor();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notifyPropertyChanged(name: string): void {
    this.initializeEditor();
  }

  resize(): void {
    this._editor?.resize();
  }

  private handleChange = debounce(() => {
    const text = this._editor?.getValue() || '';
    if (text !== this.value) {
      if (text) {
        this.setAttribute('value', text);
      } else {
        this.removeAttribute('value');
      }

      this.dispatch('change', text);
    }
  });

  private handleBlur = () => {
    this.dispatchEvent(new FocusEvent('blur'));
  };
}

interface AceEditor {
  addEventListener(type: 'change', listener: (event: CustomEvent<string>) => void): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener(type: 'change', listener: (event: CustomEvent<string>) => void): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

export default AceEditor;

customElements.define('ace-editor', AceEditor);
