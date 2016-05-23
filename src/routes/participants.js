import express from 'express';
import UserRoom from './../models/user-room';
import User from './../models/user';
const router = express.Router();

router.post('/api', (req, res) => {
  const user = req.user;
  if(!user) res.send(401, '401 Unauthorized');

  const participantId = req.body.participantId;
  const roomId = req.body.roomId;

  UserRoom.create({ userId: participantId, roomId: roomId })
    .then((userRoom) => res.send(userRoom));
});

router.delete('/api', (req, res) => {
  const user = req.user;
  if(!user) res.send(401, '401 Unauthorized');

  UserRoom.destroy({where: {roomId: req.body.roomId, userId: user.id}})
    .then(() => res.status(200).send('Successfully deleted'));
});

router.get('/api/room/:id', (req, res) => {
  const user = req.user;
  if(!user) res.send(401, '401 Unauthorized');
  
  const roomId = req.params.id;

  UserRoom.findAll({where: {roomId: roomId}})
    .then(userRooms => {

      let participantsIds = userRooms.map(userRoom => {return userRoom.userId});
      console.log(participantsIds);

      User.findAll({where: {schoolId: user.schoolId, type: 'student'}})
        .then(users => {
          
          console.log('found users in the school - ', users.length);
          
          const candidates = users.filter(user => {
            return participantsIds.indexOf(user.id) < 0;
          });
          
          console.log('found candidates in the school - ' + candidates.length);
          
          
          res.send(candidates);
        });
    });
});



module.exports = router;