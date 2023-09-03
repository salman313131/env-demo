const express = require('express')
const router = express.Router()
const dailyController = require('../controllers/daily')

router.post('/add',dailyController.addContent)
router.get('/',dailyController.getContent)

module.exports = router