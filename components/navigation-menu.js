import {LitElement, html, css} from 'lit';


export class NavigationMenu extends LitElement {
  static styles = css`
    nav {
      display: flex;
      gap: 1rem;
    }
    a {
      text-decoration: none;
      color: blue;
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
