import {QueryClient} from '@tanstack/query-core';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Disable refetching when the window regains focus
    },
  },
});

// https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/

const API = axios.create({
  baseURL: 'https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/',
});

export const fetchEmployees = async () => {
  const response = await API.get('employee');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const fetchEmployeeById = async (employeeId) => {
  const response = await API.get(`employee/${employeeId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const createEmployee = async (newEmployee) => {
  const response = await API.post(`employee`, newEmployee);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const updateEmployee = async (updatedEmployee) => {
  const response = await API.put(
    `employee/${updatedEmployee.id}`,
    updatedEmployee
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export const deleteEmployee = async (employeeId) => {
  const response = await API.delete(`employee/${employeeId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};
