//como o typescript não sabe qual é o formato de request e response, devemos importar os 2 do express
import {Request, Response} from 'express';
import knex from '../database/connection'

class PointsController {
    async index (request: Request, response: Response) {
        const { city, uf, items } = request.query

            // item.trim() tira o espacamento da esquerda e da direita
        const parsedItems= String(items)
        .split(',')
        .map(item => Number(item.trim()))

        const points = await knex('points')
        .join('point_items','points.id','=','point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city', String(city))
        .where('uf',String(uf))
        .distinct()
        .select('points.*')

        return response.json(points)
    }



    async show (request: Request, response: Response) {
       // const id = request.params.id >  com destructuring fica 
        const { id }= request.params

        //com o first() o point deixa de ser um array
        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json({message: 'Point not found'})
        }

        //a versão mobile solicita que sejam exibidos os itens relacionados com o ponto selecionado
        //então precisamos fazer um join da tabela items com a tabela point_items na qual o items_id seja igual ao 
        //point_itens para trazer itens 

        //select * from items 
        //JOIN point_items ON items.id = point.items.item_id
        //WHERE point_items.point_id = {id }
        const items= await knex ('items')
        .join('point_items','items.id','=','point_items.item_id')
        .where('point_items.point_id',id)

         return response.json({point,items}) 
       
    }

    async create(request: Request, response: Response) {
        const {  
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body


    //como os 2 comandos do knex abaixo são dependentes um do outro, vamos utilizar a transactioc(trx) para que se ocorra algum
    //problema em uma, a outra não persista no banco de dados
    //basta substituir o knex por trx
    const trx= await knex.transaction();

    const point = {
        //short sintax, name:name > name 
            image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    //o knex retorna um id dos dados que foram inseridos
    const insertedIds = await trx('points').insert(point);

    //como é um array e só inserimos um dado, será id retornado pelo knex será acessado pelo [0]
    const point_id=insertedIds[0]

    const pointItems=items.map((item_id:number) =>{
        return {
            item_id,
            point_id
        }
    })
    //agora precisamos inserir os dados na tabela que faz o relacinamento point x items
    await trx('point_items').insert(pointItems)

    //sempre que use transaction é preciso dar um commit se tudo deu certo

    await trx.commit();

    return response.json({
        id: point_id,
        //spread
        ...point 

    })
    }
}

export default PointsController;