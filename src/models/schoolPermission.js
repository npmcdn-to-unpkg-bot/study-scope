import Sequelize from 'sequelize';
import sequelizeConnection from './../utils/sequelize-connection';

const SchoolPermission = sequelizeConnection.define('schoolPermission', {
  schoolId: {
    type: Sequelize.INTEGER,
    field: 'school_id'
  },
  studentKey: {
    type: Sequelize.STRING,
    field: 'student_key'
  }
}, {
  freezeTableName: true
});

SchoolPermission.sync().then(() => {
  return SchoolPermission.create({
    schoolId: 15,
    studentKey: '1111'
  });
}).then(schoolPermission => {
  schoolPermission.get({plain:true});
});

module.exports = SchoolPermission;