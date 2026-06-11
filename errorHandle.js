function errorHandle(res, message) {
  const httpHeader = {
    "Access-Control-Origin": "*",
    "Access-Control-Method": "GET,POST,OPTIONS,PATCH,DELETE",
    "Access-Control-HEADER":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Content-Type": "application/json",
  };

  res.writeHead(400, httpHeader);
  res.end(
    JSON.stringify({
      status: false,
      message: message,
    })
  );
}
module.exports = { errorHandle };
