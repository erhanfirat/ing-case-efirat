import {LitElement, css, html} from 'lit';
import './../components/navigation-menu';

export class NotFound extends LitElement {
  static styles = css`
    select {
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  `;

  render() {
    return html`
      <navigation-menu></navigation-menu>
      <h1>404 - Not Found</h1>
    `;
  }
}
customElements.define('not-found', NotFound);
