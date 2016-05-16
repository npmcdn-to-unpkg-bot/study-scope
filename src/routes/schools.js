import express from 'express';
import School from '../models/school';
import User from '../models/user';
import SchoolPermission from '../models/schoolPermission';

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
            schoolId: school.id,
            type: 'admin'
          })
          .then((user) => {

            console.log(user);

            res.redirect('/');
          });
      });
  }
});

router.get('/manage-permissions', (req, res) => {
  res.render('manage-school-permissions');
});

router.post('/add-permission', (req, res) => {
  var studentKey = req.body.studentKey;
  var user = req.user;

  req.checkBody('studentKey', 'Student key is required!').notEmpty();

  var errors = req.validationErrors();

  console.log('errors', errors);

  if(errors) {
    res.render('manage-school-permissions', {
      errors: errors,
      user: user
    });
  } else {
    SchoolPermission.create({
      schoolId: user.schoolId,
      studentKey: studentKey
    }).then(() => {
      res.render('manage-school-permissions', {
        user: user
      });
    });
  }

});

module.exports = router;