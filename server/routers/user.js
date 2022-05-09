const express = require('express')
const userController = require('../controllers/userController')


const router = express.Router()


//Routers
router.get('/',userController.view)
router.get('/add_user', userController.form)
router.get('/edit_user/:id', userController.editPage)
router.post('/', userController.find)
router.post('/add_user', userController.create)
router.post('/edit_user/:id', userController.editUsers)
router.get('/:id', userController.delete)




module.exports = router
