import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import './locale-picker';

export class NavigationMenu extends LitElement {
  static properties = {
    activePath: {type: String}, // Input label
  };

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background: #333;
    }
    nav {
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }
    a {
      text-decoration: none;
      color: #eee;
      border: 2px solid transparent;
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: 0.25s;
    }
    a:hover {
      color: #fff;
      background: #444;
    }
    a.active {
      background: #2a2929;
      margin-top: 1px;
      margin-left: 1px;
      border-top: 2px solid #222;
      border-left: 2px solid #222;
    }
    .top-right {
      display: flex;
      align-items: center;
      padding-right: 1rem;
    }
  `;

  constructor() {
    super();
    this.activePath = '/';
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <header>
        <nav>
          <a href="/" class="${this.activePath === '/' ? 'active' : ''}">
            <fa-icon class="fas fa-home"></fa-icon>
            ${msg('Employee List')}
          </a>
          <a href="/add" class="${this.activePath === '/add' ? 'active' : ''}">
            <fa-icon class="fas fa-plus"></fa-icon>
            ${msg('Add Employee')}
          </a>
        </nav>
        <div class="top-right">
          <locale-picker></locale-picker>
        </div>
      </header>
    `;
  }
}
customElements.define('navigation-menu', NavigationMenu);
