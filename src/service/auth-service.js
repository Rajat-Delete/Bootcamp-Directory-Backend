const User = require('../models/User');

async function registerUser(request){
    try {
        const {name, email, password , role} = request.body;
        const user = await User.create({
            name,
            email,
            password,
            role,
        });
        console.log('user from the db is ', user);
        user.password = undefined;
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
}

