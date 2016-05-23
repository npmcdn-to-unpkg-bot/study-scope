const React = require('react');
const action = require('./../actions/RoomActionCreator.jsx');

const Room = React.createClass({
  openRoom: function () {
    window.location = '/rooms/' + this.props.room.id;
  },
  delete: function (e) {
    e.stopPropagation();
    this.props.onDeleteRoom(this.props.room);
  },
  render: function() {
    const room = this.props.room;
    return (
      <div className="panel panel-info">
        <div className="panel-heading" onClick={this.openRoom} >
          {room.name}
          <span onClick={this.delete} className="panel-heading-icon" data-icon="&#xe051;" />
        </div>
        <div className="panel-body">
          {room.description}
        </div>
      </div>
    )
  }
});

module.exports = Room;