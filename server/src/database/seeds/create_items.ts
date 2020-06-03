import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {tittle :'Lâmpadas', image: 'lampadas.svg'},
        {tittle :'Pilhas e Baterias', image: 'baterias.svg'},
        {tittle :'Papeis e Papelão', image: 'papeis-papelao.svg'},
        {tittle :'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        {tittle :'Resíduos Orgânicos', image: 'organicos.svg'},
        {tittle :'óleo de Cozinha', image: 'oleo.svg'}
    ])
}

