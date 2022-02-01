const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const db = require('./kernel/db');

// Token management
const tokenMgmtRoutes = require("./routes/security/tokenRoutes.js");

db.connect();

router.get('/', (req, res) => {
    res.write('ROOT');
    res.write(`
        To test this API, you can use POSTMAN or the Insomnia REST client:
        https://updates.insomnia.rest/downloads/windows/latest?app=com.insomnia.app&source=website
        https://dl.pstmn.io/download/latest/win64
    `);
    res.send();
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', router);
app.use('/token', tokenMgmtRoutes);


module.exports = app;