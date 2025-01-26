/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {NavigationMenu} from '../components/navigation-menu.js';

suite('navigation-menu', () => {
  test('is defined', () => {
    const el = document.createElement('navigation-menu');
    assert.instanceOf(el, NavigationMenu);
  });

  test('navigation-menu renders successfully', async () => {
    const el = await fixture(html`<navigation-menu></navigation-menu>`);
    assert.shadowDom.equal(
      el,
      `
      <header>
        <nav>
          <a href="/" class="active">
            <fa-icon class="fas fa-home"></fa-icon>
            Employee List
          </a>
          <a href="/add" class="">
            <fa-icon class="fas fa-plus"></fa-icon>
            Add Employee
          </a>
        </nav>
        <div class="top-right">
          <locale-picker></locale-picker>
        </div>
      </header>
      `
    );
  });
});
