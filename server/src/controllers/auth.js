import passport from 'passport';
import { generateJWTToken } from '../helpers/jwt';

export function login(req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return res
          .status(401)
          .json({ error: 'Username or password is incorrect' });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, username: user.username };
        const { success, token } = await generateJWTToken(body);
        res.cookie('token', token, {
          httpOnly: false,
        });
        return res.json({
          success,
          token,
          user: user && user.toJSON(),
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}
