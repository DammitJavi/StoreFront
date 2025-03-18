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
    database: 'storefront',
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


//Get Product Data
app.get('/api/product/:id', async (req, res) => {
    try{

        const result = await pg.query('SELECT id, product_name, category, price, sku, dimensions, status from Inventory WHERE id = $1',[req.params.id]);
        
        if (result.rows.length === 0){
            return res.status(404).json({ message: "Product Not Found."})
        }

        console.log('object: ', result.rows[0])

        // Send response
        res.json({ message: 'Received', value: result.rows[0] });
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
});


app.post('/api/users/', async (req,res) => {
    try{
        console.log(req.body);
        const { username, email, password } = req.body;

        const userInfoQuery = "INSERT INTO usersdb(username, email, password) VALUES ($1, $2, $3)";

        const result = await pg.query(userInfoQuery, [username, email, password]);
        console.log("User Added: ", result.rows[0]);
        res.status(200).json({ message: "User Added:", user: result.rows[0]})
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Database Error: User Insert Error'});
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});