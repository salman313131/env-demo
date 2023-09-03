const express = require('express')
const app = express()
const router = require('./routes/daily')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/v1/expense',router)

sequelize.sync().then(res=>{
    app.listen(8000)
}).catch(err=>console.log(err))