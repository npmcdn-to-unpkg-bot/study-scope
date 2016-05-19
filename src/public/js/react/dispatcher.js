const guid = require('guid');

const listeners = {};

module.exports = {
  register: function (cb) {
    let id = guid.raw();
    listeners[id] = cb;
    return id;
  },
  dispatch: function (payload) {
    console.log('Dispatching... ', payload);
    for (let id in listeners) {
      let listener = listeners[id];
      listener(payload);
    }
  }
};