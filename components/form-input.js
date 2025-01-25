import {LitElement, html, css} from 'lit';

export class FormInput extends LitElement {
  static properties = {
    label: {type: String}, // Input label
    placeholder: {type: String}, // Input placeholder
    icon: {type: String}, // Font Awesome ikon sınıfı (örnek: 'fa-user')
    error: {type: String}, // Hata mesajı
    value: {type: String}, // Input değeri
    type: {type: String}, // Input türü (örnek: 'text', 'password')
    required: {type: Boolean}, // Input Required validation özelliği
    pattern: {type: String}, // Input Pattern validation özelliği
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    label {
      font-size: 14px;
      margin-bottom: 8px;
      color: #333;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      width: 100%;
      padding: 10px 12px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 5px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    input.withIcon {
      padding-left: 40px;
    }

    input:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      outline: none;
    }

    .icon {
      position: absolute;
      left: 10px;
      color: #888;
      font-size: 16px;
    }

    .error {
      font-size: 12px;
      color: #dc3545;
      margin-top: 4px;
    }

    /* Error durumunda border ve ikon renk değişimi */
    input.error {
      border-color: #dc3545;
    }

    .icon.error {
      color: #dc3545;
    }
  `;

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.icon = '';
    this.error = '';
    this.value = '';
    this.type = 'text';
    this.required = false;
    this.pattern = '';
  }

  render() {
    return html`
      <div class="form-group">
        <label>${this.label}</label>
        <div class="input-container">
          ${this.icon &&
          html` <fa-icon
            class="fas ${this.icon} ${this.error ? 'error' : ''} icon"
          ></fa-icon>`}
          <input
            type="${this.type}"
            placeholder="${this.placeholder}"
            class="${this.error ? 'error' : ''} ${this.icon ? 'withIcon' : ''}"
            .value="${this.value}"
            @input="${(e) => {
              this._handleInput(e);
              this.validate();
            }}"
            .pattern="${this.pattern}"
            ?required=${this.required}
          />
        </div>
        ${this.error ? html`<div class="error">${this.error}</div>` : ''}
      </div>
    `;
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input-change', {detail: this.value}));
  }

  validate() {
    if (this.required && !this.value.trim()) {
      this.error = `${this.label} is required`;
      return false;
    }

    if (this.pattern && !new RegExp(this.pattern).test(this.value)) {
      this.error = `${this.label} is not in the correct format`;
      return false;
    }

    this.error = '';
    return true;
  }
}

customElements.define('form-input', FormInput);
