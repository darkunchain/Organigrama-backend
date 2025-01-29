const express = require('express');
const { getFuncionarios, create, update, remove, getFuncionarioId } = require('../controllers/funcionarios.controller');
const router = express.Router();

router.get('/', getFuncionarios);
router.get('/:id', getFuncionarioId);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
