const express = require("express");
const app = express();
const PORT = 5001;
let {listaTareas} = require("./data");
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");


app.use(express.json());

app.use("/view", listViewRouter);
app.use("/edit", listEditRouter); 




app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
