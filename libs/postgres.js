//Conexion por cliente nos es muy adecuada por que hace una
//Conexion cada vez que llamamos a getConnection
const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin123',
    database: 'my_store',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
