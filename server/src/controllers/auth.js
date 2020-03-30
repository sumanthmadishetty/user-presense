import passport from 'passport';
import { generateJWTToken } from '../helpers/jwt';

export function login(req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log('user ledu', user);
        const error = new Error('An Error occurred');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, username: user.username };
        const token = await generateJWTToken(body);
        return res.json({ token }).status(200);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}