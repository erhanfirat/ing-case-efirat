import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';
import {store} from '../store/store';
import {addEmployeeAct, updateEmployeeAct} from '../store/employeeActions';
import '.././components/icon-button.js';
import '.././components/form-input.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
    isEditMode: {type: Boolean},
  };

  constructor() {
    super();
    this.employee = {
      id: null,
      firstName: '',
      lastName: '',
      employmentDate: '',
      birthDate: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.isEditMode = false;
    this.errors = [];
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

  connectedCallback() {
    super.connectedCallback();
    // Vaadin Router'dan gelen parametre
    const {id} = this.location.params;
    if (id) {
      this.employee = store.getState().employees?.find((emp) => emp.id === id);
      // TODO: employee bulunamazsa durumu handle edilmeli
      this.isEditMode = true;
    }
  }

  render() {
    const emailPattern = `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`;

    return html`
      <form @submit="${this.handleSubmit}">
        <form-input
          label="First Name"
          value="${this.employee.firstName}"
          @input="${(e) => (this.employee.firstName = e.target.value)}"
          required
        ></form-input>

        <form-input
          label="Last Name"
          value="${this.employee.lastName}"
          @input="${(e) => (this.employee.lastName = e.target.value)}"
          required
        ></form-input>

        <form-input
          label="Date of Employment"
          type="date"
          value="${this.employee.employmentDate}"
          @input="${(e) => (this.employee.employmentDate = e.target.value)}"
          required
        ></form-input>

        <form-input
          label="Date of Birth"
          type="date"
          value="${this.employee.birthDate}"
          @input="${(e) => (this.employee.birthDate = e.target.value)}"
          required
        ></form-input>

        <form-input
          label="Phone Number (5XX XXX XXXX)"
          type="tel"
          value="${this.employee.phone}"
          @input="${(e) => (this.employee.phone = e.target.value)}"
          pattern="[0-9]{10}"
          title="Phone number must be 10 digits"
          required
        ></form-input>

        <form-input
          label="Email Address"
          type="email"
          value="${this.employee.email}"
          @input="${(e) => (this.employee.email = e.target.value)}"
          pattern="${emailPattern}"
          required
        ></form-input>

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

        <icon-button
          icon="fa-save"
          label="${this.isEditMode ? 'Update Employee' : 'Add Employee'}"
          .disabled="${this.errors.length > 0}"
          @click=${this.handleSubmit}
        >
        </icon-button>
      </form>
    `;
  }

  handleSubmit(e) {
    e.preventDefault();

    // EF: For this case CustomEvent is not needed
    // Trigger an event to handle the form data
    // const formEvent = new CustomEvent('employee-form-submit', {
    //   detail: {...this.employee},
    //   bubbles: true,
    //   composed: true,
    // });
    // this.dispatchEvent(formEvent);

    this.errors = [];
    const inputs = this.shadowRoot.querySelectorAll('form-input');
    inputs.forEach((input) => {
      if (!input.validate()) {
        this.errors.push(input.error);
      }
    });

    if (this.errors.length === 0) {
      // Confirm before editing
      if (this.isEditMode) {
        const confirmEdit = confirm(
          'Are you sure you want to update this employee record?'
        );
        if (!confirmEdit) return;
      }

      store.dispatch(
        this.employee.id
          ? updateEmployeeAct(this.employee)
          : addEmployeeAct(this.employee)
      );

      // Navigate back to the list page
      Router.go('/');
    }
  }
}

customElements.define('employee-form', EmployeeForm);
