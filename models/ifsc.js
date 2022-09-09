const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Bank = sequelize.define('bank',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankState: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankDistrict: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankBranch: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankAddress: {
        type: Sequelize.STRING,
        allowNull:false
      },
      bankPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bankEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bankIFSC: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankMICR: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankPincode: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      bankCode: {
          type: Sequelize.STRING,
          allowNull: false
      },
      bankSWIFT: {
          type: Sequelize.STRING,
          allowNull: false
      }
      
});

module.exports = Bank;