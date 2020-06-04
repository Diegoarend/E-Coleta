import React from 'react';
import './styles.css'
import logo from '../../assets/logo.svg'

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header> 
                    <img src={logo} alt="ECOLETA"/>
                </header>
            </div>
           
        </div>

    )
}

export default Home;