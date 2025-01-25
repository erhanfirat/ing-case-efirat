import {LitElement, html, css} from 'lit';

export class IconButton extends LitElement {
  static properties = {
    icon: {type: String}, // Font Awesome ikon sınıfı (örnek: 'fa-home')
    label: {type: String}, // Buton metni
    color: {type: String}, // Buton rengi (blue, red, green, yellow, gray)
    onlyIcon: {type: Boolean}, // Sadece ikon göster
    title: {type: String}, // Buton tooltip metni
    size: {type: String}, // Botun boyutunu belirler: [sm, md, lg]
    disabled: {type: Boolean}, // Buton disabled attribute
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 500;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      color: white;
    }

    button.sm {
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
    }
    button.lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.25rem;
    }

    /* Renk seçenekleri */
    button.blue {
      background-color: #007bff;
    }
    button.red {
      background-color: #dc3545;
    }
    button.green {
      background-color: #28a745;
    }
    button.yellow {
      background-color: #ffc107;
      color: #212529;
    }
    button.gray {
      background-color: #6c757d;
    }

    /* Hover renkleri */
    button.blue:hover {
      background-color: #0056b3;
    }
    button.red:hover {
      background-color: #a71d2a;
    }
    button.green:hover {
      background-color: #1e7e34;
    }
    button.yellow:hover {
      background-color: #d39e00;
    }
    button.gray:hover {
      background-color: #5a6268;
    }

    button:disabled,
    button:hover:disabled {
      background-color: #d6d6d6;
      color: #888;
      cursor: not-allowed;
    }

    /* İkon stili */
    i {
      font-size: 1.2rem;
    }
  `;

  constructor() {
    super();
    this.icon = ''; // Varsayılan ikon
    this.label = ''; // Varsayılan metin
    this.color = 'blue'; // Varsayılan renk
    this.onlyIcon = false; // Varsayılan olarak metin ve ikon birlikte
    this.title = ''; // Varsayılan tooltip metni
    this.size = 'md'; // Varsayılan buton boyutu md (medium)
    this.disabled = false; // Varsayılan disabled özelliği false değeri alır
  }

  render() {
    return html`
      <button
        class="${this.color} ${this.size}"
        title="${this.title}"
        ?disabled=${this.disabled}
      >
        ${this.icon
          ? html`<fa-icon
              class="fas ${this.icon}"
              size="${this.size === 'sm'
                ? '.85rem'
                : this.size === 'lg'
                ? '1.25rem'
                : '1rem'}"
            ></fa-icon>` // Font Awesome ikonu
          : ''}
        ${!this.onlyIcon && this.label ? html`<span>${this.label}</span>` : ''}
      </button>
    `;
  }
}

customElements.define('icon-button', IconButton);
