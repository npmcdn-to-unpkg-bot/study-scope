import express from 'express';
import Room from './../models/room';
const router = express.Router();

router.get('/manage-rooms', (req, res) => {
  const user = req.user;
  if(!user) res.redirect('/');
  
  Room.findAll({ where: { createdById: user.id }})
    .then((rooms) => {
      res.render('manage-rooms', { rooms: rooms });
    });
});

router.get('/api/get', (req, res) => {
  const user = req.user;
  if(!user) {
    res.send([]);
  } else {
    Room.findAll({ where: { createdById: user.id }})
      .then((rooms) => {
        console.log('rooms size - ', rooms.length);
        res.send(rooms);
      });
  }

});

router.post('/api/add', (req, res) => {
  const user = req.user;
  if(!user) {
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
  if(!user) {
    res.send({});
  } else {
    let room = req.body;
    // Room.destroyById(room).then(() => res.send(room));
    Room
      .findOne({where:{id:room.id}})
      .then(room => { return room.destroy()
        .then((room) => res.send(room))
      });
  }
});

module.exports = router;