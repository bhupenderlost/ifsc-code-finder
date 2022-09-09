const Sequelize = require('sequelize');

const sequelize = new Sequelize('root', 'ifsc', 'minto123@singh',{
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;