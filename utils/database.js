const Sequelize = require('sequelize');

const sequelize = new Sequelize('youruser', 'yourdb', 'yourpass',{
    dialect: 'mysql',
    host: 'yourhost'
});


module.exports = sequelize;