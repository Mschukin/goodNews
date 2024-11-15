const express = require('express');
require("dotenv").config()
const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// конфигурация сервера
serverConfig(app)

// маршрутизация
app.use('/', indexRouter)

// запускаю прослушивание сервера на 3000 порту
app.listen(PORT, () => console.log(`Server started at ${PORT} port`))