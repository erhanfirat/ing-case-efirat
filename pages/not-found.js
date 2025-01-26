import {LitElement, css, html} from 'lit';

export class NotFound extends LitElement {
  static styles = css`
    select {
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  `;

  render() {
    return html` <h1>404 - Not Found</h1> `;
  }
}
customElements.define('not-found', NotFound);
