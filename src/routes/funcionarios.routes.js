const express = require('express');
const { getFuncionarios, create, update, remove } = require('../controllers/funcionarios.controller');
const router = express.Router();

router.get('/', getFuncionarios);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
