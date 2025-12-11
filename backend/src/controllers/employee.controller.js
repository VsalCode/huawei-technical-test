const employeeStore = require("../services/employee.service");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeStore.findAll();
    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeStore.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee found",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newEmployee = await employeeStore.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await employeeStore.update(id, req.body);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error.message === "Employee not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await employeeStore.delete(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    if (error.message === "Employee not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
