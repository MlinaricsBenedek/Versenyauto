import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'db',
  port: 5432,
  user: 'postgres',       
  password: 'mlinarics',   
  database: 'ddlfeladat' 
});

async function test() {
  try {
    await client.connect();
    const res = await client.query('SELECT 1');
  } catch (err) {
  } finally {
    await client.end();
  }
}

test();
