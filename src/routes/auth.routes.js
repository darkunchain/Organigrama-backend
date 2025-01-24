const express = require('express');
const { register, login, updatePermission, getUsuarios, removeUser } = require('../controllers/auth.controller');
const router = express.Router();

router.get('/', getUsuarios);
router.post('/register', register);
router.post('/login', login);
router.put('/:userId', updatePermission);
router.delete('/:userId', removeUser);

module.exports = router;