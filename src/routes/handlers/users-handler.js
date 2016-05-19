import School from './../../models/school';
import User from './../../models/user';
import SchoolPermission from './../../models/schoolPermission';

function UsersHandler() {
  
  function registerTeacherGET(req, res) {
    School.findAll().then(schools => {
      res.render('register-teacher', {
        schools: schools
      });
    });
  }
  
  function registerTeacherPOST(req, res) {
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

    if (errors) {
      School.findAll().then(schools => {
        res.render('register-teacher', { errors: errors });
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
              type: 'teacher'
            })
            .then((user) => {
              console.log(user);
              res.redirect('/');
            });
        });
    }
  }

  function registerStudentGET(req, res) {
    School.findAll().then(schools => {
      res.render('register-student', {
        schools: schools
      });
    });
  }

  function registerStudentPOST(req, res) {
    const bodyData = getBodyData(req.body, [
      'schoolName', 'name', 'userName', 'email',
      'password', 'reenteredPassword', 'studentKey'
    ]);

    req.checkBody('bodyData.schoolName', 'School Name field is required').notEmpty();
    req.checkBody('bodyData.username', 'User name is required').notEmpty();
    req.checkBody('bodyData.name', 'Name is required').notEmpty();
    req.checkBody('bodyData.email', 'Email name is required').notEmpty();
    req.checkBody('bodyData.email', 'Email not valid').isEmail();
    req.checkBody('bodyData.password', 'Password field is required').notEmpty();
    req.checkBody('bodyData.reenteredPassword', 'You need entered password twice').notEmpty();
    req.checkBody('bodyData.reenteredPassword', 'Password do not match').equals(bodyData.password);

    var errors = req.validationErrors();

    console.log('errors', errors);

    if(errors) {
      School.findAll().then(schools => {
        console.log(schools);
        res.render('register-student', { errors: errors });
      });
    } else {
      School
        .findOne({
          where: { name: bodyData.schoolName }
        })
        .then((school) => {
          SchoolPermission.findOne({
            where: { schoolId: school.id, studentKey: bodyData.studentKey }
          }).then(schoolPermission => {
            console.log(schoolPermission);

            if (!schoolPermission) {
              console.log('School permissions dined!');
              res.redirect('/'); // TODO: render correct errors!
            } else {
              User
                .create({
                  name: bodyData.name,
                  username: bodyData.username,
                  password: bodyData.password,
                  email: bodyData.email,
                  schoolId: school.id,
                  type: 'user',
                  studentKey: bodyData.studentKey
                })
                .then((user) => {
                  console.log(user);
                  res.redirect('/');
                });
            }
          });
        });
    }
  }
  
  function sidePickGET(req, res) {
    res.render('side-pick');
  }
  
  function loginGET(req, res) {
    res.render('login');
  }
  
  function loginPOST(req, res) {
    console.log('Authentication Successful');
    res.redirect('/', { message: req.flash('success', 'You are logged in') });
  }
  
  function logoutGET(req, res) {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
  }

  function getBodyData(body, props) {
    const data = {};
    props.forEach((value, index) => data[value] = body[value]);
    return data;
  }

  
  return {
    registerTeacherGET: registerTeacherGET,
    registerTeacherPOST: registerTeacherPOST,
    registerStudentGET: registerStudentGET,
    registerStudentPOST: registerStudentPOST,
    sidePickGET: sidePickGET,
    loginGET: loginGET,
    loginPOST: loginPOST,
    logoutGET: logoutGET
  }
  
}

module.exports = new UsersHandler();