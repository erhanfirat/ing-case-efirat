import {LitElement, html, css} from 'lit';

export class NavigationMenu extends LitElement {
  static properties = {
    activePath: {type: String}, // Input label
  };

  static styles = css`
    nav {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: #333;
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
  `;

  constructor() {
    super();
    this.activePath = '/';
  }

  render() {
    return html`
      <nav>
        <a href="/" class="${this.activePath === '/' ? 'active' : ''}">
          <fa-icon class="fas fa-home"></fa-icon>
          Employee List
        </a>
        <a href="/add" class="${this.activePath === '/add' ? 'active' : ''}">
          <fa-icon class="fas fa-plus"></fa-icon>
          Add Employee
        </a>
      </nav>
    `;
  }
}
customElements.define('navigation-menu', NavigationMenu);
