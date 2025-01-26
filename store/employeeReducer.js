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
};

export const employeeReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case EMP_ACTIONS.set:
      return {...state, employees: payload};

    case EMP_ACTIONS.add: {
      return {
        ...state,
        employees: [
          ...state.employees,
          {
            ...payload,
            id: Math.floor(Math.random() * 9999999999999).toString(),
          },
        ],
      };
    }

    case EMP_ACTIONS.update: {
      const newEmployees = state.employees.map((emp) =>
        emp.id === payload.id ? payload : emp
      );
      return {...state, employees: newEmployees};
    }

    case EMP_ACTIONS.delete: {
      return {
        ...state,
        employees: state.employees.filter((e) => e.id !== payload),
      };
    }

    default:
      return state;
  }
};
