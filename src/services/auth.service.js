const bcrypt = require('bcrypt');
const { readJSON, writeJSON } = require('../utils/fileManager');
const USERS_FILE = 'usuarios.json';


async function getAllUsuarios() {
    return await readJSON(USERS_FILE);
}
async function registerUser(usuario, password, email) {
    // Verifica que usuario y password no sean undefined o null
    if (!usuario || !password) {
        throw new Error('El usuario y la contraseña son obligatorios');
    }
    const users = await readJSON(USERS_FILE);
    // Verifica si el usuario ya existe (comparando con bcrypt)
    let userExists = false;
    for (const u of users) {
        if (await bcrypt.compare(usuario, u.usuario)) {
            userExists = true;
            break;
        }
    }
    console.log('userExists: ' + userExists)
    if (userExists) {
        throw new Error('El usuario ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedUser = await bcrypt.hash(usuario, 10);

    const newUser = {
        id: Date.now().toString(),
        usuario: hashedUser,
        password: hashedPassword,
        email,
        permitido: false,
        admin: false,
    };

    users.push(newUser);
    await writeJSON(USERS_FILE, users);
    return { message: 'Usuario registrado correctamente', id: newUser.id };
}

async function loginUser(usuario, password) {
    const users = await readJSON(USERS_FILE);
    let user = null;

    // Buscar el usuario usando bcrypt.compare
    for (const u of users) {
        const isMatch = await bcrypt.compare(usuario, u.usuario);
        console.log('isMatch: ',isMatch);
        if (isMatch) {
            user = u;
            console.log('u: ',u);
            break;
        }
        console.log('user: ',user)
    }
    //const user = await users.find(async (u) => await bcrypt.compare(usuario, u.usuario));


    if (!user) throw new Error('Usuario no encontrado');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Contraseña incorrecta');
    if (!user.permitido) throw new Error('No tiene permisos para iniciar sesión');


    return { message: 'Login exitoso', usuario: user.usuario, admin: user.admin };
}

async function updateUserPermission(userId, permitido, admin) {
    const users = await readJSON(USERS_FILE);
    const user = users.find((u) => u.id === userId);

    if (!user) throw new Error('Usuario no encontrado');
    user.permitido = permitido;
    user.admin = admin !== undefined ? admin : user.admin;

    await writeJSON(USERS_FILE, users);
    return { message: 'Usuario actualizado correctamente' };
}

async function deleteUsuario(id) {
    console.log('id: ' + id);
    let usuarios = await readJSON(USERS_FILE);
    usuarios = usuarios.filter((f) => f.id !== id);
    await writeJSON(USERS_FILE, usuarios);
    return { message: 'Funcionario eliminado correctamente' };
}

module.exports = { registerUser, loginUser, updateUserPermission, getAllUsuarios, deleteUsuario };