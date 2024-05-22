import express from "express";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bangkit capstone",
  password: "root",
  port: 5432
});

db.connect();

db.connect(err => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to the database');
    }
});
  
app.get('/content_data', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM content_data');
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/content_data/:user_id/', async (req, res) => {
    const { user_id } = req.params;

    try {
        const userPreferenceQuery = await db.query('SELECT tag_liked FROM user_preferences WHERE user_id = $1', [user_id]);
        
        if (userPreferenceQuery.rows.length === 0) {
            res.status(404).send('User preferences not found');
            return;
        }

        const tagLiked = userPreferenceQuery.rows[0].tag_liked;

        const contentDataQuery = await db.query('SELECT * FROM content_data WHERE tags_of_content = $1', [tagLiked]);

        res.json(contentDataQuery.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
