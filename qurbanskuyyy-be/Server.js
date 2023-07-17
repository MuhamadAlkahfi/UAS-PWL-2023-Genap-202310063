  // import modul 
  const express = require("express"); 
  const mysql = require("mysql"); 
  const bodyParser = require("body-parser"); 
  
  // inisialisasi aplikasi 
  const app = express(); 
  const port = 3001; 
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 
  
  // url koneksi ke database 
  const connection = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "qurbanskuyyy", 
  }); 

  connection.connect((error) => { 
      if (error) { 
        console.error("Error connecting to database", error); 
      } else { 
        console.log("connected to database"); 
      } 
    }); 

    // menambahkan middleware cors 
  app.use((req, res, next) => { 
      res.setHeader("Access-Control-Allow-Origin", "*"); //mengizinkan permintaan dari asal apapun 
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
      res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
      next(); 
    }); 
  
  // POST /users 
  app.post("/users", (req, res) => { 
      const { id, name, username, phone, address, email, password, type } = req.body; 
    
      const query = "INSERT INTO users (id, name, username, phone, address, email, password, type) VALUES (?, ?, ?, ?, ?, ?, ?, ? )"; 
      const values = [id, name, username, phone, address, email, password, type]; 
    
      connection.query(query, values, (err, results) => { 
        if (err) { 
          console.error("Error create users: ", err); 
          res.status(500).send("Error create users"); 
        } else { 
          console.log("Users create successfully"); 
          res.status(200).send("Users create successfully"); 
        } 
      }); 

    }); 

    // GET /users 
  app.get("/users", (req, res) => { 
      const query = "SELECT * FROM users"; 
    
      connection.query(query, (error, results) => { 
        if (error) { 
          console.error("Error querying database:", error); 
          res.status(500).json({ error: "Internal server error" }); 
        } else { 
          res.json(results).status(200); 
        } 
      }); 
    }); 
    
    // POST /members 
    app.post("/members", (req, res) => { 
        const { id, member_id, username, phone, address, email } = req.body; 
      
        const query = "INSERT INTO members (id, member_id, username, phone, address, email) VALUES (?, ?, ?, ?, ?, ?)"; 
        const values = [id, member_id, username, phone, address, email]; 
      
        connection.query(query, values, (err, results) => { 
          if (err) { 
            console.error("Error to members: ", err); 
            res.status(500).send("Error to members"); 
          } else { 
            console.log("members successfully"); 
            res.status(200).send("members successfully"); 
          } 
        }); 
      }); 
      
      // GET /members 
      app.get("/members", (req, res) => { 
        const query = "SELECT * FROM members"; 
      
        connection.query(query, (error, results) => { 
          if (error) { 
            console.error("Error querying database:", error); 
            res.status(500).json({ error: "Internal server error" }); 
          } else { 
            res.json(results).status(200); 
          } 
        }); 
      }); 
    
      // POST /signup   
    app.post('/registrasi', (req, res) => {  
        const { id, username, phone, address, email, password } = req.body;  
      
        const query = 'INSERT INTO registrasi (id, username, phone, address, email, password) VALUES(?, ?, ?, ?, ?, ?)';  
        connection.query(query, [id, username, phone, address, email, password], (error, results) => {  
            if (error) {  
                console.error('Error executing query:', error);  
                res.status(500).json({ error: 'Internal server error' });  
            } else {  
                console.log('Product added to database!');  
                res.status(200).json({ message: 'Account added to database' });  
            }  
        })  
    })  
      
    // GET /sign_up  
    app.get('/registrasi', (req, res) => {  
        const query = "SELECT * FROM registrasi";  
      
        connection.query(query, (error, results) => {  
            if (error) {  
                console.error('Error executing query:', error);  
                res.status(500).json({ error: 'Internal server error' });  
            } else {  
                res.status(200).json(results);
    }  
        });  
    }); 

    

    app.post('/fhewan', (request, response) => {
      const { NHewan, JHewan, PHewan } = request.body;
    
      const sql = `INSERT INTO fhewan (NHewan, JHewan, PHewan) VALUES (?, ?, ?)`;
      const values = [NHewan, JHewan, PHewan];
    
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Gagal mengirim data form', error);
          response.status(500).json({ message: 'Input form gagal' });
        } else {
          console.log('Data form terkirim!');
          response.status(200).json({ message: 'Data sudah terkirim coy' });
        }
      });
    });
    
    app.get('/fhewan', (request, response) => {
      const query = "SELECT * FROM fhewan";
    
      connection.query(query, (error, results) => {
        if (error) {
          console.error("Error querying database:", error);
          response.status(500).json({ error: "Internal server error" });
        } else {
          response.json(results).status(200);
        }
      });
    });
    
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });