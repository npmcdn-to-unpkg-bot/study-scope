import Sequelize from 'sequelize';
import sequelizeConnection from './../utils/sequelize-connection';

const File = sequelizeConnection.define('file', {
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  originalName: {
    type: Sequelize.STRING,
    field: 'original_name'
  },
  encoding: {
    type: Sequelize.STRING,
    field: 'encoding'
  },
  mimetype: {
    type: Sequelize.STRING,
    field: 'mimetype'
  },
  filename: {
    type: Sequelize.STRING,
    field: 'filename'
  },
  path: {
    type: Sequelize.STRING,
    field: 'path'
  },
  size: {
    type: Sequelize.DECIMAL,
    field: 'path'
  },
  downloadedById: {
    type: Sequelize.INTEGER,
    field: 'downloaded_by_id'
  },
  roomId: {
    type: Sequelize.INTEGER,
    field: 'room_id'
  }
}, {
  freezeTableName: true
});

File.sync();

module.exports = File;