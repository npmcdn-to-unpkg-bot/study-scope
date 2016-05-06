import Sequelize from 'sequelize';

import dotenv from 'dotenv';
dotenv.load();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  schoolId: {
    type: Sequelize.INTEGER,
    field: 'school_id'
  }
}, {
  freezeTableName: true
});

User.findByUsername = function(username, callback) {
  User.find({
    where: { username : username }
  }).then((user) => callback(user, null));
};

User.comparePassword = function (candidatePassword, password, callback) {
  callback(null, candidatePassword == password);
};

User.sync();

module.exports = User;