import Sequelize from 'sequelize';

import dotenv from 'dotenv';
dotenv.load();

const dbUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const SchoolPermission = sequelize.define('schoolPermission', {
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