require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3001;

const characterRouter = require('./routes/characterRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');

app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/characters', characterRouter);
app.use('/inventory', inventoryRouter);
app.use('/', (req, res) => {
  res.json({
    message: "Up and running"
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
