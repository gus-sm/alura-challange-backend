const mongoose = require('mongoose');


const Connection = () => {
    const db = mongoose.connection;

    db.once('open', function () {
      console.log("db connected!");
    });
    db.once('close', function(){
        console.log("db closed!");
    })
    
    async function openConnection(){

        try {
            await mongoose.connect('mongodb://alurachallange:135790@localhost:27017/alura-challange-db');
        
        } catch (err){
            throw new Error(err);
        }
    }


    async function closeConnection(){
        try{
            await db.close();
            
        } catch(err){
            throw new Error(err);
        }
    }

    function getDbConn(){
        return db;
    }
    
    return {openConnection, closeConnection, getDbConn};
}

module.exports = { Connection };