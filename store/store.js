// import { configureStore, createSlice } from '@reduxjs/toolkit';

import { legacy_createStore } from "redux";
import { employeeReducer } from "./employeeReducer";

// // Example: Create a slice for managing employees
// const employeesSlice = createSlice({
//   name: 'employees',
//   initialState: [],
//   reducers: {
//     addEmployee: (state, action) => {
//       state.push(action.payload);
//     },
//     updateEmployee: (state, action) => {
//       const index = state.findIndex((emp) => emp.id === action.payload.id);
//       if (index !== -1) {
//         state[index] = action.payload;
//       }
//     },
//     deleteEmployee: (state, action) => {
//       return state.filter((emp) => emp.id !== action.payload);
//     },
//   },
// });

// export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;

// const store = configureStore({
//   reducer: {
//     employees: employeesSlice.reducer,
//   },
// });

// export default store;

export const store = legacy_createStore(employeeReducer)