import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';
import {store} from '../store/store';
import {addEmployeeAct, updateEmployeeAct} from '../store/employeeActions';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
    isEditMode: {type: Boolean}, // True if editing, false if adding
  };

  constructor() {
    super();
    this.employee = {
      id: null,
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      emailAddress: '',
      department: '',
      position: '',
    };
    this.isEditMode = false;
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
      margin: auto;
    }
    label {
      font-weight: bold;
    }
    input,
    select,
    button {
      padding: 8px;
      font-size: 16px;
    }
    button {
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <label>
          First Name
          <input
            type="text"
            .value="${this.employee.firstName}"
            @input="${(e) => (this.employee.firstName = e.target.value)}"
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            .value="${this.employee.lastName}"
            @input="${(e) => (this.employee.lastName = e.target.value)}"
            required
          />
        </label>

        <label>
          Date of Employment
          <input
            type="date"
            .value="${this.employee.dateOfEmployment}"
            @input="${(e) => (this.employee.dateOfEmployment = e.target.value)}"
            required
          />
        </label>

        <label>
          Date of Birth
          <input
            type="date"
            .value="${this.employee.dateOfBirth}"
            @input="${(e) => (this.employee.dateOfBirth = e.target.value)}"
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            .value="${this.employee.phoneNumber}"
            @input="${(e) => (this.employee.phoneNumber = e.target.value)}"
            pattern="[0-9]{10}"
            title="Phone number must be 10 digits"
            required
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            .value="${this.employee.emailAddress}"
            @input="${(e) => (this.employee.emailAddress = e.target.value)}"
            required
          />
        </label>

        <label>
          Department
          <select
            .value="${this.employee.department}"
            @change="${(e) => (this.employee.department = e.target.value)}"
            required
          >
            <option value="" disabled selected>Select Department</option>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
        </label>

        <label>
          Position
          <select
            .value="${this.employee.position}"
            @change="${(e) => (this.employee.position = e.target.value)}"
            required
          >
            <option value="" disabled selected>Select Position</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </label>

        <button type="submit">
          ${this.isEditMode ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    `;
  }

  handleSubmit(e) {
    e.preventDefault();

    // Confirm before editing
    if (this.isEditMode) {
      const confirmEdit = confirm(
        'Are you sure you want to update this employee record?'
      );
      if (!confirmEdit) return;
    }

    // Trigger an event to handle the form data
    // const formEvent = new CustomEvent('employee-form-submit', {
    //   detail: {...this.employee},
    //   bubbles: true,
    //   composed: true,
    // });
    // this.dispatchEvent(formEvent);

    store.dispatch(
      this.employee.id
        ? updateEmployeeAct(this.employee)
        : addEmployeeAct(this.employee)
    );

    // Navigate back to the list page
    Router.go('/');
  }
}

customElements.define('employee-form', EmployeeForm);
