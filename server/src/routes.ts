import express from "express"; 
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();

//index,show,create,update,delete

//agora vamos criar uma instância da classe Pointscontrollers
const pointsController = new PointsController();
const itemsController = new ItemsController();
//como a conexão com o banco de dados vai demorar, devemos colocar um asyn antes da funcão e um await antes do select
routes.get('/items',itemsController.index); 
routes.post('/points',pointsController.index);
routes.post('/points',pointsController.create);
routes.get('/points/:id',pointsController.show); 
export default routes;


//melhorias > Service Pattern, Repository Pattern (Data Mapper)