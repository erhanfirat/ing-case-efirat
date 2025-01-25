export const EMP_ACTIONS = {
  fetch: 'FETCH_EMPLOYEES',
  set: 'SET_EMPLOYEE',
  add: 'ADD_EMPLOYEE',
  update: 'UPDATE_EMPLOYEE',
  delete: 'DELETE_EMPLOYEE',
};

const INITIAL_STATE = {
  employees: [
    {
      firstName: 'Efren',
      lastName: 'Kautzer',
      employmentDate: '2024-03-16',
      birthDate: '1986-08-20',
      phone: '5556667788',
      email: 'imelda77@gmail.com',
      department: 'Analytics',
      position: 'Junior',
      id: '1',
    },
    {
      firstName: 'Maribel',
      lastName: 'Steuber',
      employmentDate: '2024-03-07',
      birthDate: '1984-02-12',
      phone: '5554443322',
      email: 'Laury.Satterfield@yahoo.com',
      department: 'Tech',
      position: 'Senior',
      id: '2',
    },
  ],
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
