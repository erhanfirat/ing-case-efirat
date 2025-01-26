import {LitElement, css, html} from 'lit';
import {Router} from '@vaadin/router';
import {connect} from 'pwa-helpers';
import {store} from '../store/store';
import {deleteEmployeeAct} from '../store/employeeActions';
import '.././components/icon-button.js';
import '.././components/form-input.js';

export class EmployeeList extends connect(store)(LitElement) {
  static properties = {
    employees: {type: Array},
    searchQuery: {type: String},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    viewMode: {type: String}, // 'table' or 'list'
  };

  static styles = css`
    div.list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    table {
      width: 100%;
      margin: 0.5rem 0;
    }

    th,
    td,
    li {
      padding: 0.25rem 0.5rem;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }
    ul {
      padding-left: 0;
    }
    li {
      list-style: none;
    }
    td:last-child {
      padding: 0.25rem 0;
    }
    th {
      padding-top: 1rem;
    }
    tr:last-child > td,
    li:last-child {
      border-bottom: none;
    }
    tr:hover > td,
    li:hover {
      background: #eee;
    }

    .pagination {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.1rem;
    }
    .page-ellipsis {
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media screen and (max-width: 600px) {
      div.list-header {
        flex-direction: column;
        justify-content: center;
      }

      table,
      thead,
      tbody,
      th,
      td,
      tr {
        display: block;
      }

      th {
        display: none; /* Başlıkları gizler */
      }

      tr {
        margin-bottom: 1rem;
        border-bottom: 2px solid #333;
      }

      td {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding-left: 0.5rem;
      }

      td:before {
        content: attr(data-label);
        font-weight: bold;
        font-size: 0.75rem;
        display: block;
        margin-bottom: 5px;
        margin-left: -0.5rem;
        color: #777;
      }

      td:last-child {
        text-align: center;
        padding-bottom: 1rem;
      }
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
    const pageCount = Math.ceil(filteredEmployees.length / this.itemsPerPage);
    const paginatedEmployees = filteredEmployees.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );

    const actionButtons = (empId) => html`<icon-button
        @click="${() => this.editEmployee(empId)}"
        icon="fa-edit"
        onlyIcon
        title="Update"
        size="sm"
      ></icon-button>
      <icon-button
        @click="${() => this.deleteEmployee(empId)}"
        icon="fa-trash"
        onlyIcon
        color="red"
        title="Delete"
        size="sm"
      ></icon-button>`;

    return html`
      <div>
        <div class="list-header">
          <form-input
            type="text"
            placeholder="Search employees"
            icon="fa-search"
            @input="${(e) => (this.searchQuery = e.target.value)}"
          ></form-input>
          <div>
            <icon-button
              @click="${() => (this.viewMode = 'list')}"
              icon="fa-list"
              label="List View"
              ?disabled=${this.viewMode === 'list'}
            ></icon-button>
            <icon-button
              icon="fa-table"
              @click="${() => (this.viewMode = 'table')}"
              label="Table View"
              ?disabled=${this.viewMode === 'table'}
            ></icon-button>
          </div>
        </div>

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
                        <td data-label="First Name">${emp.firstName}</td>
                        <td data-label="Last Name">${emp.lastName}</td>
                        <td data-label="Phone">${emp.phone}</td>
                        <td data-label="Department">${emp.department}</td>
                        <td data-label="Email">${emp.email}</td>
                        <td data-label="Position">${emp.position}</td>
                        <td data-label="Employment Date">
                          ${emp.employmentDate}
                        </td>
                        <td data-label="Birth Date">${emp.birthDate}</td>
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
        <div class="pagination">
          <icon-button
            @click="${() => {
              this.currentPage = Math.max(this.currentPage - 1, 1);
            }}"
            ?disabled="${pageCount < 2}"
            icon="fa-chevron-left"
          >
          </icon-button>
          ${this.getPaginationButtons(this.currentPage, pageCount, 5).map((i) =>
            i === '...'
              ? html`<span class="page-ellipsis">...</span>`
              : html`<icon-button
                  @click="${() => (this.currentPage = i)}"
                  ?disabled="${this.currentPage === i}"
                  label="${i}"
                >
                </icon-button>`
          )}

          <icon-button
            @click="${() => {
              this.currentPage = Math.min(this.currentPage + 1, pageCount);
            }}"
            ?disabled="${pageCount < 2}"
            icon="fa-chevron-right"
          >
          </icon-button>
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

  getPaginationButtons(currentPage, totalPages, maxButtons = 7) {
    const buttons = [];
    const half = Math.floor(maxButtons / 2);

    // Eğer toplam sayfa sayısı maxButtons'dan küçük veya eşitse, tüm sayfaları göster
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
      return buttons;
    }

    // İlk ve son sayfa her zaman gösterilir
    buttons.push(1);

    // Ortadaki butonları hesapla
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    // Eğer başlangıç çok küçükse, end'i ayarla
    if (currentPage <= half) {
      end = Math.min(totalPages - 1, maxButtons - 2);
    }

    // Eğer bitiş çok büyükse, start'ı ayarla
    if (currentPage + half >= totalPages) {
      start = Math.max(2, totalPages - (maxButtons - 2));
    }

    // Eğer başlangıç ve bitiş arasında boşluk varsa, ellips ekle
    if (start > 2) {
      buttons.push('...');
    }

    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }

    if (end < totalPages - 1) {
      buttons.push('...');
    }

    // Son sayfa
    buttons.push(totalPages);

    return buttons;
  }
}
customElements.define('employee-list', EmployeeList);
