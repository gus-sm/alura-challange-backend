db.createUser({
    user: "alurachallange",
    pwd: "135790",
    roles:[
        {
            role: "readWrite",
            db: "Transactions"
        }
    ] 
})