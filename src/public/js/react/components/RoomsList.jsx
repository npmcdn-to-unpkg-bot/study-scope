const React = require('react');
const Room = require('./Room.jsx');
const RoomListAddItem = require('./RoomsListAddItem.jsx');

const RoomsList = React.createClass({
  render: function() {
    const rooms = this.props.rooms;
    return (
      <div>
        {
          rooms.map(room => {
            return (
              <Room room={room} key={room.id} onDeleteRoom={this.props.onDeleteRoom}/>
            )
          })
        }
      </div>
    )
  }
});

module.exports = RoomsList;