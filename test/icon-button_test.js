/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {IconButton} from '../components/icon-button.js';

suite('icon-button', () => {
  test('is defined', () => {
    const el = document.createElement('icon-button');
    assert.instanceOf(el, IconButton);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<icon-button></icon-button>`);
    assert.shadowDom.equal(el, `<button class="blue md" title></button>`);
  });

  test('renders with a set label', async () => {
    const el = await fixture(html`<icon-button label="Go"></icon-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button  class="blue md"  title="">
        <span>Go</span>
      </button>
      `
    );
  });

  test('renders with an icon', async () => {
    const el = await fixture(html`<icon-button icon="fa-save"></icon-button>`);
    assert.shadowDom.equal(
      el,
      `
    <button class="blue md" title="">
        <fa-icon class="fas fa-save" size="1rem"></fa-icon>
      </button>
    `
    );
  });

  test('icon onlyIcon title and size applied', async () => {
    const el = await fixture(html`<icon-button
      icon="fa-edit"
      onlyIcon
      title="Update"
      size="sm"
    ></icon-button>`);

    assert.shadowDom.equal(
      el,
      `
      <button class="blue sm" title="Update">
        <fa-icon class="fas fa-edit" size=".85rem"></fa-icon>
      </button>
    `
    );
  });
});
