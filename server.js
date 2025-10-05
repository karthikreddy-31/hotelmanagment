
const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const fs = require('fs');
const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection("mysql://avnadmin:AVNS_S5l52eheRP5J4FFSlXx@hotelmanagment-hotelmanagment.e.aivencloud.com:28514/defaultdb?ssl-mode=REQUIRED");
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database:', err);
        return;
    }  
    console.log('Connected to MySQL database.');
}) 

app.get('/',(req,res)=>{
    res.json('hi welcome');
});
app.post('/signup',(req,res)=>{
    const sql="INSERT INTO signup (`name`,`email`,`password`) VALUES(?,?,?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,values,(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login',(req,res)=>{
    const sql="SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password], (err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length==0){
            return res.json("Fail");
        }
        else{
            return res.json("Success");
        }
        
    })
})

app.listen(8081, ()=>{
    console.log("Listening");
})

