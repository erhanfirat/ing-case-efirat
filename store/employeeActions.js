import {EMP_ACTIONS} from './employeeReducer';

export const fetchEmployeesAct = () => ({
  type: EMP_ACTIONS.fetch,
});

export const addEmployeeAct = (newEmployee) => ({
  type: EMP_ACTIONS.add,
  payload: newEmployee,
});

export const updateEmployeeAct = (employee) => ({
  type: EMP_ACTIONS.update,
  payload: employee,
});

export const deleteEmployeeAct = (employeeId) => ({
  type: EMP_ACTIONS.delete,
  payload: employeeId,
});
