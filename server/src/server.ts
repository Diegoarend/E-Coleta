import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes)

app.use('/uploads', express.static(path.resolve('__dirname','..',"uploads")))  

//app.use(routes);

//Request Params: Parâmetros que vem na própria rota que identificam um recurso

//Query Params: Parâmetros que vem na própria rota geralmente opcionais que servem para filtros e paginacões

//Request Body: Params para criacão e atualizacão (todo o resto)

/*
const users = [
    "Diego",
    "Cleiton",
    "Mario",
    "Robson"
]
app.get('/users',(request,response) => {
    const search = String(request.query.search);

    const FilteredUsers = search ? users.filter(user => user.includes(search)) : users;


    return    response.json(FilteredUsers);
}); 

//: significa que está recebendo um parâmetro
app.get('/users/:id',(request, response) => {
//params vem os parametros que vem na rota
    const id= Number(request.params.id)

    const user = users[id]

    return response.json(user)
})
app.post('/users', (request,response) => {

    const data = request.body;

    console.log(data)

    const user = {
        name: data.name,
        email: data.email
    };

   return response.json(user);
})

*/ 

app.listen(3333);