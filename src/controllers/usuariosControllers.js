const path = require('path');

const controlador = {
    register: (req,res) => {
        res.sendFile(path.resolve(__dirname, '../views/register/register.html'))
    }
}

module.exports = controlador