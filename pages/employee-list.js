import {LitElement, css, html} from 'lit';
import {Router} from '@vaadin/router';
import {connect} from 'pwa-helpers';
import {store} from '../store/store';
import {deleteEmployeeAct} from '../store/employeeActions';
import '.././components/icon-button.js';

export class EmployeeList extends connect(store)(LitElement) {
  static properties = {
    employees: {type: Array},
    searchQuery: {type: String},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    viewMode: {type: String}, // 'table' or 'list'
  };

  static styles = css`
    th,
    td,
    li {
      padding: 0.25rem 0.5rem;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }
    td:last-child {
      padding: 0.25rem 0;
    }
    th {
      padding-top: 1rem;
    }
    tr:last-child > td {
      border-bottom: none;
    }
    tr:hover > td,
    li:hover {
      background: #eee;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.viewMode = 'table';
    this.isLoading = true;
    this.error = null;
  }

  stateChanged(state) {
    this.employees = state.employees;
  }

  render() {
    const filteredEmployees = this.employees?.filter((emp) =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
    const paginatedEmployees = filteredEmployees.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );

    const actionButtons = (empId) => html`<icon-button
        @click="${() => this.editEmployee(empId)}"
        icon="fa-edit"
        onlyIcon
        title="Update"
      ></icon-button>
      <icon-button
        @click="${() => this.deleteEmployee(empId)}"
        icon="fa-trash"
        onlyIcon
        color="red"
        title="Delete"
      ></icon-button>`;

    return html`
      <div>
        <input
          type="text"
          placeholder="Search employees"
          @input="${(e) => (this.searchQuery = e.target.value)}"
        />
        <button @click="${() => (this.viewMode = 'list')}">List View</button>
        <button @click="${() => (this.viewMode = 'table')}">Table View</button>

        ${this.error && html`<p>${this.error}</p>`}
        ${this.viewMode === 'table'
          ? html`
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
                  ${paginatedEmployees.map(
                    (emp) => html`
                      <tr>
                        <td>${emp.firstName}</td>
                        <td>${emp.lastName}</td>
                        <td>${emp.phone}</td>
                        <td>${emp.department}</td>
                        <td>${emp.email}</td>
                        <td>${emp.position}</td>
                        <td>${emp.employmentDate}</td>
                        <td>${emp.birthDate}</td>
                        <td>${actionButtons(emp.id)}</td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            `
          : html`
              <ul>
                ${paginatedEmployees.map(
                  (emp) => html`
                    <li>
                      ${emp.firstName} ${emp.lastName} | ${emp.department}
                      [${emp.position}] ${actionButtons(emp.id)}
                    </li>
                  `
                )}
              </ul>
            `}

        <!-- Pagination -->
        <div>
          ${Array.from(
            {length: Math.ceil(filteredEmployees.length / this.itemsPerPage)},
            (_, i) =>
              html`
                <icon-button
                  @click="${() => (this.currentPage = i + 1)}"
                  ?disabled="${this.currentPage === i + 1}"
                  label="${i + 1}"
                >
                </icon-button>
              `
          )}
        </div>
      </div>
    `;
  }

  editEmployee(id) {
    Router.go(`/edit/${id}`);
  }

  deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
      store.dispatch(deleteEmployeeAct(id));
    }
  }
}
customElements.define('employee-list', EmployeeList);
