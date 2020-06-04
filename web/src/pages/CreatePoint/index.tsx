
import  React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api'




import './styles.css'

import logo from '../../assets/logo.svg'
import { Interface } from 'readline';
import { number, string } from 'prop-types';



//vamos usar a interface para criar uma representacão do que será o item

interface Item {
    id: number;
    tittle: string;
    image_url:string;
}

interface IBGEUFResponse {
    sigla: string;
}


const CreatePoint = () => {

    //sempre que criamos um estado para um array ou objeto, precisamos manualmente informar o tipo da 
    //variável que será armazenada


    //agora precisamos informar que esse estado é um array de itens
    //o useState é uma funcão que aceita um arguento de tipagem, generic, entre <> . Então adicionamos Item[] 
    const [items,setItems]=useState<Item[]>([])

    const [ufs,setUfs] = useState<string[]>([])


    //para evitar que api seja chamada toda vez que recarregamos a página, usaremos o usuEffect
    // a funcão dentro do useEffect será disparada uma única vez não importa quanto o componente mude
    useEffect(() => {
        //temos que usar promises e não async
        api.get('items').then(response => {
            setItems(response.data)
        })
    },[]);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla)

            setUfs(ufInitials)
        })
    })


    return(
       <div id="page-create-point">
           <header>
               <img src={ logo } alt="ecoleta"/>

               <Link to='/'>
                   < FiArrowLeft />
                    Voltar para Home
               </Link>
           </header>

           <form>
               <h1>Cadastro do <br /> ponto de coleta</h1>

               <fieldset>
                   <legend>
                       <h2>Dados</h2>
                   </legend>
                   <div className="field">
                       <label htmlFor="name">Nome da entidade</label>
                       <input 
                       type="text"
                       name="name"
                       id="name"
                       />
                   </div>

                   <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                            type="email"
                            name="email"
                            id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            />
                        </div>
                   </div>
               </fieldset>

               <fieldset>
                   <legend>
                       <h2>Endereço</h2>
                       <span>Selecione o endereço no mapa</span>
                   </legend>

                   <Map center={[-27.5998783,-48.5487406]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        < Marker position ={[-27.5998783,-48.5487406]} />
                   </Map>

                   <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf"> 
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => {
                              return <option key={uf} value={uf}>{uf}</option> 
                            })}  
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade (UF)</label>
                            <select name="city" id="city"> 
                            <option value="0">Selecione uma Cidade</option>
                            </select>
                        </div>
                        
                    </div>
               </fieldset>

               <fieldset>
                   <legend>
                       <h2>Ítens de Coletas</h2>
                       <span>Selecione um ou mais ítens abaixo</span>
                   </legend>
                   <ul className="items-grid">
                       {items.map(item => (
                        <li key={item.id}>
                           <img src={item.image_url} alt={item.tittle}/>
                       <span>{item.tittle}</span>
                       </li>
                       ))}
                       
                     
                   </ul>
               </fieldset>

               <button type="submit"> Cadastrar ponto de coleta</button>
           </form>
       </div>
    )
}

export default CreatePoint;