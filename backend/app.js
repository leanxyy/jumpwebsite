{
  "name": "jsi_web",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "railway:debug": "node --inspect app.js", // For advanced debugging
    "test": "echo \"Error: no test specified\" && exit 1",
    "clear-cache": "rm -rf node_modules package-lock.json", // Cross-platform fix
    "reset": "npm run clear-cache && npm install",
    "prepare": "npm install" // Auto-run on Railway builds
  },
  "engines": {
    "node": "18.x", // Explicit Node.js version for Railway
    "npm": "9.x"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "multer": "^1.4.5-lts.2",
    "nodemailer": "^6.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
