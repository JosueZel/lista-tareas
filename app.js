const express = require("express");
const app = express();
const PORT = 5001;
let listaTareas = require("./data");

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");



app.use(express.json());


app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter); 

app.get("/", (req, res) => {
    res.send(listaTareas);
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
