// import {QueryClient} from '@tanstack/query-core';
import axios from 'axios';

// Erhan: TanStack Query Lit Adaptor is still in progress
// When the PR is completed, tanStack can be acivated
// Check: https://github.com/TanStack/query/pull/7715/files

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1, // Retry failed requests once
//       refetchOnWindowFocus: false, // Disable refetching when the window regains focus
//     },
//   },
// });

const API = axios.create({
  baseURL: 'https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/',
});

export const fetchEmployeesReq = async () => {
  try {
    const response = await API.get('employee');
    return response.data;
  } catch (err) {
    throw new Error('Network error!');
  }
};

export const fetchEmployeeById = async (employeeId) => {
  const response = await API.get(`employee/${employeeId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const createEmployeeReq = async (newEmployee) => {
  const response = await API.post(`employee`, newEmployee);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const updateEmployeeReq = async (updatedEmployee) => {
  const response = await API.put(
    `employee/${updatedEmployee.id}`,
    updatedEmployee
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const deleteEmployeeReq = async (employeeId) => {
  const response = await API.delete(`employee/${employeeId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};
