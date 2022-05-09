const mysql = require('mysql')
require('dotenv').config()

//connection pool
const pool = mysql.createPool({
        host           : process.env.DB_HOST, 
        user           : process.env.DB_USER, 
        password       : process.env.DB_PASS, 
        database       : process.env.DB_NAME,
        connectionLimit : 100,
        
})
    
    

exports.view = (req, res) =>{

//connect to DB
pool.getConnection((err, connection)=>{

    if (err) throw err
   
    console.log("connect to database as ID"+connection.threadId);
   
    //User connection
    connection.query("SELECT * FROM user WHERE status = 'active'", (err, rows)=>{
        // when done with connection release it
        connection.release()
        if (!err) {
            res.render('home', {rows})
        }else{
            console.log(err);
        }

        console.log(rows);
    })

})

}

exports.find = (req, res)=>{
    pool.getConnection((err, connection)=>{

        if (err) throw err
       
        console.log("connect to database as ID"+connection.threadId);

        let searchterm = req.body.search
       
        //User connection
        connection.query("SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR phone LIKE ? ",["%" +searchterm+ "%","%" +searchterm+ "%","%" +searchterm+ "%"], (err, rows)=>{
            // when done with connection release it
            connection.release()
            if (!err) {
                res.render('home', {rows})
            }else{
                console.log(err);
            }
    
            console.log(rows);
        })
    
    })

}




exports.form = (req, res) =>{
    res.render('add-user')
}


exports.create = (req, res)=>{
    pool.getConnection((err, connection)=>{

        if (err) throw err
       
        console.log("connect to database as ID"+connection.threadId);

        let {first_name,last_name,email,phone,comments} = req.body
       
        //User connection
        connection.query("INSERT INTO user SET first_name = ?, last_name = ?, email = ? , phone = ? , comments = ? ",[first_name,last_name,email,phone,comments], (err, rows)=>{
            // when done with connection release it
            connection.release()
            if (!err) {
                res.render('add-user', {alart : "user add successfully"})
            }else{
                console.log(err);
            }
    
            console.log(rows);
        })
    
    })
}

exports.editPage = (req, res) =>{

    //connect to DB
pool.getConnection((err, connection)=>{

    if (err) throw err
   
    console.log("connect to database as ID"+connection.threadId);
   
    //User connection
    connection.query("SELECT * FROM user WHERE id = ?",[req.params.id], (err, rows)=>{
        // when done with connection release it
        connection.release()
        if (!err) {
            res.render('edit-user', {rows})
        }else{
            console.log(err);
        }

        console.log(rows);
    })

})
}


exports.editUsers = (req, res) =>{

    //connect to DB
pool.getConnection((err, connection)=>{

    if (err) throw err
   
    console.log("connect to database as ID"+connection.threadId);

    let {first_name,last_name,email,phone,comments} = req.body
   
    //User connection
    connection.query("UPDATE user SET first_name = ?, last_name = ? , email = ? , phone = ? , comments = ? WHERE user.id = ? ",[first_name,last_name,email,phone,comments,req.params.id], (err, rows)=>{
        // when done with connection release it
        connection.release()
        if (!err) {
            pool.getConnection((err, connection)=>{

                if (err) throw err
               
                console.log("connect to database as ID"+connection.threadId);
               
                //User connection
                connection.query("SELECT * FROM user WHERE id = ?",[req.params.id], (err, rows)=>{
                    // when done with connection release it
                    connection.release()
                    if (!err) {
                        res.render('edit-user', {rows})
                    }else{
                        console.log(err);
                    }
            
                    console.log(rows);
                })
            
            })
        }else{
            console.log(err);
        }

        console.log(rows);
    })

})
}


exports.delete = (req, res) =>{
        //connect to DB
pool.getConnection((err, connection)=>{

    if (err) throw err
   
    console.log("connect to database as ID"+connection.threadId);
   
    //User connection
    connection.query("DELETE FROM user WHERE id = ?",[req.params.id], (err, rows)=>{
        // when done with connection release it
        connection.release()
        if (!err) {
            res.redirect('/')
        }else{
            console.log(err);
        }

        console.log(rows);
    })

})
}