const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController')
const checkDocId = require('../middleware/validateObjectId');

router.post('/', memberController.createMember);

router.get('/', memberController.getMembers);

router.get('/:id', checkDocId, memberController.getMemberById);

router.put('/:id', checkDocId, memberController.updateMember);

router.delete('/:id', checkDocId, memberController.deleteMember);

module.exports = router;