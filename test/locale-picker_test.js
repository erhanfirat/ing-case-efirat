/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {LocalePicker} from '../components/locale-picker.js';

suite('locale-picker', () => {
  test('is defined', () => {
    const el = document.createElement('locale-picker');
    assert.instanceOf(el, LocalePicker);
  });

  test('locale-picker renders successfully', async () => {
    const el = await fixture(html`<locale-picker></locale-picker>`);
    assert.shadowDom.equal(
      el,
      `
      <select>
        <option value="en" selected="">
          English
        </option><option value="tr-TR">
          Türkçe
        </option>
      </select>
      `
    );
  });
});
