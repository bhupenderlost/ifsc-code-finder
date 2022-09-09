const express = require('express');

const router = express.Router();

const apiController = require('../controllers/api');

router.get('/', apiController.getBanks);

router.post('/ifsc', apiController.searchIFSC);

router.get('/:bankName/', apiController.getStates);

router.get('/:bankName/:bankState/', apiController.getDistricts);

router.get('/:bankName/:bankState/:bankDistrict/', apiController.getBranches);

router.get('/:bankName/:bankState/:bankDistrict/:bankBranch/', apiController.getIFSC);

module.exports = router;