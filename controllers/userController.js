import db from '../db/db.js';

// Create a new user
export const createUser = async (req, res, next) => {

    const { name, email, age } = req.body;
    try {
        const query = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *';
        const result = await db.query(query, [name, email, age]);
        res.status(201).json({ message: "User created successfully", user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// Fetch all users
export const getAllUsers = async (req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM users");
        res.status(200).json({ message: "Users fetched successfully", users: result.rows });
    } catch (err) {
        next(err);
    }
};

// Fetch user by ID
export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: `User with id: ${id} fetched successfully`, user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// Update user
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const query = 'UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4';
        const result = await db.query(query, [name, email, age, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated" });
    } catch (err) {
        next(err);
    }
};

// Delete user
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        next(err);
    }
};