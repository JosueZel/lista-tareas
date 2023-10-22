// list-edit-router.js
const express = require("express");
let listaTareas = require("./data");
const listEditRouter = express.Router();



// Ruta para crear una nueva tarea
listEditRouter.post("/crear-tarea", (req, res) => {
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
listEditRouter.put("/actualizar-tarea/:id", (req, res) => {
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
