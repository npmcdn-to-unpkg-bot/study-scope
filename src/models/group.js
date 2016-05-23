import Sequelize from 'sequelize';
import sequelizeConnection from './../utils/sequelize-connection';

const Group = sequelizeConnection.define('group', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  createdById: {
    type: Sequelize.INTEGER,
    field: 'createdById'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  }
}, {
  freezeTableName: true
});

Group.sync();

module.exports = Group;