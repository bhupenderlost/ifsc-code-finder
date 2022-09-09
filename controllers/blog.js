//MODEL IMPORT
const Blog = require('../models/blog');
const Bank = require('../models/ifsc');

//DATABASE IMPORT
const sequelize = require('../utils/database');

exports.getPost = (req, res, next) => {
    let banks;
    Bank.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('bankName')), 'bankName']]
        })
        .then(bank => {
            banks = bank;
        })
        .catch(err => console.log(err));
    
    const pId = req.params.slug;
    let pageTitle;
    let pageDes;
    let pageKeywords;
    let pageImage;
    
    Blog.findAll({where:{slug: pId, status: 'published'}})
        .then(blogs => {
            if(blogs.length !== 0){
                for (let blog of blogs) {
                    pageTitle = blog.title;
                    pageDes = blog.description;
                    pageKeywords = blog.keywords;
                    pageImage = blog.fimage;
                    pageContent = blog.content;
                }
                res.render('blog',{
                    
                    pageTitle: pageTitle,
                    pageDes: pageDes,
                    pageKeywords: pageKeywords,
                    pageImage: pageImage,
                    pageContent: pageContent,
                    banks: banks,
                    url: '/post/'+pId
    
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
exports.postAddBlog = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const content = req.body.content;
    const description = req.body.description;
    const keywords = req.body.keywords;
    const slug = req.body.slug;

   
      Blog.create({
        title: title,
        fimage: imageUrl,
        description: description,
        keywords: keywords,
        slug: slug,
        status: 'published',
        content: content
      })
      .then(result => {
        res.redirect('/');
      })
      .catch(err => console.log(err));
};
exports.getAddPost = (req, res, next) =>{
    res.render('add');
}