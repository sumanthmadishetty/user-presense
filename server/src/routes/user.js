import { Router } from 'express';
import { User } from '../models';
import passport from 'passport';

const router = Router();

// router.get('/', async (req, res) => {
//   const users = await req.context.models.User.find();
//   return res.send(users);
// });

// router.get('/:userId', async (req, res) => {
//   const user = await req.context.models.User.findById(req.params.userId);
//   return res.send(user);
// });

// module.exports = app => {
//   app.post('/registerUser', (req, res, next) => {
//     passport.authenticate('register', (err, user, info) => {
//       if (err) {
//         console.log(err);
//       }
//       if (info != undefined) {
//         console.log(info.message);
//         res.send(info.message);
//       } else {
//         req.logIn(user, err => {
//           const data = {
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             email: req.body.email,
//             username: user.username
//           };
//           User.findOne({
//             where: {
//               username: data.username
//             }
//           }).then(user => {
//             user
//               .update({
//                 first_name: data.first_name,
//                 last_name: data.last_name,
//                 email: data.email
//               })
//               .then(() => {
//                 console.log('user created in db');
//                 res.status(200).send({ message: 'user created' });
//               });
//           });
//         });
//       }
//     })(req, res, next);
//   });
// };

export default router;
