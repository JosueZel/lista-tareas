const express = require("express");
const listaTareas = require("./data");
const viewRouter = express.Router();


viewRouter.get('/completadas', (req, res)=>{
    const tareasCompletadas = listaTareas.filter((tarea)=>tarea.isCompleted );
    res.send(tareasCompletadas);

});

viewRouter.get('/incompletas', (req, res)=>{ 
    const tareasincompletas = listaTareas.filter((tarea)=>!tarea.isCompleted);
    res.send(tareasincompletas);

});
module.exports = viewRouter;
