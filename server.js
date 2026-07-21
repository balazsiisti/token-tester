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
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
          }
          .container {
            width: 100%;
            max-width: 360px;
            background-color: #fff;
            padding: 28px 24px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #333;
            font-size: 20px;
            margin: 0 0 20px;
          }
          .group {
            margin-bottom: 20px;
          }
          .group:last-child {
            margin-bottom: 0;
          }
          .group-label {
            font-size: 12px;
            font-weight: 700;
            margin: 0 0 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            text-align: left;
          }
          .btn {
            display: block;
            width: 100%;
            padding: 16px 20px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            color: white;
            border: none;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            transition: filter 0.15s ease, transform 0.1s ease;
          }
          .btn:last-child {
            margin-bottom: 0;
          }
          .btn:hover {
            filter: brightness(0.92);
          }
          .btn:active {
            filter: brightness(0.85);
            transform: scale(0.98);
          }
          .group--gapp .group-label {
            font-size: 1rem;
            color: #3266cc;
          }
          .group--gapp .btn {
            background-color: #4d7ce8;
          }
          .group--sa .group-label {
            font-size: 1rem;
            color: #d9822b;
          }
          .group--sa .btn {
            background-color: #ec9a3c;
          }
          hr {
            border: none;
            border-top: 1px solid #e5e5e5;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome, Authorized User!</h1>
          <div class="group group--gapp">
            <p class="group-label">GApp</p>
            <a class="btn" href="gapp://done">Click Me (simple)</a>
            <a class="btn" href="gapp://done?externalResultId=success">Click Me (external result ID)</a>
          </div>
          <hr>
          <div class="group group--sa">
            <p class="group-label">SA</p>
            <a class="btn" href="ehid://done">Click Me (simple)</a>
            <a class="btn" href="ehid://done?externalResultId=success">Click Me (external result ID)</a>
          </div>
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
