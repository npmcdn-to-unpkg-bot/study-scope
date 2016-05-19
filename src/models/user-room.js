import Sequelize from 'sequelize';
import sequelizeConnection from './../utils/sequelize-connection';

const UserRoom = sequelizeConnection.define('user_room', {
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  }, 
  roomId: {
    type: Sequelize.INTEGER,
    field: 'room_id'
  }
}, {
  freezeTableName: true
});

UserRoom.sync();

module.exports = UserRoom;