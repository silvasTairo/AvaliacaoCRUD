async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();

// Função para inserir clientes
async function insertCustomer(customer) {
    console.log("Inserindo client:", customer);
    const client = await connect();
    const sql = "INSERT INTO client(cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5);";
    const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];
    await client.query(sql, values);
}

// Função para puxar todos os clientes
async function getCustomers() {
    const client = await connect();
    const sql = "SELECT * FROM client;";
    const result = await client.query(sql);
    return result.rows;
}

module.exports = {
    insertCustomer
    // getCustomers
}