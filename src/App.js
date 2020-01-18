//componente: um bloco isolado  de HTML , CSS e JS o qual nçao interfere no restante da aplicação
//propriedade: informações que um componente PAI passa para o componente filho
//estado: informações mantidas pelo componente (lembrae: imutabilidade)
import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/Devform';
import DevItem from './components/Devitem';



function App() {
  const [devs, setDevs] = useState([]);
  
   useEffect (() => {
     async function loadDevs(){
       const response = await api.get('./devs');
       
       setDevs(response.data);
     }

     loadDevs();
   },[]);

  async function handleAddDev(data){
      const response = await api.post('/devs', data)

      setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
       <strong>Cadastrar</strong>
       <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
      <ul>
      {devs.map(dev => (
        <DevItem key={dev._id } dev={dev}/>
      ))}
      </ul>
     </main>
    </div>
    
  );
}

export default App;
