import {LitElement, html, css} from 'lit';

export class NavigationMenu extends LitElement {
  static styles = css`
    nav {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: #333;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/">Employee List</a>
        <a href="/add">Add Employee</a>
      </nav>
    `;
  }
}
customElements.define('navigation-menu', NavigationMenu);
