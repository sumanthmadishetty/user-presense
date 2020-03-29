import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

require('./passport/passport-auth');
// Application-Level Middleware

app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch')
  };
  next();
});

// Routes

// app.use('/users', routes.user);
require('./routes/registerUser')(app);
require('./routes/loginUser')(app);
require('./routes/findUser')(app);

// Start

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
