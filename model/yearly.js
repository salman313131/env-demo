const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const YearlyData = sequelize.define('yearly',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true,
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    salary:{
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    spending:{
        type: Sequelize.DOUBLE,
        allowNull: true
    }
});

module.exports = YearlyData