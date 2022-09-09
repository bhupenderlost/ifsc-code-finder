const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    keywords: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull:false
    },
    fimage: {
        type: Sequelize.STRING,
        allowNull: false
    }


});
module.exports = Blog;