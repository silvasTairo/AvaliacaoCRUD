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
    const client = await connect();
    const sql = "INSERT INTO clientes(cpf, nome, email, idade, profissão) VALUES ($1, $2, $3, 4$, 5$);";
    const values = [customer.nome, customer.idade, customer.uf];
    await client.query(sql, values);
}

module.exports = {
    insertCustomer
}