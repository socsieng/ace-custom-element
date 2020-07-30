import 'ace-builds/src-noconflict/ace';

import { Notify, NotifyAttribute, NotifyBooleanAttribute, NotifyNumericAttribute } from './lib/property-decorators';
import { Ace } from 'ace-builds';
import { debounce } from './lib/debounce';

/**
 * Custom element Ace code editor
 */
class AceEditor extends HTMLElement {
  private static _observedAttributes: string[] = [];

  private editor?: Ace.Editor;

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

  @Notify()
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

    const editor = ace.edit(this);

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

    editor.getSession().setUseWrapMode(!!this.wrap);

    editor.off('change', this.handleChange);
    editor.on('change', this.handleChange);

    this.resize();

    this.editor = editor;
  });

  private appendStyles() {
    const rootNode = this.getRootNode() as Document | ShadowRoot | undefined;
    const styleId = `ace-custom-element-style`;

    // initialize styles if rendering on the client:
    if (rootNode) {
      if (!rootNode.getElementById?.(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
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
    }
  }

  connectedCallback(): void {
    this.initializeEditor();
  }

  disconnectedCallback(): void {
    if (!this.editor) return;

    this.editor.off('change', this.handleChange);
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
    this.editor?.resize();
  }

  private handleChange = debounce(() => {
    const text = this.editor?.getValue() || '';
    if (text !== this.value) {
      if (text) {
        this.setAttribute('value', text);
      } else {
        this.removeAttribute('value');
      }

      this.dispatch('change', {
        detail: text,
      });
    }
  });
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
