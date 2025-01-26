/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {FormInput} from '../components/form-input.js';

suite('form-input', () => {
  test('is defined', () => {
    const el = document.createElement('form-input');
    assert.instanceOf(el, FormInput);
  });

  test('form-input renders with default values', async () => {
    const el = await fixture(html`<form-input></form-input>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="form-group">
        <label></label>
        <div class="input-container">
          <input type="text" placeholder="" class=" " pattern="">
        </div>
      </div>
      `
    );
  });

  test('form-input renders with a set label', async () => {
    const el = await fixture(
      html`<form-input label="First Name"></form-input>`
    );
    assert.shadowDom.equal(
      el,
      `
      <div class="form-group">
        <label>First Name</label>
        <div class="input-container">
          <input type="text" placeholder="" class=" " pattern="">
        </div>
      </div>
      `
    );
  });

  test('form-input renders with an search icon and placeholder', async () => {
    const el = await fixture(html`<form-input
      type="text"
      placeholder="Search Employees"
      icon="fa-search"
    ></form-input>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="form-group">
        <label></label>
        <div class="input-container">
          <fa-icon class="fas fa-search  icon"></fa-icon>
          <input type="text" placeholder="Search Employees" class=" withIcon" pattern="">
        </div>
      </div>
    `
    );
  });

  test('form-input renders with an search icon and placeholder', async () => {
    const el = await fixture(html`<form-input
      label="Email Address"
      type="email"
      value="abc@qwe.com"
      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
      required
    ></form-input>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="form-group">
        <label>Email Address</label>
        <div class="input-container">
          <input type="email" placeholder="" class=" " pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" required="">
        </div>
      </div>
    `
    );
  });
});
