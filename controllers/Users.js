const UserModel = require('../models/Users'),
bcrypt = require('bcrypt'),
config = require('../config/AppMessages');

const User = (Connection, MailSender) => {
    let password = '';

    function genUserPassword(){
        if(!password){
            for(let i=0; i<6; i++)
            password+=(Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();
        }
    }

    async function hashUserPassword(){
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }

    async function createUser(req, res){
        try{
            
            await Connection.openConnection();
            if((await queryUsers({email: req.body.email})).length > 0)
                return res.status(403).render('userRegistration', {message: config.USER_ALREADY_EXISTS_ERROR, error: true});

            genUserPassword();
            const hashedPass = await hashUserPassword();
            const userRegistry = new UserModel({
                name: req.body.name, 
                email: req.body.email, 
                password: hashedPass
            });

            await userRegistry.save();
            await Connection.closeConnection();
            res.status(200).render('userRegistration', {message: config.USER_CREATED_SUCCESS_MESSAGE});

        } catch(err){
            res.status(500).render('userRegistration', {message: err, error: true});
        }

    }

    async function deleteUser(req, res){
        try{
            await Connection.openConnection();
            if(req.body._method && req.body._method === 'delete'){
                await UserModel.updateOne({_id: req.body.id}, {active: false});
                const userRows = await queryUsers({active: true});
                await Connection.closeConnection();
                return res.status(200).render('userList',{users: userRows});
            }
     
        } catch(err){
            console.log(err);
            return res.status(500).send(err);
        }

    }

    async function queryUsers(condition = {}){
        try{
            return await UserModel.find(condition).exec();
        } catch(err){
            throw new Error(err);
        }
        
    }

    async function listUsers(req, res){
        try{
            await Connection.openConnection();
            const usersRows = await queryUsers({active: true});
            await Connection.closeConnection();
            return res.status(200).render('userList',{users: usersRows});

        } catch(err){
            return res.status(500).render('userList',{message: err, error:true});
        }

    }

    async function getUser(req, res){
        try{
            await Connection.openConnection();
            const userRow = await queryUsers({_id: req.params.id, active: true});
            await Connection.closeConnection();
            return res.status(200).render('userEdit',{user: userRow[0]});

        } catch(err){
            return res.status(500).render('userEdit',{message: err, error:true});
        }
    }

    async function updateUser(req, res){
        try{
            await Connection.openConnection();

            const userRow = await queryUsers({_id: req.params.id, active: true});

            if(!req.body.name || !req.body.email)
                return res.status(400).render(
                    'userEdit', 
                    {user: userRow[0], message: config.EMPTY_FIELD_ERROR, error: true}
                );

            if((await queryUsers({email: req.body.email})).length > 0)
                return res.status(403).render(
                    'userEdit', 
                    {user: userRow[0], message: config.USER_ALREADY_EXISTS_ERROR, error: true}
                ); 
                
            await UserModel.findOneAndUpdate(
                { _id: req.params.id, active: true }, 
                { name: req.body.name, email: req.body.email }
            );

            await Connection.closeConnection();
            return res.status(200).render('userEdit',{user: userRow[0], message: config.USER_CHANGED_SUCESS_MESSAGE});

        } catch(err){
            return res.status(500).render('userEdit',{message: err, error:true});
        }
    }

    return {createUser, listUsers, deleteUser, getUser, updateUser};
}

module.exports = User;