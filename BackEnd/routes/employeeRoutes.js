const express =require("express")
const router=express.Router()
const db=require('../db')

router.post('/leaveRequestList',(req,res)=>{

const {id}=req.body;

const sql="SELECT * FROM leave_requests WHERE id=?"

db.query(sql,[id],(err,results)=>{
    if (err) {
        return res.status(500).json({ error: "Database query failed" });
    }
    res.json({message:"User List",userList:results[0]||[]})
})


})
router.post('/applyLeaveRequest',(req,res)=>{

    const {employee_id,start_date,end_date,reason}=req.body;
    
    const sql=`INSERT INTO leave_requests (employee_id, start_date, end_date, reason, status, applied_at, approved_by) VALUES (?,?,?,?,'pending',CURRENT_TIMESTAMP,NULL)`;

    
    db.query(sql, [employee_id, start_date, end_date, reason], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed", details: err });
        }
        res.status(201).json({ message: "Leave request submitted successfully", requestId: result.insertId });
    });
    })
module.exports=router;