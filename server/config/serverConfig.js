const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const serverConfig = (app) => {
  // погран. служба / парсит тело из формы
  app.use(express.urlencoded({ extended: true }));

  // CORS (Cross-Origin Resource Sharing)- механизм, использующий дополнительные HTTP-заголовки, чтобы дать возможность агенту 
  // пользователя получать разрешения на доступ к выбранным ресурсам с сервера на источнике (домене), 
  // отличном от того, что сайт использует в данный момент. Говорят, что агент пользователя делает запрос 
  //с другого источника (cross-origin HTTP request), если источник текущего документа отличается 
  //от запрашиваемого ресурса доменом, протоколом или портом.
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      optionsSuccessStatus: 200,
      credentials: true
    })
  );

  // погран. служба регистрации / парсит JSON
  app.use(express.json());

  // "служба" фиксации логов
  app.use(morgan("dev"));

  // куки
  app.use(cookieParser());
};

module.exports = serverConfig;