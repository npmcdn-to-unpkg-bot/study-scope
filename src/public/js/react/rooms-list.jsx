const React = require('react');
const ReactDOM = require('react-dom');
const RoomsList = require('./components/RoomsList.jsx');
const rest = require('./helpers/RestHelper');

const roomStore = require('./stores/RoomStore.jsx');
let initialRooms = roomStore.getRooms();

const Rooms = React.createClass({
  onDeleteRoom: function (room) {
    let selt = this;
    rest.delete('/participants/api', { roomId: room.id })
      .then(() => {
        // TODO: Rerender groups!
        window.location = '/rooms/list/my';
      });
  },
  render: function () {
    return (
      <RoomsList rooms={initialRooms} onDeleteRoom={this.onDeleteRoom}/>
    )
  }
});

function render() {
  ReactDOM.render(
    <Rooms />,
    app
  );
}

roomStore.onChange(function (rooms) {
  initialRooms = rooms;
  render();
});

render();
