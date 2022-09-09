const express = require('express');

const router = express.Router();

const ifscController = require('../controllers/ifsc');
const {getPost, getAddPost, postAddBlog} = require('../controllers/blog');

router.get('/', ifscController.getIndex);

// router.post('/add-post', postAddBlog);

router.get('/add-post', getAddPost);

router.get('/post/:slug', getPost);

router.get('/:bankName', ifscController.getState);

router.get('/:bankName/:bankState', ifscController.getDistrict);

router.get('/:bankName/:bankState/:bankDistrict', ifscController.getBranch);

router.get('/:bankName/:bankState/:bankDistrict/:bankBranch', ifscController.getIfsc);


module.exports = router;