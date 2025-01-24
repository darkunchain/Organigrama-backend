const { readJSON, writeJSON } = require('../utils/fileManager');
const FUNCIONARIOS_FILE = 'funcionarios.json';

async function getAllFuncionarios() {
    return await readJSON(FUNCIONARIOS_FILE);
}

async function createFuncionario(funcionario) {
    const funcionarios = await readJSON(FUNCIONARIOS_FILE);
    funcionario.id = Date.now().toString();
    funcionario.activo = true;
    funcionarios.push(funcionario);
    await writeJSON(FUNCIONARIOS_FILE, funcionarios);
    return { message: 'Funcionario agregado correctamente', id: funcionario.id };
}

async function updateFuncionario(id, updates) {
    const funcionarios = await readJSON(FUNCIONARIOS_FILE);
    const funcionario = funcionarios.find((f) => f.id === id);

    if (!funcionario) throw new Error('Funcionario no encontrado');
    Object.assign(funcionario, updates);
    await writeJSON(FUNCIONARIOS_FILE, funcionarios);
    return { message: 'Funcionario actualizado correctamente' };
}

async function deleteFuncionario(id) {
    let funcionarios = await readJSON(FUNCIONARIOS_FILE);
    funcionarios = funcionarios.filter((f) => f.id !== id);
    await writeJSON(FUNCIONARIOS_FILE, funcionarios);
    return { message: 'Funcionario eliminado correctamente' };
}

module.exports = { getAllFuncionarios, createFuncionario, updateFuncionario, deleteFuncionario };