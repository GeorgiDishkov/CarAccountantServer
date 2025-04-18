const express = require('express');
const cors = require('./src/middleware/cors');
const dbConfig = require('./src/config/db');

const auth = require('./src/middleware/authMiddleware');
const router = require('./src/routes/routes');

const PORT = process.env.PORT || 3005;

start()

async function start() {

    try {
        dbConfig();
        console.log("Database started successfully")
    } catch (err) {
        throw new Error("DB not worked currectly")
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(auth());
    app.use(express.static('public'));
    app.use(router);

    app.get(`/`, (req, res) => res.json({ messsage: 'REST Services operational' }))

    app.listen(PORT, '0.0.0.0', () => console.log(`Server work right on port ${PORT}`));

}
