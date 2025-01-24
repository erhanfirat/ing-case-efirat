import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';

export class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    searchQuery: {type: String},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    viewMode: {type: String}, // 'table' or 'list'
  };

  constructor() {
    super();
    this.employees = [];
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.viewMode = 'table';
  }

  render() {
    const filteredEmployees = this.employees.filter((emp) =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
    const paginatedEmployees = filteredEmployees.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );

    return html`
      <div>
        <input
          type="text"
          placeholder="Search employees"
          @input="${(e) => (this.searchQuery = e.target.value)}"
        />
        <button @click="${() => (this.viewMode = 'list')}">List View</button>
        <button @click="${() => (this.viewMode = 'table')}">Table View</button>

        ${this.viewMode === 'table'
          ? html`
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${paginatedEmployees.map(
                    (emp) => html`
                      <tr>
                        <td>${emp.firstName} ${emp.lastName}</td>
                        <td>${emp.position}</td>
                        <td>
                          <button @click="${() => this.editEmployee(emp.id)}">
                            Edit
                          </button>
                          <button @click="${() => this.deleteEmployee(emp.id)}">
                            Delete
                          </button>
                        </td>
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
                      ${emp.firstName} ${emp.lastName} - ${emp.position}
                      <button @click="${() => this.editEmployee(emp.id)}">
                        Edit
                      </button>
                      <button @click="${() => this.deleteEmployee(emp.id)}">
                        Delete
                      </button>
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
                <button
                  @click="${() => (this.currentPage = i + 1)}"
                  ?disabled="${this.currentPage === i + 1}"
                >
                  ${i + 1}
                </button>
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
      this.employees = this.employees.filter((emp) => emp.id !== id);
    }
  }
}
customElements.define('employee-list', EmployeeList);
