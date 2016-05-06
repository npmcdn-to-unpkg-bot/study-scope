import Sequelize from 'sequelize';
const dbUrl = 'postgres://dzumvzvbcmvoae:kkUcZuMGxjuoiGo-O0YMD18zFW@ec2-54-235-207-226.compute-1.amazonaws.com:5432/dflf1svk25b7g2';
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const School = sequelize.define('school', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
}, {
  freezeTableName: true
});

School.sync();

module.exports = School;