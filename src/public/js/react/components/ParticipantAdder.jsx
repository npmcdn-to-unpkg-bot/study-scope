const React = require('react');
const ReactDOM = require('react-dom');
const ReactSelectize = require('react-selectize');
const rest = require('./../helpers/RestHelper');
const SimpleSelect = ReactSelectize.SimpleSelect;

const ParticipantAdder = React.createClass({
  getInitialState: function () {
    return {
      newParticipant: { name: '', id: '' },
      roomId: this.props.roomId
    };
  },
  onSelectParticipant: function (participant) {
    console.log(participant);
    this.setState({newParticipant: participant});
  },
  addParticipant: function () {
    var data = {
      participantId: this.state.newParticipant.value,
      roomId: this.state.roomId
    };
    rest.post('/participants/api', data)
      .then((userRoom) => { window.location = '/rooms/' + userRoom.roomId});
  },
  render: function () {
    return (
      <div>
        <SimpleSelect
          options={this.props.options}
          onValueChange={this.onSelectParticipant}
          placeholder="Select Participant"/>
        <span onClick={this.addParticipant} className="add-participant-icon" data-icon="&#xe050;" />
      </div>
    )
  }
});

module.exports = ParticipantAdder;