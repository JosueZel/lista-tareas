const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const PORT = 5001;
let {listaTareas} = require("./data");
const {usuarios} = require("./data");
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

dotenv.config(); 
app.use(express.json());

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter); 


app.post("/login", (req, res) => {
    const {username, password} = req.body;
     const usuario = usuarios.find((u) => u.username === username && u.password === password);

    if(!usuario){
       res.status(401).json({error: "credenciales incorrectas"});
       return;
    }
    
    const token = jwt.sign({username},process.env.SECRETKEY, { algorithm: 'HS256' });
    console.log(token);
    res.json({token});
});

function JWTValidation(req, res, next) {
    const authHeater = req.headers.authorization;
  
    if (!authHeater) {
      res.status(401).json({ error: 'Token not provided' });
      return;
    }
    token = authHeater.split(' ')[1];
    jwt.verify(token,process.env.SECRETKEY, {algorithms: 'HS256' }, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      }
     req.usuario = decoded; 
     next();
    });
  }

  app.get('/ruta-protegida', JWTValidation, (req, res) => {
    res.json({ mensaje: 'Ruta protegida alcanzada', usuario: req.usuario.username });
  });


app.get("/", (req, res) => {
    res.send(listaTareas);
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
