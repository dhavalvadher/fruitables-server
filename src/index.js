require('dotenv').config()
const express = require('express')
const Routes = require('./routes/api/v1/index');
const connectDB = require('./db/mongodb');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { facebookProvider, googleProvider } = require('./utils/Provider');
const connectChat = require('./utils/socketIO');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/api.yaml');

const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'abcdefghijklmnopqrstuvwxyz',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



connectDB();
googleProvider();
facebookProvider();
connectChat();
app.use('/api/v1', Routes);

app.listen(9000, () => {
  console.log("Server started at port 9000.");
});


