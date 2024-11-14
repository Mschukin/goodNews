const express = require('express');
const serverConfig = require('./config/serverConfig')
const path = require('path');
const { News } = require('./db/models')
const newsRouter = require('./routes/news.routes')
const app = express();
const PORT = 3000;

serverConfig(app)

app.use('/', newsRouter)
app.listen(PORT, () => console.log(`Server started at ${PORT} port`)) 