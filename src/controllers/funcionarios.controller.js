const { getAllFuncionarios, createFuncionario, updateFuncionario, deleteFuncionario, getFuncionarioIdC } = require('../services/funcionarios.service');

async function getFuncionarios(req, res) {
    try {
        const funcionarios = await getAllFuncionarios();
        res.status(200).json(funcionarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getFuncionarioId(req, res) {
    try {
        const { id } = req.params;
        const funcionarioId = await getFuncionarioIdC(id);
        res.status(200).json(funcionarioId);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const result = await createFuncionario(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const result = await updateFuncionario(id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const result = await deleteFuncionario(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { getFuncionarios, create, update, remove, getFuncionarioId };
