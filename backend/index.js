const express = require('express');
const app = express();
const serverConfig = require('./config/server.config');
const sequelize = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
app.use(cors());

app.use(
  session({
    secret: 'My-Secret',
    store: new sequelizeStore({
      expiration: 24 * 60 * 60 * 1000,
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);


const orderController = require('./controllers/order.controller');
app.post('/stripe/webhook', express.raw({ type: 'application/json' }), orderController.stripeWebHook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'productImages')))

sequelize.sync({ alter: true })
  .then(() => {
    console.log('sync successfully');
  })
  .catch((err) => {
    console.log(err.message);
  });


const apiRoutes = require('./routes/apiRoutes')
const { routeNotFound } = require('./middleware')

app.use(apiRoutes)
app.use(routeNotFound)



app.listen(serverConfig.PORT, () => {
  console.log('Server started at Port :', serverConfig.PORT);
});
