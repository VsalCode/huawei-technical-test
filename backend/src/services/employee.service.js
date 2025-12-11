const employees = require("../models/employee.model");

const employeeStore = {
  findAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...employees]);
      }, 100);
    });
  },

  findById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const employee = employees.find((emp) => emp.id === parseInt(id));
        resolve(employee || null);
      }, 100);
    });
  },

  create: async (employeeData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId =
          employees.length > 0
            ? Math.max(...employees.map((emp) => emp.id)) + 1
            : 1;

        const newEmployee = {
          id: newId,
          ...employeeData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        employees.push(newEmployee);
        resolve(newEmployee);
      }, 100);
    });
  },

  update: async (id, employeeData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = employees.findIndex((emp) => emp.id === parseInt(id));

        if (index === -1) {
          reject(new Error("Employee not found"));
          return;
        }

        const updatedEmployee = {
          ...employees[index],
          ...employeeData,
          id: parseInt(id),
          updatedAt: new Date(),
        };

        employees[index] = updatedEmployee;
        resolve(updatedEmployee);
      }, 100);
    });
  },

  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = employees.findIndex((emp) => emp.id === parseInt(id));

        if (index === -1) {
          reject(new Error("Employee not found"));
          return;
        }

        employees.splice(index, 1);
        resolve(true);
      }, 100);
    });
  },
};

module.exports = employeeStore;
