import { json } from "express";
import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employees not found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "insert into employee (name, salary) values (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("delete from employee where id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "employee not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }
};

export const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "update employee set name = IFNULL(?, name), salary = IFNULL(?, salary) where id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "employee not found",
      });

    const [rows] = await pool.query("select * from employee where id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ido mal",
    });
  }
};
