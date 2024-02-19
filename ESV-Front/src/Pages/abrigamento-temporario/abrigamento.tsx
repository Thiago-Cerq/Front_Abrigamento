import './abrigamento.css';
import axios from 'axios';

import {useState, useEffect, useRef} from 'react';
import React from 'react';
import eyeImage from '../../assets/Icons/eye.svg';
import pencilImage from '../../assets/Icons/pencil.svg';
import trashImage from '../../assets/Icons/trash.svg';
import { Link } from 'react-router-dom';



function Abrigamento() {
  const [info, setInfo] = useState<any[]>([]);
  const [head, setHead] = useState<any[any]>([]);
  const [pages, setPages] = useState([]);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);



  const getInfo = () => {
      //Passando porpagina
      //axios.get("http://localhost:8080/suas/v1/equipamentos/municipio/2111300/tipo/CRAT?page=${currentPage}&limit={${limit}}")	
      axios.get("http://localhost:8080/suas/v1/equipamentos/municipio/2111300/tipo/CRAT")	
      .then((response) => {
      setInfo(response.data.content)
      console.log(response.data.content)
      setHead(response.data.page)
      console.log(response.data.page)
      console.log("A requisição foi um sucesso!")

      })
      .catch(() => {
      console.log("Deu errado!")
      })
  }

  function iterador(data: any) {
    for (var i = 0; i < data.length; i++) {
  
    }
  }

  const [open, setOpen] = useState(false);
  const filterRef = useRef();

  useEffect(() => {
    getInfo();
    iterador(info);
    const totalPaginas = Math.ceil(head.totalElements / limit);

    const arrayPages = [];
    for(let i = 0; i < totalPaginas; i++){
      arrayPages.push(i);
    }

    setPages(arrayPages);

  },[]) 


 

  //function onSubmit(userData: any) {
  //    console.log(userData);
  //}

  
  function addLine(item: any, index: number) {
    const isEven = index % 2 === 0;
    return (
      <tbody className='t-list'>
        <tr className={isEven ? 'even-row' : 'odd-row'}>
          <td className='teste'>{item.nome}</td>
          <td className='td-action'>
            <img src={eyeImage}/>
              {/*<Link  className=' link-to' to={{pathname: `/modulo-abrigamento-temporario-edita/${iten.id}`}}> */}
              <Link  className=' link-to' to={{pathname: `/modulo-abrigamento-temporario-edita/${index}`}}> 
                <img src={pencilImage}/> 
              </Link> 
            <img src={trashImage}/> 
          </td>
        </tr>
      </tbody> 
    )
  }

  return (
    <>
      <div className='container'>
        <hr/>
        <h1 className='titulo-page'>ABRIGAMENTO TEMPORÁRIO</h1>
        <h2 className='subtitulo-AT'>Escritório Social do(a) ESTADO</h2>

        <div className='bloco1'>23423</div> {/*Bloco de imagem*/}
        <hr/>
        <div className='bloco2'>
          <h1 className='titulo-list'>CENTRO DE REFERÊNCIA DE ABRIGAMENTO TEMPORÁRIO</h1>
          <hr/>
          <p className='p-list'> As unidades de CRAS, CREAS e Centro Pop são automaticamente cadastradas no aplicativo Escritório Social Virtual. Por favor, neste módulo, cadastre apenas outros Centros de Referência de Abrigamento Temporário da sua região.</p>
          <hr/>

          <div className="search-bar">
            <form>
              <input type="text" placeholder=" Pesquise por palavra-chave" className='barra-pesquisa'/>
            </form>
          </div>


          <div className='d-table'>
            <table border={1} className="table" >
              <thead>
                <th>Nome do local</th>
                <th className='th-action'>Ações</th>
              </thead>
              <>
                {info.map((item, index) => (
                  <React.Fragment key={index}>
                    {addLine(item, index)}
                  </React.Fragment>
                ))}
              </>

              <tfoot>
               
              </tfoot>
            </table>
            <div className='btn-div'>
                  <Link to="/modulo-abrigamento-temporario-cadastro"> <button className='btn-novo'> + INCLUIR NOVO</button> </Link>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}





export default Abrigamento