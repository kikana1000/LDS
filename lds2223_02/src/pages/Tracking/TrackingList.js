import React, { useState } from 'react';
import PopupInfo from './PopupInfo';
import './PopupTracking.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function TrackingList() {
    const [search, setSearch] = useState('');
    const[buttonPopupInfo,setButtonPopupInfo]= useState(false);

    const [percursos, setPercursos] = useState([
        {id: 1, name: "Produto A", fases: [ 
        
            { id: 1, name: 'Receção', date: '12/11/2022',type:'reception', time: '23:12:09'},
            { id: 2, name: 'Fase 2', date: '21/11/2022',type:'type 2', time: '11:12:09'},
            { id: 3, name: 'Fase 3', date: '23/11/2022',type:'type 3', time: '13:12:09'},
            { id: 4, name: 'Fase 4', date: '25/11/2022',type:'type 4' , time: '15:12:09'},
            { id: 5, name: 'Fase 5', date: '29/12/2022', type:'type 5' , time: '13:12:09'}
    ]
    },
        {id: 2, name: "Produto B", fases: [  
            { id: 1, name: 'Receção', date: '12/11/2022',type:'reception', time: '11:12:09'},
            { id: 2, name: 'Fase 2', date: '19/11/2022',type:'type 2', time: '18:12:09'}
        ]
    },
        {id: 3, name: "Produto C", fases: [
            { id: 1, name: 'Receção', date: '12/11/2022',type:'reception', time: '19:12:09'},
            { id: 2, name: 'Fase 2', date: '20/11/2022',type:'type 2', time: '10:12:09'},
            { id: 3, name: 'Fase 3', date: '21/11/2022',type:'type 3', time: '09:12:09'},
            { id: 4, name: 'Fase 4', date: '22/11/2022',type:'type 4' , time: '20:12:09'}
        ]
    }
    ])

    const[faseInfo,setFaseInfo]= useState(null);

    return (
    <html>
        <div className="local-bootstrap container gap-3 ">  
            <h1 className="p-3 text-center">Tracking</h1>
            
        </div>
 
        <div className='searchBar'>
        <Form>
          <InputGroup>
  
            <Form.Control className='inputClass'
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
            /> 
            <i class="fa-solid fa-magnifying-glass"></i><p></p>
          </InputGroup>
        </Form>
        </div>
       
        <p></p>
   <b className='tudo'>

   
{percursos.filter((percurso) => {
                return search.toLowerCase() === ''
                  ? percurso
                  : percurso.name.toLowerCase().includes(search);
              })
              .map((percurso, index)=>
<td>
    <tr key={index}>
        <tr><h2>{percurso.name}</h2></tr>
        <tr>{percurso.fases && percurso.fases.map(
            (fase)=> 
            <tr>
                <tr></tr><td className='centered'>
                    <buttonPopupInfo className="buttonPopUp" cursor="pointer" onClick={()=> {setButtonPopupInfo(true);setFaseInfo(fase);}}>{fase.id}:  {fase.name}</buttonPopupInfo></td>
            </tr>
        )}</tr>
       <PopupInfo phase={faseInfo} trigger={buttonPopupInfo} setTrigger={setButtonPopupInfo}> </PopupInfo>
    </tr>
 </td>
)}</b>


    <p>   </p>  
    </html>
    );
}

export default TrackingList;
