import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';
import handler from './handlers/users-handler';

const router = express.Router();

router.get('/register-teacher', handler.registerTeacherGET);

router.post('/register-teacher', handler.registerTeacherPOST);

router.get('/register-student', handler.registerStudentGET);

router.post('/register-student', handler.registerStudentPOST);

router.get('/side-pick', handler.sidePickGET);

router.get('/login', handler.loginGET);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find({
    where: {id: id}
  }).then((user) => done(null, user));
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findByUsername(username, (user, err) => {
      if (err) throw err;

      if (!user) {
        console.log('Unknown User');
        return done(null, false, {message: 'There is no user with such username.'});
      }

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          console.log('Invalid Password');
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));

router.post( '/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }), handler.loginPOST);

router.get('/logout', handler.logoutGET);

module.exports = router;