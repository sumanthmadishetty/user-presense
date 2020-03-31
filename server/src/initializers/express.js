import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import routes from '../routes';
import passport from 'passport';
import fs from 'fs';
import path from 'path';
import '../middleware/passport';

const accessLogStream = fs.createWriteStream(
  path.join('logs', 'access.log'),
  {
    flags: 'a',
  },
);

export default function (app) {
  app.use(morgan('combined', { stream: accessLogStream })); //Log to access.log
  app.use(morgan('dev')); // Log to STDOUT

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/', async (req, res) => {
    return res.send('Welcome to express');
  });
  app.get('/401', async (req, res) => {
    return res.json({ error: 'Unauthorised' }).status(401);
  });

  // Load the routes that donot need authentication
  loadUnAuthenticatedRoutes(app);

  // Passport Authentication as middleware

  app.use(
    passport.authenticate('jwt', {
      session: false,
      // failureRedirect: '/401',
    }),
  );

  // Load the routes that need authentication
  loadAuthenticatedRoutes(app);

  //   Error catchers
  app.use((req, res, next) => {
    const error = new Error('Could not find this route.');
    throw error;
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({
      message: error.message || 'An unknown error occurred!',
    });
  });
}

function loadUnAuthenticatedRoutes(app) {
  app.get('/', async (req, res) => {
    return res.send('Welcome to express');
  });
  app.use('/user', routes.auth);
}

function loadAuthenticatedRoutes(app) {
  app.use('/users', routes.user);
  app.get('/test-auth', async (req, res) => {
    return res.json(req.user.toObject());
  });
}
