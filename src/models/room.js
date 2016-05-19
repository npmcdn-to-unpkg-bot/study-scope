import Sequelize from 'sequelize';
import sequelizeConnection from './../utils/sequelize-connection';

const Room = sequelizeConnection.define('room', {
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

Room.destroyById = function (id) {
  return new Promise(function (resolve, reject) {
    Room.findOne(
      {where: { id: id}}
    )
      .then((room) => { 
        return room.destroy().then(resolve);
      });
  });
};

Room.sync();

// Room.sync()
//   .then(() => {
//     return Room.create({
//       name: 'PI-1220',
//       description: 'Lorem ipsum dolor sit amet, sit te tamquam fabellas.',
//       createdById: 1
//     })
//       .then(() => {
//         return Room.create({
//           name: 'PI-1219',
//           description: 'Id vim delectus pertinax inciderint, an vitae utamur dignissim has, his eu eros legendos complectitur.',
//           createdById: 1
//         })
//           .then(() => {
//             return Room.create({
//               name: 'IP-2121',
//               description: 'Et alterum fastidii cum.',
//               createdById: 1
//             })
//               .then(() => {
//                 return Room.create({
//                   name: 'VF-1232',
//                   description: 'No eos veri congue.',
//                   createdById: 1
//                 })
//                   .then(() => {
//                     return Room.create({
//                       name: 'LD-2312',
//                       description: 'Mea doming periculis eu, vis sumo constituto te, te vis causae fabulas theophrastus.',
//                       createdById: 1
//                     });
//                   });
//               });
//           });
//       });
//   });

module.exports = Room;