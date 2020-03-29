import { User } from '../models';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const { JWT_SECRET } = process.env;
console.log('JWT SECRET is ', JWT_SECRET);

module.exports = app => {
  app.get('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          User.findOne({
            where: {
              username: user.username
            }
          }).then(user => {
            const token = jwt.sign({ id: user.username }, JWT_SECRET);
            res.status(200).send({
              auth: true,
              token: token,
              message: 'user found & logged in'
            });
          });
        });
      }
    })(req, res, next);
  });
};
