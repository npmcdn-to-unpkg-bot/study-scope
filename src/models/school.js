import Sequelize from 'sequelize';
import sequelizeConnection from './../utils/sequelize-connection';

const School = sequelizeConnection.define('school', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
}, {
  freezeTableName: true
});

School.sync();

module.exports = School;