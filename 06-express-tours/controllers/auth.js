
const UserDAO = require('./../DAO/UserDAO')
const StaticData = require("../utils/StaticData");

exports.signup = async (req, res) => {
    try{
        const form = req.body;
        if (form.password !== form.repeatPassword){
            return res
                .status(403)            // 403 - Forbidden
                .json({
                    code: 403,
                    msg: `Invalid password`
                });
        }
        //TODO - check if username/email existed
        await UserDAO.addUser({
            userName: form.userName,
            name: form.name,
            email: form.email,
            role: StaticData.AUTH.Role.user,
            active: true,
            password: form.password
        });
        const user = await UserDAO.getUserByUserName(form.userName);
        delete user.password;
        delete user.passwordAt;
        res
            .status(200)
            .json({
                code: 200,
                msg: 'success',
                data: {user}
            });
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e.toString()
            });
    }
}