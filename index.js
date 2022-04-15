const app = require('express')(),
routes = require('./routes/index');
port = 3000;

app.set('view engine', 'ejs');

routes(app);

app.listen(port, console.log(`Aplicação rodando na porta ${port}`));