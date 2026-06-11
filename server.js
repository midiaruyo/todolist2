require("dotenv").config();
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT;
const { errorHandle } = require("./errorHandle");

const httpHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PATCH,DELETE",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Content-Type": "application/json",
};
const todos = [];
const httpListener = (req, res) => {
  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, httpHeader);
    res.end(
      JSON.stringify({
        status: true,
        data: todos,
      })
    );
  } else if (req.url == "/todos" && req.method == "POST") {
    //read req data
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    //end read data，process data to res
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          todos.push({
            title,
            id: uuidv4(),
          });
          res.writeHead(200, httpHeader);
          res.end(
            JSON.stringify({
              status: true,
              data: todos,
            })
          );
        } else {
          errorHandle(res, "讀取不到title資料");
        }
      } catch (error) {
        errorHandle(res, "資料格式有誤");
      }
    });
  } else if (req.url == "/todos" && req.method == "OPTIONS") {
    res.writeHead(200, httpHeader);
    res.end(
      JSON.stringify({
        status: true,
        data: todos,
      })
    );
  } else {
    res.writeHead(200, httpHeader);
    res.end(
      JSON.stringify({
        status: false,
        message: "無此網路路由",
      })
    );
  }
};

const server = http.createServer(httpListener);
server.listen(PORT || 3005);
