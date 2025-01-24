const { registerUser, loginUser, updateUserPermission, getAllUsuarios, deleteUsuario } = require('../services/auth.service');


async function getUsuarios(req, res) {
    try {
        const funcionarios = await getAllUsuarios();
        res.status(200).json(funcionarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function register(req, res) {
    try {
        const { usuario, password, email } = req.body;
        const result = await registerUser(usuario, password, email);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { usuario, password } = req.body;
        const result = await loginUser(usuario, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function updatePermission(req, res) {
    console.log('request.body: ' + req.body.userId, 'req.params: ' + req.params.userId)
    try {
        const { userId } = req.params;
        const { permitido, admin } = req.body;
        console.log('userId: ', userId, 'permitido: ', permitido, 'admin:', admin);
        const result = await updateUserPermission(userId, permitido, admin);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function removeUser(req, res) {
    console.log('request.params.id: ', req.params.userId, 'req.body.id: ',req.body.userId);
    try {
        const { userId } = req.params;
        const result = await deleteUsuario(userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { getUsuarios, register, login, updatePermission, removeUser };