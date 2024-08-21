require('dotenv').config()
const express = require('express')
const Routes = require('./routes/api/v1/index');
const connectDB = require('./db/mongodb');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { facebookProvider, googleProvider } = require('./utils/Provider');
// const connectChat = require('./utils/socketIO');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./src/api.yaml');
const path = require('path')

const app = express()

googleProvider();
facebookProvider();

const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));


app.use(
  '/api/docs',
  express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      url: '/public/api.yaml' // Path to your YAML file
    }
  })
);


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
  // origin : 'https://fruitables-client.vercel.app',
  origin:'http://localhost:3000/',
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


// connectChat();
app.use('/api/v1', Routes);

app.get("/", (req,res) => {
  res.send("Hello, World!");
})

app.listen(9000, () => {
  console.log("Server started at port 9000.");
});


