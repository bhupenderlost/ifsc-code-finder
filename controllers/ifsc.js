//MODEL IMPORT
const Bank = require('../models/ifsc');
//DATABASE IMPORT
const sequelize = require('../utils/database');


//FIND ALL THE BANKS
exports.getIndex = (req, res, next) => {
    Bank.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankName')), 'bankName']]
      })
        .then(bank => {
            if(bank.length !== 0){
                res.setHeader('Cache-Control', 'public, max-age=86400');
                res.render('index',{
                    pageTitle: "Find IFSC Codes, MICR Codes, Address, Contact Details Of All Banks In India",
                    banks: bank,
                    pageDes: "Find IFSC Codes, MICR Codes, Address, Contact Details Of All Banks In India For NEFT, RTGS, ECS.",
                    pageKeywords: "find ifsc codes, find micr codes, bank of baroda ifsc code, ifsc codes sbi, indian bank ifsc code, ifsc full form,",
                    url: "/",
                    pageImage: '/img/social-share.jpg'
                });  
                
            }else{
            
                res.render('404', {
                    
                    pageTitle: "404 - Page Not Found",
                    pageDes: "404 Page Not Found",
                    pageKeywords: "find ifsc codes, find micr codes, find branch details of banks, bank of baroda ifsc code,",
                    url: "/",
                    pageImage: '/img/social-share.jpg'
                });
            }
            
            
          
        })
        .catch(err => console.log(err));
}

//FIND THE STATES
exports.getState = (req, res, next) => {
    let bank = req.params.bankName;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    Bank.findAll({ where: { bankName: bankName },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankState')), 'bankState']]
      })
       .then(result => {
           
           if(result.length !== 0){
                res.setHeader('Cache-Control', 'public, max-age=86400');
                res.render('state.ejs', {
                  pageTitle: bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes, MICR Codes & All Branch Details In India - IFSC Codes Finder",
                  bank: bankName,
                  states: result,
                  url: '/'+bank,
                  burl:bank,
                  pageImage: '/img/social-share.jpg',
                  pageDes: bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes Available. IFSC Codes are essential for transfering money accross banks in India. So, here we got IFSC Code For "+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') ,
                  pageKeywords: bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" ifsc code, ifsc code of "+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+", ifsc code "+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","

                });
           }else{
                res.render('404', {
                    pageTitle: "404 - Page Not Found",
                    pageDes: "404 Page Not Found",
                    pageKeywords: "find ifsc codes, find micr codes, find branch details of banks, bank of baroda ifsc code,",
                    url: "/",
                    pageImage: '/img/social-share.jpg'
                });
           }
          
            
       })
      .catch(err => console.log(err));
}

//FIND THE DISTRICTS
exports.getDistrict = (req, res, next) => {
    let bank = req.params.bankName;
    let state = req.params.bankState;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    let stateName = state.replace(/-/g, " ").toUpperCase();
    Bank.findAll({ where: { bankName: bankName, bankState: stateName },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankDistrict')), 'bankDistrict']]
      })
       .then(result => {
           if(result.length !== 0){
                res.setHeader('Cache-Control', 'public, max-age=86400');
                res.render('district.ejs', {
                  pageTitle: stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes, MICR Codes & All Branch Details In India - IFSC Codes Finder",
                  bank: bankName,
                  state: stateName,
                  districts: result,
                  url: '/'+bank+'/'+state,
                  burl:bank,
                  pageImage: '/img/social-share.jpg',
                  surl: state,
                 pageDes: bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes Available. IFSC Codes are essential for transfering money accross banks in India. So, here we got IFSC Code For "+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName ,
                  pageKeywords:  stateName+" "+bankName+" ifsc code, ifsc code of "+bankName+" "+stateName+" , ifsc code "+stateName+" "+bankName+","
           });
           }else{
                res.render('404', {
                    pageTitle: "404 - Page Not Found",
                    pageDes: "404 Page Not Found",
                    pageKeywords: "find ifsc codes, find micr codes, find branch details of banks, bank of baroda ifsc code,",
                    url: "/",
                    pageImage: '/img/social-share.jpg'
                });
           }
           
       })
      .catch(err => console.log(err));
}

//FIND THE BRANCHES
exports.getBranch = (req, res, next) => {
    let bank = req.params.bankName;
    let state = req.params.bankState;
    let district = req.params.bankDistrict;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    let stateName = state.replace(/-/g, " ").toUpperCase();
    let districtName = district.replace(/-/g, " ").toUpperCase();

    Bank.findAll({ where: { bankName: bankName, bankState: stateName, bankDistrict: districtName },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankBranch')), 'bankBranch']]
      })
       .then(result => {
           if(result.length !== 0){
                res.setHeader('Cache-Control', 'public, max-age=86400');
               res.render('branch.ejs', {
                  pageTitle: districtName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes, MICR Codes & All Branch Details In India - IFSC Codes Finder",
                  bank: bankName,
                  state: stateName,
                  district: districtName,
                  branches: result,
                  url: '/'+bank+'/'+state+'/'+district,
                  burl:bank,
                  pageImage: '/img/social-share.jpg',
                  surl: state,
                  durl: district,
                  pageDes:  districtName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes Available. IFSC Codes are essential for transfering money accross banks in India. So, here we got IFSC Code For "+districtName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') ,
                  pageKeywords: districtName+" "+stateName+" "+bankName+" ifsc code, ifsc code of "+bankName+" "+districtName+" "+stateName+", ifsc code "+bankName+" "+districtName+" "+stateName
                });
           }else{
               
                res.render('404', {
                    pageTitle: "404 - Page Not Found",
                    pageDes: "404 Page Not Found",
                    pageKeywords: "find ifsc codes, find micr codes, find branch details of banks, bank of baroda ifsc code,",
                    url: "/",
                    pageImage: '/img/social-share.jpg'
                });
           }
            
       })
      .catch(err => console.log(err));
}

//FINDS IFSC ALL ON ABOVE INFORMATION
exports.getIfsc = (req, res, next) => {
    let bank = req.params.bankName;
    let state = req.params.bankState;
    let district = req.params.bankDistrict;
    let branch = req.params.bankBranch;
    let bankName = bank.replace(/-/g, " ").toUpperCase();
    let stateName = state.replace(/-/g, " ").toUpperCase();
    let districtName = district.replace(/-/g, " ").toUpperCase();
    let branchName = branch.replace(/-/g, " ").toUpperCase();


    Bank.findAll({ where: { bankName: bankName, bankState: stateName, bankDistrict: districtName, bankBranch: branchName}})
       .then(result => {
           
           if(result.length !== 0){
                res.setHeader('Cache-Control', 'public, max-age=86400');
                res.render('result.ejs', {
                  pageTitle: branchName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+districtName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes, MICR Codes & All Branch Details In India",
                  bank: bankName,
                  state: stateName,
                  district: districtName,
                  branch: branchName,
                  results: result,
                  url: '/'+bank+'/'+state+'/'+district+'/'+branch,
                  burl:bank,
                  surl: state,
                  durl: district,
                  bburl: branch,
                  pageImage: '',
                  pageDes: branchName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+districtName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+" IFSC Codes Available. IFSC Codes are essential for transfering money accross banks in India. So, here we got IFSC Code For "+branchName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+districtName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+stateName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')+","+bankName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') ,
                  pageKeywords: branchName+" "+districtName+" "+stateName+" "+bankName+" ifsc code, ifsc code of "+bankName+" "+branchName+" "+districtName+" "+stateName+", ifsc code "+bankName+" "+branchName+" "+districtName+" "+stateName
           });
           }else{
                res.render('404', {
                    pageTitle: "404 - Page Not Found",
                    pageDes: "404 Page Not Found",
                    pageKeywords: "find ifsc codes, find micr codes, find branch details of banks, bank of baroda ifsc code,",
                    url: "/",
                    pageImage: '/img/social-share.jpg'
                });
           }
           
       })
      .catch(err => console.log(err));
}

exports.getSitemap = (req, res) => {
    Bank.findAll()
        .then(bank => {
            res.render('sitemap', {
                banks: bank
            });
        })
        .catch(err => console.log(err));
};