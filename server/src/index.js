import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

//PostgreSQL connection
const pg = new Pool({
    user: 'javierrojas',
    host: 'localhost',
    database: 'StoreFront',
    password: 'password',
    port: 5432,
});

//Testing Connection
pg.connect((err) => {
    if (err) console.log('Database connection error: ', err);
    else console.log('Connected to PostgreSQL');
});

//Get Inventory Data
app.get('/api', async (req, res) => {
    try{
        const data = await pg.query('SELECT id, product_name, category , price, sku, dimensions, status FROM Inventory');
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});