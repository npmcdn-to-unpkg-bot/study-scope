var dispatcher = require('./../dispatcher');

module.exports = {
  add: function (room) {
    dispatcher.dispatch({
      payload: room,
      type: 'room:add'
    })
  },
  delete: function (room) {
    dispatcher.dispatch({
      payload: room,
      type: 'room:delete'
    })
  }
};