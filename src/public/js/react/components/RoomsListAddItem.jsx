const React = require('react');
const action = require('./../actions/RoomActionCreator.jsx');

const RoomsListAddItem  = React.createClass({
  getInitialState: function () {
    return { name: "", description: "" };
  },
  handleInputName: function (e) {
    this.setState({ name: e.target.value});
  },
  onInputDescription: function (e) {
    this.setState({description: e.target.value});
  },
  addRoom: function (e) {
    e.preventDefault();
    action.add({
      name: this.state.name,
      description: this.state.description
    });

    this.setState({
      name: '',
      description: ''
    });
  },
  render: function () {
    return (
      <div className="room-add">
        <form onSubmit={this.addRoom}>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="form-group">
                <div className="col-lg-10">
                  <label htmlFor="name">Name</label>
                  <input name="name"
                         value={this.state.name}
                         onChange={this.handleInputName}
                         type="text"
                         placeholder="Enter Name"
                         className="form-control inp-room-name"/>
                </div>
                <div className="col-lg-2">
                  <button type="submit" className="btn btn-default btn-primary btn-create-room">Create</button>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description"
                          value={this.state.description}
                          id="description" cols="30" rows="1"
                          className="form-control"
                          onChange={this.onInputDescription}/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = RoomsListAddItem;