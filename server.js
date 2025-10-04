
const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const fs = require('fs');
const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:"hotelmanagment-hotelmanagment.e.aivencloud.com",
    user:"avnadmin",
    password:"AVNS_S5l52eheRP5J4FFSlXx",
    database:"defaultdb",
    port:"28514",
    ssl:{ rejectUnauthorized: true,
        ca:fs.readFileSync('./ca.pem')
    }
});
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
    const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?,?,?)";
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
    const sql="SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password], (err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");
        }
        else{
            return res.json("Fail");
        }
        
    })
})

app.listen(8081, ()=>{
    console.log("Listening");
})

