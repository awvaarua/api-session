module.exports = {
    apps : [
        {
          name: "myapp",
          script: "./build/app/app.js",
          env: {
              "PORT": 3000,
              "NODE_ENV": "production"
          }
        }
    ]
  }