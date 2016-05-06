import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
  res.render('signup', {
    title: 'Sign Up'
  });
});

router.get('/side-pick', (req, res) => {
  res.render('side-pick');
});

router.get('/login', (req, res) => {
  res.render('login');
});


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find({
    where: { id: id }
  }).then((user) => done(null, user));
});

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findByUsername(username, (user, err) => {
      if(err) throw err;

      console.log(user);

      if(!user){
        console.log('Unknown User');
        return done(null, false, { message: 'Unknown User' });
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          console.log('Invalid Password');
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: 'Invalid username or password'
  }), (req, res) => {
    console.log('Authentication Successful');
    req.flash('success', 'You are logged in');
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;