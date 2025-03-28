const express = require("express");
const router = express.Router();
const db = require("../db"); // Ensure db.js is properly configured


// router.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     const sql = "SELECT * FROM employees WHERE email = ? AND password = ?";
//     db.query(sql, [email, password], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Database query failed" });
//         }
//         if (results.length === 0) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }
//         res.json({ message: "Login successful", user: results[0] });
//     });
// });
router.post("/login", (req, res) => {
    const { email, password,user,admin } = req.body;
    console.log(req.body)
    if(admin){
        const sql = "SELECT * FROM admins WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.json({ message: "Login successful", user: results[0] });
    });
    }else if(user){
        const sql = "SELECT * FROM employees WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.json({ message: "Login successful", user: results[0] });
    });
    }
});


router.post("/add-employee", (req, res) => {
    const { name, email, password, role } = req.body;

    const sql = "INSERT INTO employees (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())";
    db.query(sql, [name, email, password, role], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database insertion failed" });
        }
        res.json({ message: "Employee added successfully", id: result.insertId });
    });
});

module.exports = router;
