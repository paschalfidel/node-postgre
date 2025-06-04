import { Client } from 'pg';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());


const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: "demodb",
});


con.connect()
.then(()=> console.log('Connected to PostgreSQL'))
.catch((err) => {
    console.error('Connection error', err.stack);
    process.exit(1);
});


// POST: Add new user
app.post('/users', (req, res) => {

    const { name, email, age } = req.body;

    const insertQuery = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *';

    con.query(insertQuery, [name, email, age], (err, result) => {
        if(err)
            {
                console.error(err);
                return res.status(500).json({ message: "Database insert error" });
            } 
            
            res.status(201).json({ message: "User created successfully"});
    });
});

// GET: Fetch all users
app.get('/users', (req, res) => {

    const fetchQuery = "SELECT * FROM users";
    con.query(fetchQuery, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching users" });
        }
        res.status(200).json({ message: "Users fetched successfully", users: result.rows });
    });
});

// GET: Fetch user by ID
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const fetchQuery = "SELECT * FROM users WHERE id = $1";

    con.query(fetchQuery, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching user" });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User fetched successfully", user: result.rows[0] });
    });
});

// PUT: Update user
app.put('/users/:id', (req, res) => {
    
    const id = req.params.id;
    const{ name, email, age} = req.body;

    const updateQuery = "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4";
    con.query(updateQuery, [name, email, age, id], (err, result) => {
        if (err)
            {
                console.error(err);
                return res.status(500).json({ message: "Error updating user"});
            } 

            if (result.rowCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({ message: "User updated successfully"});
    });
});


//DELETE: Remove user
app.delete('/users/:id', (req, res) => {

    const id = req.params.id;

    const deleteQuery = "DELETE FROM users WHERE id = $1";
    con.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting user"});
        }

        if (result.rowCount === 0) {
           return res.status(404).json({ message: `No user found with that ID: ${id}` });
        } 
        
        res.status(200).json({message: `User with ID: ${id} deleted successfully` });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})