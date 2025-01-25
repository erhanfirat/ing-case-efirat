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
      firtName: 'Efren',
      lastName: 'Kautzer',
      employmentDate: '2024-03-16T20:05:38.835Z',
      birthDate: '1986-08-20T07:03:14.596Z',
      phone: '991-890-4169 x992',
      email: 'Imelda77@gmail.com',
      department: '4L}p5Wv;7J',
      position: "'+NYN0b5`u",
      id: '1',
    },
    {
      firtName: 'Maribel',
      lastName: 'Steuber',
      employmentDate: '2024-03-07T22:21:13.816Z',
      birthDate: '1984-02-12T22:35:10.045Z',
      phone: '855.613.1464 x65230',
      email: 'Laury.Satterfield@yahoo.com',
      department: 'eLJU2[2Ngm',
      position: 'HRl|5rvt)*',
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
      return {employees: [...state.employees, payload], isLoading: false};
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
