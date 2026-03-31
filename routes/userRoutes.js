const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkDocId = require('../middleware/validateObjectId');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', checkDocId, userController.getUserById);
router.put('/:id', checkDocId, userController.updateUser);
router.delete('/:id', checkDocId, userController.deleteUser);

module.exports = router;