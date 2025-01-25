import {LitElement, html, css} from 'lit';

export class FormInput extends LitElement {
  static properties = {
    label: {type: String}, // Input label
    placeholder: {type: String}, // Input placeholder
    icon: {type: String}, // Font Awesome ikon sınıfı (örnek: 'fa-user')
    error: {type: String}, // Hata mesajı
    value: {type: String}, // Input değeri
    type: {type: String}, // Input türü (örnek: 'text', 'password')
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
      padding-left: 40px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 5px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
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
    this.label = ''; // Varsayılan etiket
    this.placeholder = ''; // Varsayılan placeholder
    this.icon = ''; // Varsayılan ikon
    this.error = ''; // Varsayılan olarak hata yok
    this.value = ''; // Varsayılan input değeri
    this.type = 'text'; // Varsayılan input türü
  }

  render() {
    return html`
      <div class="form-group">
        <label>${this.label}</label>
        <div class="input-container">
          <fa-icon
            class="fas ${this.icon} ${this.error ? 'error' : ''} icon"
          ></fa-icon>
          <input
            type="${this.type}"
            placeholder="${this.placeholder}"
            class="${this.error ? 'error' : ''}"
            .value="${this.value}"
            @input="${this._handleInput}"
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
}

customElements.define('form-input', FormInput);
