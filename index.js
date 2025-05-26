require("dotenv").config(); 

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

app.use(express.json());


// Rota para inserir clientes
app.post("/clientes", async (req, res) => {
    await db.insertCustomer(req.body);
    res.status(201);
})

// Rota para puxar todos os clientes
app.get("/clientes", async (req, res) => {
    const clientes = await db.getCustomers();
    res.status(200).json(clientes);
});

app.listen(port);

console.log("Backend Rodando!")