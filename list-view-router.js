const express = require("express");
let listaTareas = require("./data");
const viewRouter = express.Router();


viewRouter.get('/completadas', (req, res)=>{
    const tareasCompletadas = listaTareas.filter((tarea)=>tarea.isCompleted );
    res.send(tareasCompletadas);

});

viewRouter.get('/incompletas', (req, res)=>{ 
    const tareasincompletas = listaTareas.filter((tarea)=>!tarea.isCompleted);
    res.send(tareasincompletas);

});

viewRouter.get('/tareas', (req, res)=>{ 
    res.send(listaTareas);

});

viewRouter.get('/tareas/:id', (req, res)=>{ 
    const tareaId = req.params.id
    const tareaexistente = listaTareas.filter((tarea)=>(tarea.id === tareaId));
    res.send(tareaexistente);

});
module.exports = viewRouter;
