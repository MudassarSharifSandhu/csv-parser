require("dotenv").config();
const app = require('express')();
var http = require('http');
var cors = require('cors');
const  bodyParser =require("body-parser");

const { dbConnection } = require('./connection')
const parserRoute = require('./routes/parser.route');
const port = process.env.PORT || 8000
dbConnection()
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.status(200).send({ data: true })
});
app.use('/dataenty', parserRoute);
const server = http.createServer(app);

server.listen(port, function () {
    console.log(`Server is running on ${port}`);
});