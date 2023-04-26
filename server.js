const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

// LOGIN SENHA
let users = [{login:'guilherme587', password: "123"}];

// CONFIG 
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:'aimainhaia'}));
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROTAS
app.post('/login', (req, res)=>{
    let flag = false;

    for(let i = 0; i < users.length; i++){
        if(req.body.password == users[i].password && req.body.login == users[i].login){
            req.session.login = users[i].login;
            // PRINT
            console.log(users[i]);
            res.redirect('/login/user');
            flag = false;
            break;
        } else{
            flag = true;
        }
    }
    if(flag){
        res.redirect('/');
    }
});

app.post('/cadastro', (req, res)=>{
    if(req.body.newPassword != '' && req.body.newLogin != ''){
        for(let i = 0; i < users.length; i++){
            if(users[i].login != req.body.login){
                const newUser = {login: `${req.body.newLogin}`, password: `${req.body.newPassword}`}
                users.push(newUser);
                // PRINT
                console.log(users);
                res.redirect('/login');
                break;
            } else{
                res.redirect('/cadastro');
                break;
            }
        }
    } else{
        res.redirect('/cadastro');
    }
});

app.get('/', function(req, res){ 
   res.redirect("login"); 
});

app.get('/login', function(req, res){ 
    res.render("login"); 
});

app.get('/cadastro', function(req, res){ 
    res.render("cadastro");
});

app.get('/login/user', function(req, res){ 
    res.render("user", {name_user: req.session.login});
});

app.listen(port, () => {
    console.log(`Ouvindo na porta ${port}`);
});