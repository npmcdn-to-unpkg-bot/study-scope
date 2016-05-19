import Sequelize from 'sequelize';
import dbConnector from './db-connector';

module.exports = new Sequelize(dbConnector.getUrl(), {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});
