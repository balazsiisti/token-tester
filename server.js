const http = require("http");

const port = 4000;

const server = http.createServer((req, res) => {
  const val = req.headers.referer?.split("?").at(-1);
  console.log(val);
  // Get the token from the request headers
  const token = req.headers["authorization"];
  if (token === "Bearer 1234") {
    // If the token is valid, send the HTML page with a button
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
     <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
          }
          .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          button {
            margin-bottom: 10px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #8b99a7ff;
            color: white;
            border: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #76777aff;
          }
          h1 {
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome, Authorized User!</h1>
          <button><a href="gapp://done">Click Me (simple)</a></button>
          <button><a href="gapp://done?externalResultId=success">Click Me (external result ID)</a></button>
          <p id='result'>${val}</p>
        </div>

      </body>
      </html>
    `);
  } else {
    // If the token is missing or invalid, send a 401 Unauthorized response
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("<h1>Error: Unauthorized</h1><p>A valid token is required.</p>");
  }
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
