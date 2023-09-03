const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const MonthlyData = sequelize.define('monthly',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true,
    },
    month:{
        type: Sequelize.INTEGER,
        allowNull: false
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

module.exports = MonthlyData