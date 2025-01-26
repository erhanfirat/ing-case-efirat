/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {EmployeeList} from '../pages/employee-list.js';

suite('employee-list', () => {
  test('is defined', () => {
    const el = document.createElement('employee-list');
    assert.instanceOf(el, EmployeeList);
  });

  test('employee-list renders successfully', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    assert.shadowDom.equal(
      el,
      `
      <div>
        <div class="list-header">
          <form-input type="text" icon="fa-search" placeholder="Search Employees"></form-input>
          <div>
            <icon-button icon="fa-list" label="List View"></icon-button>
            <icon-button icon="fa-table" label="Table View" disabled=""></icon-button>
          </div>
        </div>
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Date of Employment</th>
                    <th>Birth Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td data-label="First Name">
                          Enrico
                        </td>
                        <td data-label="Last Name">
                          Rogahn
                        </td>
                        <td data-label="Phone">5173137593</td>
                        <td data-label="Department">
                          Analytics
                        </td>
                        <td data-label="Email">trent.legros@gmail.com</td>
                        <td data-label="Position">
                          Junior
                        </td>
                        <td data-label="Employment Date">
                          2024-02-04
                        </td>
                        <td data-label="Birth Date">
                          1984-10-08
                        </td>
                        <td><icon-button icon="fa-edit" onlyicon="" size="sm" title="Update"></icon-button>
      <icon-button icon="fa-trash" onlyicon="" color="red" size="sm" title="Delete"></icon-button></td>
                      </tr>
                    
                      <tr>
                        <td data-label="First Name">
                          Lavonne
                        </td>
                        <td data-label="Last Name">
                          Armstrong
                        </td>
                        <td data-label="Phone">5186661300</td>
                        <td data-label="Department">
                          Analytics
                        </td>
                        <td data-label="Email">kaia_gutmann0@hotmail.com</td>
                        <td data-label="Position">
                          Medior
                        </td>
                        <td data-label="Employment Date">
                          2024-11-05
                        </td>
                        <td data-label="Birth Date">
                          1995-12-21
                        </td>
                        <td><icon-button icon="fa-edit" onlyicon="" size="sm" title="Update"></icon-button>
      <icon-button icon="fa-trash" onlyicon="" color="red" size="sm" title="Delete"></icon-button></td>
                      </tr>
                    
                      <tr>
                        <td data-label="First Name">
                          Sven
                        </td>
                        <td data-label="Last Name">
                          Hoppe
                        </td>
                        <td data-label="Phone">5198856235</td>
                        <td data-label="Department">
                          Analytics
                        </td>
                        <td data-label="Email">lenore17@hotmail.com</td>
                        <td data-label="Position">
                          Medior
                        </td>
                        <td data-label="Employment Date">
                          2024-04-26
                        </td>
                        <td data-label="Birth Date">
                          1999-12-25
                        </td>
                        <td><icon-button icon="fa-edit" onlyicon="" size="sm" title="Update"></icon-button>
      <icon-button icon="fa-trash" onlyicon="" color="red" size="sm" title="Delete"></icon-button></td>
                      </tr>
                    
                      <tr>
                        <td data-label="First Name">
                          Ronny
                        </td>
                        <td data-label="Last Name">
                          Emard
                        </td>
                        <td data-label="Phone">5187808602</td>
                        <td data-label="Department">
                          Analytics
                        </td>
                        <td data-label="Email">juvenal.ernser@gmail.com</td>
                        <td data-label="Position">
                          Senior
                        </td>
                        <td data-label="Employment Date">
                          2024-02-14
                        </td>
                        <td data-label="Birth Date">
                          2002-03-17
                        </td>
                        <td><icon-button icon="fa-edit" onlyicon="" size="sm" title="Update"></icon-button>
      <icon-button icon="fa-trash" onlyicon="" color="red" size="sm" title="Delete"></icon-button></td>
                      </tr>
                    
                      <tr>
                        <td data-label="First Name">
                          Hector
                        </td>
                        <td data-label="Last Name">
                          Cartwright
                        </td>
                        <td data-label="Phone">5145305428</td>
                        <td data-label="Department">
                          Analytics
                        </td>
                        <td data-label="Email">madisyn_hettinger@gmail.com</td>
                        <td data-label="Position">
                          Senior
                        </td>
                        <td data-label="Employment Date">
                          2024-02-11
                        </td>
                        <td data-label="Birth Date">
                          2003-11-29
                        </td>
                        <td><icon-button icon="fa-edit" onlyicon="" size="sm" title="Update"></icon-button>
      <icon-button icon="fa-trash" onlyicon="" color="red" size="sm" title="Delete"></icon-button></td>
                      </tr>
                    
                </tbody>
              </table>
        <div class="pagination">
          <icon-button icon="fa-chevron-left">
          </icon-button>
          <icon-button disabled="" label="1">
                </icon-button><icon-button label="2">
                </icon-button><icon-button label="3">
                </icon-button><span class="page-ellipsis">...</span><icon-button label="10">
                </icon-button>
          <icon-button icon="fa-chevron-right">
          </icon-button>
        </div>
      </div>
      `
    );
  });
});
