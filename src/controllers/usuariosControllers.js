const path = require('path');

const controlador = {
    register: (req,res) => {
        res.sendFile(path.resolve(__dirname, '../views/register/register.html'))
    },
    login: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/login/login.html'))
    }
    
}

module.exports = controlador