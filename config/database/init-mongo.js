db.createUser({
    user: "alurachallange",
    pwd: "135790",
    roles:[
        {
            role: "readWrite",
            db: "alura-challange-db"
        }
    ] 
});

db = new Mongo().getDB("alura-challange-db");

db.createCollection('Users', { capped: false });
//db.createCollection('test', { capped: false });

db.users.insert([
    { 
        name: "Admin",
        email: "admin@email.com.br",
        password: "$2a$10$V2W0kc7J0YD8DP/4K1WLSeFnvqrZlQ0yrq4HIs7D3..8uxkxD/q/y",
        active: true
    },

]);
