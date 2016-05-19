const dispatcher = require('./../dispatcher');
const rest = require('./../helpers/RestHelper');

function RoomStore() {
  var rooms = [];

  rest.get('/rooms/api/get')
    .then(data => {
      rooms = data;
      triggerListeners();
    });
  
  const listeners = [];

  function getRooms() {
    return rooms;
  }
  
  function addRoom(room) {
    rest.post('/rooms/api/add', room)
      .then(room => {
        rooms.push(room);
        console.log('Successfully added room: ' + room.name);
        triggerListeners();
      });
  }

  function deleteRoom(room) {
    rest.post('/rooms/api/delete', room)
      .then(room => {
        console.log('Successfully deleted room: ' + room.name);
      });

    let index;
    rooms.map(function (_room, _index) {
      if(room.id == _room.id) {
        index = _index;
      }
    });

    rooms.splice(index, 1);
    triggerListeners();
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function triggerListeners() {
    listeners.forEach(listener => listener(rooms));
  }

  dispatcher.register(function (event) {
    const split = event.type.split(':');
    if(split[0] === 'room') {
      switch(split[1]) {
        case 'add':
          addRoom(event.payload);
          break;
        case 'delete':
          deleteRoom(event.payload);
          break;
      }
    }
  });
  
  return {
    getRooms: getRooms,
    onChange: onChange
  };
}

module.exports = new RoomStore();