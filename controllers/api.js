//MODEL IMPORT
const Bank = require('../models/ifsc');
//DATABASE IMPORT
const sequelize = require('../utils/database');


exports.getBanks = (req, res, next) => {
    Bank.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankName')), 'bankName']]
      })
        .then(bank => {
            const jsondata = JSON.parse(JSON.stringify(bank));
            res.header("Access-Control-Allow-Origin", "*");
            res.json(jsondata);
        })
        .catch(err => console.log(err));
};

exports.getStates = (req, res, next) => {
    let bank = req.params.bankName;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    Bank.findAll({ where: { bankName: bankName },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankState')), 'bankState']]
      })
       .then(state => {
            const jsondata = JSON.parse(JSON.stringify(state));
            res.header("Access-Control-Allow-Origin", "*");
            res.json(jsondata);
            
       })
      .catch(err => console.log(err));
};

exports.getDistricts = (req, res, next) => {
    let bank = req.params.bankName;
    let state = req.params.bankState;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    let stateName = state.replace(/-/g, " ").toUpperCase();

    Bank.findAll({ where: { bankName: bankName, bankState: stateName },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankDistrict')), 'bankDistrict']]
      })
       .then(district => {
            const jsondata = JSON.parse(JSON.stringify(district));
            res.header("Access-Control-Allow-Origin", "*");
            res.json(jsondata);
       })
      .catch(err => console.log(err));
};

exports.getBranches = (req, res, next) => {
    let bank = req.params.bankName;
    let state = req.params.bankState;
    let district = req.params.bankDistrict;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    let stateName = state.replace(/-/g, " ").toUpperCase();
    let districtName = district.replace(/-/g, " ").toUpperCase();

    Bank.findAll({ where: { bankName: bankName, bankState: stateName, bankDistrict: districtName },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankBranch')), 'bankBranch']]
      })
       .then(branch => {
            console.log('Data Sent')
            const jsondata = JSON.parse(JSON.stringify(branch));
            res.header("Access-Control-Allow-Origin", "*");
            res.json(jsondata);
       })
      .catch(err => console.log(err));
};

exports.getIFSC = (req, res, next) => {
    let bank = req.params.bankName;
    let state = req.params.bankState;
    let district = req.params.bankDistrict;
    let branch = req.params.bankBranch;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    let stateName = state.replace(/-/g, " ").toUpperCase();
    let districtName = district.replace(/-/g, " ").toUpperCase();
    let branchName = branch.replace(/-/g, " ").toUpperCase();


    Bank.findAll({ where: { bankName: bankName, bankState: stateName, bankDistrict: districtName, bankBranch: branchName }})
       .then(ifsc => {
            const jsondata = JSON.parse(JSON.stringify(ifsc));
            res.header("Access-Control-Allow-Origin", "*");
            res.json(jsondata);
       })
      .catch(err => console.log(err));
};

exports.searchIFSC = (req, res) => {
    let bank = req.body.ifsc;
    
    Bank.findOne({where: {bankIFSC: bank}})
        .then(ifsc => {
            const jsondata = JSON.parse(JSON.stringify(ifsc));
            res.header("Access-Control-Allow-Origin",'*');
            res.json(jsondata);
        })
};