const express = require("express");
const app = express();
const PORT = 5001;

const listaTareas =  [
    {
        "id":"123456",
        "isCompleted":false,
        "description":"pasear al perro"
    },

    {
        "id":"1234567",
        "isCompleted":false,
        "description":"hacer tareas"
    },
    
    { 
        "id":"1234568",
        "isCompleted":true,
        "description":"avanzar en el curso"
    }
    ]

const listaJson = JSON.stringify(listaTareas);

app.get("/",(req, res) => {
    res.send(listaJson);
})

app.listen(PORT, ()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}` )

});