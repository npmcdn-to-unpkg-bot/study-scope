import express from 'express';
import Room from './../models/room';
import UserRoom from './../models/user-room';
import User from './../models/user';
import File from './../models/file';
const router = express.Router();

router.get('/manage-rooms', (req, res) => {
  const user = req.user;
  if (!user) res.redirect('/');

  Room.findAll({where: {createdById: user.id}})
    .then((rooms) => {
      res.render('manage-rooms', {rooms: rooms});
    });
});

router.get('/:id', (req, res) => {
  const user = req.user;
  if (!user) res.redirect('/');
  
  Room.findOne({where: {id: req.params.id}})
    .then((room) => {
      User.findOne({where: {id: room.createdById}})
        .then(roomCreator => {
          UserRoom.findAll({where: {roomId: room.id}})
            .then(userRooms => {
              // console.log(userRooms);

              let participantsIds = userRooms.map(userRoom => {return userRoom.userId});

              // console.log(participantsIds);

              User.findAll({where: {schoolId: roomCreator.schoolId}})
                .then(users => {

                  const participants = users.filter(user => {
                    return participantsIds.indexOf(user.id) >= 0;
                  });

                  File.findAll({where: {roomId: room.id}})
                    .then(files => {
                      res.render('room', {room: room, participants: participants, files: files});
                    });
                });
            });
        });
    });
});

router.get('/list/my', (req, res) => {
  const user = req.user;
  if(!user) res.redirect('/');

  res.render('list-rooms');
});

router.get('/api/get', (req, res) => {
  const user = req.user;
  if (!user) {
    res.send([]);
  } else {
    if(user.type === 'student') {
      UserRoom.findAll({where: {userId: user.id}})
        .then(userRooms => {
          const roomsIds = userRooms.map(userRoom => {return userRoom.roomId});
          Room.findAll({where: {id: {$in: roomsIds}}})
            .then(rooms => res.send(rooms));
        })
    } else if(user.type === 'teacher') {
      Room.findAll({where: {createdById: user.id}})
        .then((rooms) => {
          console.log('rooms size - ', rooms.length);
          res.send(rooms);
        });
    }
  }

});

router.post('/api/add', (req, res) => {
  const user = req.user;
  if (!user) {
    res.send({});
  } else {
    let room = req.body;
    Room.create({
      name: room.name,
      description: room.description,
      createdById: user.id
    }).then(room => res.send(room));
  }
});

router.post('/api/delete', (req, res) => {
  const user = req.user;
  if (!user) {
    res.send({});
  } else {
    let room = req.body;
    // Room.destroyById(room).then(() => res.send(room));
    Room
      .findOne({where: {id: room.id}})
      .then(room => {
        return room.destroy()
          .then((room) => res.send(room))
      });
  }
});

module.exports = router;