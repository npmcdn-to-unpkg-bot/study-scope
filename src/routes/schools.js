import express from 'express';
import School from '../models/school';
import User from '../models/user';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register-school');
});

router.post('/register', (req, res) => {
  let schoolName = req.body.schoolName;
  let admName = req.body.name;
  let admUsername = req.body.username;
  let admEmail = req.body.email;
  let admPassword = req.body.password;
  let admReenteredPassword = req.body.reenteredPassword;

  req.checkBody('schoolName', 'School Name field is required').notEmpty();
  req.checkBody('username', 'User name is required').notEmpty();
  req.checkBody('email', 'Email name is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('reenteredPassword', 'You need entered password twice').notEmpty();
  req.checkBody('reenteredPassword', 'Password do not match').equals(admPassword);

  let errors = req.validationErrors();

  if(errors) {
    res.render('register-school', {
      errors: errors,
      schoolName: schoolName,
      username: admUsername,
      email: admEmail,
      password: admPassword,
      reenteredPassword: admReenteredPassword
    });
  } else {
    School
      .create({
        name: schoolName
      })
      .then((school) => {
        console.log(school);

        User
          .create({
            name: admName,
            username: admUsername,
            password: admPassword,
            email: admEmail,
            schoolId: school.id
          })
          .then((user) => {

            console.log(user);

            res.redirect('/');
          });
      });
  }


});

module.exports = router;