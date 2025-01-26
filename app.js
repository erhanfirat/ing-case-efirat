/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {initRouter} from './pages/route';
import './components/navigation-menu.js';
import 'fa-icons';

export class App extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', serif;
      }
      #router-outlet {
        padding: 1rem;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Current path of the application
       * @type {string}
       */
      activePath: {type: String},
    };
  }

  constructor() {
    super();
    this.activePath = '/';
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('router-outlet');
    this.router = initRouter(outlet); // Initialize the router and attach it to the outlet
    const _this = this;
    this.router.ready.then(() => {
      _this.router.subscribe();
    });

    window.addEventListener('popstate', () => {
      this.activePath = window.location.pathname;
    });
  }

  render() {
    return html`
      <navigation-menu activePath="${this.activePath}"></navigation-menu>
      <main id="router-outlet"></main>
    `;
  }
}

window.customElements.define('my-app', App);
