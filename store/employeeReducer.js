import {employeeData} from './employeeData';

export const EMP_ACTIONS = {
  fetch: 'FETCH_EMPLOYEES',
  set: 'SET_EMPLOYEE',
  add: 'ADD_EMPLOYEE',
  update: 'UPDATE_EMPLOYEE',
  delete: 'DELETE_EMPLOYEE',
};

const INITIAL_STATE = {
  employees: [...employeeData],
  isLoading: false,
};

export const employeeReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case EMP_ACTIONS.set:
      return {employees: payload, isLoading: false};

    case EMP_ACTIONS.add: {
      return {
        employees: [
          ...state.employees,
          {
            ...payload,
            id: Math.floor(Math.random() * 9999999999999).toString(),
          },
        ],
        isLoading: false,
      };
    }

    case EMP_ACTIONS.update: {
      const newEmployees = state.employees.map((emp) =>
        emp.id === payload.id ? payload : emp
      );
      return {employees: newEmployees, isLoading: false};
    }

    case EMP_ACTIONS.delete: {
      return {
        employees: state.employees.filter((e) => e.id !== payload),
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
