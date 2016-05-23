const React = require('react');
const ReactDOM = require('react-dom');
const ParticipantAdder = require('./components/ParticipantAdder.jsx');
const rest = require('./helpers/RestHelper');

const roomId = window.location.pathname.split('/')[2];

rest.get('/participants/api/room/' + roomId)
  .then(candidates => render(candidates));

function render(candidates) {
  const candidatesOptions = candidates.map(candidate => {
    return { label: candidate.name, value: candidate.id };
  });

  ReactDOM.render(
    <ParticipantAdder options={candidatesOptions} roomId={roomId}/>,
    participantAdder
  );
}
