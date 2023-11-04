// list-edit-router.js
const express = require("express");
let listaTareas = require("./data");
const listEditRouter = express.Router();


//Middleware que maneja si la solicitud es POST el body esta vacio
const manejoBodyVacio = (req, res, next) => {
  if (req.method === 'POST'){
    if(Object.keys(req.body).length === 0 && req.body.constructor===Object){
      return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío.' });
    }
  } 
  next();
};


const validarTarea = (req, res, next) => {
  // Verifica que el cuerpo de la solicitud sea un objeto
  if (typeof req.body !== 'object') {
    return res.status(400).json({ error: 'La solicitud debe contener un objeto JSON válido.' });
  }

  // Verifica que se proporcionen los atributos necesarios
  const { id, isCompleted, description } = req.body;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'El atributo "id" es inválido o falta en la solicitud.' });
  }
  if (isCompleted === undefined || typeof isCompleted !== 'boolean') {
    return res.status(400).json({ error: 'El atributo "isCompleted" es inválido o falta en la solicitud.' });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'El atributo "description" es inválido o falta en la solicitud.' });
  }

  next();
};


// Ruta para crear una nueva tarea
listEditRouter.post("/crear-tarea", manejoBodyVacio,validarTarea, (req, res) => {
  const dataTarea = req.body;
  listaTareas.push(dataTarea);
  res.status(200).send("se creo una tarea");
});

// Ruta para eliminar una tarea por ID
listEditRouter.delete("/eliminar-tarea/:id", (req, res) => {
  const tareaId = req.params.id;
  listaTareas = listaTareas.filter((tarea) => (tarea.id !== tareaId));
    res.send("tarea eliminada exitosamente");
  
  
});

// Ruta para actualizar una tarea por ID
listEditRouter.put("/actualizar-tarea/:id", manejoBodyVacio, validarTarea, (req, res) => {
  const tareaId = req.params.id;
  const newDataTarea = req.body;

  const tareaExistente = listaTareas.find((tarea) => (tarea.id === tareaId));
  if (!tareaExistente) {
    return res.status(404).send("Tarea no encontrada");
  }
  tareaExistente.description = newDataTarea.description;
  tareaExistente.isCompleted = newDataTarea.isCompleted;

  res.send("Tarea actualizada");
});

module.exports = listEditRouter;
