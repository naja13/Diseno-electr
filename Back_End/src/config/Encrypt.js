const bcrypt = require('bcryptjs');

module.exports.matchPassword =   async function (password, passwordEncrypt){
    return await bcrypt.compare(password, passwordEncrypt);
};

module.exports.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};