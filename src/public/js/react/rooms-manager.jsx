const React = require('react');
const ReactDOM = require('react-dom');
const RoomsList = require('./components/RoomsList.jsx');
const RoomListAddItem = require('./components/RoomsListAddItem.jsx');
const action = require('./actions/RoomActionCreator.jsx');

const roomStore = require('./stores/RoomStore.jsx');
let initialRooms = roomStore.getRooms();

const RoomsManager = React.createClass({
  onDeleteRoom: function (room) {
    action.delete(room);
  },
  render: function () {
    return (
      <div>
        <RoomListAddItem />
        <RoomsList rooms={initialRooms} onDeleteRoom={this.onDeleteRoom}/>
      </div>
    )
  }
});

function render() {
  ReactDOM.render(
    <RoomsManager />,
    app
  );
}

roomStore.onChange(function (rooms) {
  initialRooms = rooms;
  render();
});

render();
