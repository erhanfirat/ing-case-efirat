/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {EmployeeForm} from '../pages/employee-form.js';

suite('employee-form', () => {
  test('is defined', () => {
    const el = document.createElement('employee-form');
    assert.instanceOf(el, EmployeeForm);
  });

  test('employee-form renders successfully', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    assert.shadowDom.equal(
      el,
      `
      <form>
        <form-input required="" label="First Name" value=""></form-input>

        <form-input required="" label="Last Name" value=""></form-input>

        <form-input type="date" required="" label="Date of Employment" value=""></form-input>

        <form-input type="date" required="" label="Date of Birth" value=""></form-input>

        <form-input type="tel" pattern="[0-9]{10}" required="" label="Phone Number (5XX XXX XXXX)" value="" title="Phone number must be 10 digits"></form-input>

        <form-input type="email" required="" label="Email Address" value="" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"></form-input>

        <div class="form-group">
          <label>Department</label>
          <div class="input-container">
            <select required="">
              <option value="" disabled="" selected="">
                Select Department
              </option>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Position</label>
          <div class="input-container">
            <select required="">
              <option value="" disabled="" selected="">Select Position</option>
              <option value="Junior">Junior</option>
              <option value="Medior">Medior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>

        <icon-button icon="fa-save" label="Add Employee">
        </icon-button>
      </form>
      `
    );
  });
});
