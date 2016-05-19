const React = require('react');
const ReactDOM = require('react-dom');
const RoomsList = require('./components/RoomsList.jsx');

const roomStore = require('./stores/RoomStore.jsx');
let initialRooms = roomStore.getRooms();

function render() {
  ReactDOM.render(<RoomsList rooms={initialRooms}/>, app);
}

roomStore.onChange(function (rooms) {
  initialRooms = rooms;
  render();
});

render();
