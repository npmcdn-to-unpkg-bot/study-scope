import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';
import School from '../models/school';
import SchoolPermission from '../models/schoolPermission';

const router = express.Router();

router.get('/register-teacher', (req, res) => {
  School.findAll().then(schools => {
    res.render('register-teacher', {
      schools: schools
    });
  });
});


router.post('/register-teacher', (req, res) => {
  let schoolName = req.body.schoolName;
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let reenteredPassword = req.body.reenteredPassword;

  req.checkBody('schoolName', 'School Name field is required').notEmpty();
  req.checkBody('username', 'User name is required').notEmpty();
  req.checkBody('email', 'Email name is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('reenteredPassword', 'You need entered password twice').notEmpty();
  req.checkBody('reenteredPassword', 'Password do not match').equals(password);

  let errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    School.findAll().then(schools => {
      res.render('register-teacher', {
        schools: schools,
        errors: errors,
        schoolName: schoolName,
        name: name,
        username: username,
        email: email,
        password: password,
        reenteredPassword: reenteredPassword
      });
    });
  } else {
    School
      .findOne({
        where: {name: schoolName}
      })
      .then((school) => {
        console.log(school);
        User
          .create({
            name: name,
            username: username,
            password: password,
            email: email,
            schoolId: school.id,
            type: 'user'
          })
          .then((user) => {
            console.log(user);
            res.redirect('/');
          });
      });
  }
});

router.get('/register-student', (req, res) => {
  console.log('here');
  School.findAll().then(schools => {
    res.render('register-student', {
      schools: schools
    });
  });
});

router.post('/register-student', (req, res) => {
  let schoolName = req.body.schoolName;
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let reenteredPassword = req.body.reenteredPassword;
  let studentKey = req.body.studentKey;

  req.checkBody('schoolName', 'School Name field is required').notEmpty();
  req.checkBody('username', 'User name is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email name is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('reenteredPassword', 'You need entered password twice').notEmpty();
  req.checkBody('reenteredPassword', 'Password do not match').equals(password);

  var errors = req.validationErrors();

  console.log('errors', errors);

  if(errors) {
    School.findAll().then(schools => {
      res.render('register-student', {
        schools: schools,
        errors: errors,
        schoolName: schoolName,
        name: name,
        username: username,
        email: email,
        password: password,
        reenteredPassword: reenteredPassword,
        studentKey: studentKey
      });
    });
  } else {
    School
      .findOne({
        where: {name: schoolName}
      })
      .then((school) => {
        SchoolPermission.findOne({
          where: {schoolId: school.id, studentKey: studentKey}
        }).then(schoolPermission => {
          console.log(schoolPermission);

          if (!schoolPermission) {
            console.log('School permissions dined!');
            res.redirect('/');
            // res.render('register-student', {
            //   schoolName: schoolName,
            //   name: name,
            //   username: username,
            //   email: email,
            //   password: password,
            //   reenteredPassword: reenteredPassword,
            //   studentKey: studentKey
            // });
          } else {
            User
              .create({
                name: name,
                username: username,
                password: password,
                email: email,
                schoolId: school.id,
                type: 'user',
                studentKey: studentKey
              })
              .then((user) => {
                console.log(user);
                res.redirect('/');
              });
          }
        });
      });
  }
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

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }), (req, res) => {
    console.log('Authentication Successful');
    res.redirect('/', {message: req.flash('success', 'You are logged in')});
  });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;