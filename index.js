require("dotenv").config(); 

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

app.use(express.json());


// Rota para inserir clientes
app.post("/client", async (req, res) => {
    await db.insertCustomer(req.body);
    res.status(201);
})

// Rota para puxar todos os clientes
app.get("/client", async (req, res) => {
    const client = await db.getCustomers();
    res.status(200).json(client);
});

app.listen(port);

console.log("Backend Rodando!")