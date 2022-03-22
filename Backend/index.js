const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require ('mysql2');


const app = express();

app.use(cors());
app.use(bodyparser.json());


// database connection

const db = mysql.createConnection({
host:'localhost',
user:'jerryl',
password:'Mysql@12345',
database:'sampledb',
port: 3306,
});

//  database connection

db.connect(err=>{
    console.log('database connected',err);
})

app.get('/user',(req,res)=>{
    let qr = 'select * from user';
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result  
            })
        }
    })
 });

 app.post('/user',(req,res)=>{
    console.log(req.body,'createdata');
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let eMail = req.body.email;
    let dateofBirth = req.body.dateofbirth;
    let mobileno  = req.body.mobileno ;
    let qr = `insert into user(firstname,lastname,email,dateofbirth,mobileno)values('${firstName}','${lastName}','${eMail}','${dateofBirth}','${mobileno}')`;
    console.log(qr,'qr')
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'data inserted',
        })
    });
});


//delete data
app.delete('/user/:id', (req, res) => {
    let qID = req.params.id;
    let qr = `delete from user where id = '${qID}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'data deleted'
        })
    });
});

//Get single data
app.get('/user/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        if (result.length > 0) {
            res.send({
                message: 'GET SINGLE DATA',
                data: result
            });
        } else {
            res.send({
                message: "DATA NOT FOUND"
            })
        }
    })
});


//  Update user with id
//update data
app.put('/user/:id', (req, res) => {
    console.log(req.body, 'updatedata');
    let gID = req.params.id;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let eMail = req.body.email;
    let dateofBirth = req.body.dateofbirth;
    let mobileNo = req.body.mobileno;
    let qr = `update user set firstname = '${firstName}', lastname = '${lastName}', email = '${eMail}', dateofbirth = '${dateofBirth}' , mobileno = '${mobileNo}'
    where id = ${gID}`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'Data updated'
        });
    });
})





app.listen(3000,()=>{
    console.log('server running..');
});

