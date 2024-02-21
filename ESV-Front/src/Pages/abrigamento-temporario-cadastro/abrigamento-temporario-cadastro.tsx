import './abrigamento-temporario-cadastro.css'
import React, { useEffect, useState } from 'react';
import{ useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';

//import Url from "../../Components/Url/url2";

// Máscaras
import { maskCEP, maskHorario, maskPhone } from '../../Components/Masks/Masks';

// Assets
import questionImage from '../../assets/Icons/question.svg';
import AddButton from '../../assets/add_button.png'
import axios from 'axios';


const schema = yup
  .object({
    //UF: yup.string().required("O campo é obrigatório!"), 
    //cidade: yup.string().required("O campo é obrigatório!"), 
    bairro: yup.string().required("O campo é obrigatório!"),
    endereco: yup.string().required("O campo é obrigatório!"),
    cep: yup.string().matches(/\d{5}-\d{3}/, "O CEP não está no formato!").required("O campo é obrigatório!"),
    nome: yup.string().required("O campo é obrigatório!"),
    telefone: yup.string().matches(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/, "O celular não está no formato padrão!"),
    whatsapp: yup.string().matches(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/, "O celular não está no formato padrão!"),
    site: yup.string(),
    facebook: yup.string(),
    instagram: yup.string(),
    twitter: yup.string(),
    email: yup.string().email("Digite um email valido!"),
    seg: yup.string(), 
    ter: yup.string(),
    qua: yup.string(),
    qui: yup.string(),
    sex: yup.string(),
    sab: yup.string(),
    dom: yup.string(),
    observacao: yup.string(),

  }).required()

const extractCoordinatesFromUrl = (url: string) => {
  const pattern = /@([-+]?\d{1,2}\.\d+),([-+]?\d{1,3}\.\d+)/;
  const matches = url.match(pattern);

  if (matches) {
    const latitude = parseFloat(matches[1]);
    const longitude = parseFloat(matches[2]);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    return { latitude, longitude };
  } else {
    console.log("Coordenadas não encontradas.");
    return null;
  }
};

const diasDaSemana = [
    { value: 'segunda', label: 'Segunda' },
    { value: 'terca', label: 'Terça' },
    { value: 'quarta', label: 'Quarta' },
    { value: 'quinta', label: 'Quinta' },
    { value: 'sexta', label: 'Sexta' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' },
]



const multiSelectStyles = {
    control: (styles: object) => ({...styles, backgroundColor: 'white'}),
    option: (styles: object, state: any) => {
        return {
            ...styles,
            backgroundColor: state.isFocused ? '#0C8BB0' : '#fff',
            color: state.isFocused ? '#fff' : '#000',
        }
    },
    multiValue: (styles: object) => {
        return {
            ...styles,
            alignItems: 'center',
            fontSize: 18,
            height: 35,
            fontWeight: 500,
            backgroundColor: '#0C8BB0',
            color: '#fff'
        }
    },
    multiValueLabel: (styles: object) => {
        return {
            ...styles,
            color: '#fff'
        }
    },
    multiValueRemove: (styles: object) => {
        return {
            ...styles,
            height: 35,
            borderRadius: 0,
            color: '#fff',
            cursor: 'pointer',
            ':hover': {
                color: '#0C8BB0',
                backgroundColor: '#D4D4D4'
            }
        }
    }
}

const selectStyles = {
    control: (styles: object) => ({...styles, backgroundColor: 'white'}),
    option: (styles: object, state: any) => {
        return {
            ...styles,
            backgroundColor: state.isSelected ? '#0C8BB0' : '#fff',  
            color: state.isSelected ? '#fff' : '#000',
            ':hover': {
                color: '#fff',
                backgroundColor: '#0C8BB0'
            }
        }
    },
}


function AbrigamentoCadastro() {

    const [estado, setEstado] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');

    useEffect(() => {
        // Função para buscar os estados da API
        async function fetchStates() {
          try {
            const response = await fetch('http://localhost:8080/localidade/v1/ufs/');
            const data = await response.json();
            setEstado(data.content); // Define os estados no estado do componente
          } catch (error) {
            console.error('Erro ao buscar estados:', error);
          }
        }

        fetchStates(); // Chamada da função de busca ao montar o componente
      }, []);
    
      // Manipulador de mudanças no select
      const handleStateChange = (event) => {
        setSelectedEstado(event.target.value);
      };

      const estados = estado.map((state) => (
        {value: state.sigla, label: state.nome}
    ))

    let navigate = useNavigate();
    const [googleMapsUrl, setGoogleMapsUrl] = useState("");

    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null);
    
    const [coordinatesError, setCoordinatesError] = useState(false);

    const { register, handleSubmit ,formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(userData: any) {
        console.log(userData);
        const dataToSend = {
            "identificador": null,
            "nome": userData.nome,
            "codigoMunicipio": userData.codigoMunicipio,
            "nomeMunicipio": userData.nomeMunicipio, //???
            "unidadeFederacao": userData.UF, //???
            "logradouro": null,
            "endereco": userData.endereco,
            "numero": null, //???
            "complemento": null,
            "bairro": userData.bairro,
            "pontoDeReferencia": null,
            "telefone": userData.telefone,
            "ramal": userData.ramal,
            "email": userData.email,
            "coordenadas": {
                "type": "Point",
                "coordinates": [
                    [
                        userData.coordinates.latitude,
                        userData.coordinates.longitude
                    ]
                ]
            },
            "diasSemana": userData.diasSemana,
            "horasDia":  userData.diasSemana,
            "tipoEquipamentoId": "61ae149ea87dca62af24a805", //???
            "tipoEquipamento":  userData.nome  //"Centro de Referência para Abrigamento Temporário???"

        };
        console.log(dataToSend);
        navigate('/modulo-abrigamento-temporario')
        //postInfo(dataToSend)
        
    }

    const postInfo = (dataToSend: any) => {
        axios.post("http://localhost:8080/suas/v1/equipamentos/", dataToSend)
        .then((response) => {
            setEstado(response.data.content)
            console.log("A requisição foi um sucesso!")
        })
        .catch(() => {
            console.log("Deu errado!")
        })
    }

    

    console.log(errors); 

    const handleUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setGoogleMapsUrl(event.target.value);
        console.log("URL: ",event.target.value);
        console.log("O que é isso?: ",googleMapsUrl);
        handleExtractCoordinates();
        handleExtractCoordinates();
    };
    
    useEffect(() => {
         if (googleMapsUrl.trim() !== '') {
            handleExtractCoordinates();
        }
    }, [googleMapsUrl]);

    const handleExtractCoordinates = () => {
        const extractedCoordinates = extractCoordinatesFromUrl(googleMapsUrl);

        if (extractedCoordinates) {
        setCoordinates(extractedCoordinates);
        setCoordinatesError(false);
        } else {
        setCoordinates(null);
        setCoordinatesError(true);
        }
    };

    // Add Horario
    const [time, setTime] = useState([''])
    const addTimeButton = (e: any) => {
        e.preventDefault()
        setTime([...time, ""])
    }

    // Add Phone
    const [phones, setPhones] = useState([''])
    const addPhoneButton = (e: any) => {
        e.preventDefault()
        setPhones([...phones, ""])
    }

    const handleChangePhone = (e: any, index: any) => {
        phones[index] = e.target.value
        setPhones([...phones])
    }

    // Máscaras
    const [cep, setCEP] = useState("")

    return (
            <>
            <div className='container'>
                <hr />
                    {/*<Url/>*/}
                    <h1 className='titulo-page'>CENTRO DE REFERÊNCIA DE ABRIGAMENTO TEMPORÁRIO</h1>
                    <h2 className='subtitulo-AT'>Os campos marcados com <b className='asterisco'>*</b> são de preenchimento obrigatório</h2>

                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>Nome do Local <b className='asterisco'>*</b></h2>
                    <span>{errors.nome?.message}</span>
                    <div className="search-bar">
                        <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                className={`question-bar ${errors.nome ? 'error-input' : ''}`}
                                {...register('nome', { required: true })}
                                type="text"
                                placeholder="Digite"
                            />
                        </form>
                    </div>

                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>ENDEREÇO</h2>

                    <div className='flex-bar'>
                        <div className="flex-search-bar-4">
                            <h2 className='subtitle-question'>CEP <b className='asterisco'>*</b></h2>
                            <span>{errors.cep?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                            {/*maxLength={9} onChange={(e) => setCEP(maskCEP(e.target.value))}*/}
                                <input value={cep} 
                                    className={`question-bar ${errors.cep ? 'error-input' : ''}`}
                                    {...register('cep', { required: true })}
                                    type="text"
                                    placeholder="00000-000"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-4">
                            <h2 className='subtitle-question'>Estado <b className='asterisco'>*</b></h2>
                            <Select options={estados} className="multi-select" placeholder="Selecione"
                            styles={selectStyles} />
                        </div>

                        <div className="flex-search-bar-4">
                            <h2 className='subtitle-question'>Cidade <b className='asterisco'>*</b></h2>
                            <Select className="multi-select" placeholder="Selecione"/>
                        </div>

                        <div className="flex-search-bar-4">
                            <h2 className='subtitle-question'>Bairro <b className='asterisco'>*</b></h2>
                            <span>{errors.bairro?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.bairro ? 'error-input' : ''}`}
                                    {...register('bairro', { required: true })}
                                    type="text"
                                    placeholder="Digite"
                                />
                            </form>
                        </div>
                    </div>

                    <h2 className='subtitle-question'>Endereço <b className='asterisco'>*</b></h2>
                    <span>{errors.endereco?.message}</span>
                    <div className="search-bar">
                        <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                    className={`question-bar ${errors.endereco ? 'error-input' : ''}`}
                                    {...register('endereco', { required: true })}
                                    type="text"
                                    placeholder="Digite"
                            />
                        </form>
                    </div>

                    
                        <div className="search-bar">
                        <h2 className='subtitle-question'>Geolocalização (link do Google Maps) <b className='asterisco'>*</b></h2>
                            {coordinatesError && (
                                <p style={{ color: 'red' }}>Coordenadas não encontradas. Verifique se o link do Google Maps está correto.</p>
                            )}
                            <form>
                                <div className='search-bar'>
                                    <input type="text" value={googleMapsUrl} onChange={handleUrlChange} placeholder="Digite o link do Google Maps. Exemplo: https://www.google.com.br/maps/@-15.7811101,-47.7790637,15z?entry=ttu" className='question-bar-loc' />
                                </div>
                                <div className='info-button' > {/*onClick={addTimeButton}*/}   
                                    <p className='p-time-button'> <img src={questionImage} alt="adicionar campo telefone"/>  como posso gerar esse link?</p>
                                </div>
                            </form>
                            
                            {/*
                            <div className='btn-div'>
                                <button className='btn-coordinates' onClick={handleExtractCoordinates}>Extrair Coordenadas</button>
                            </div>
                            */}

                            <div className='flex-bar'>
                                <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex-search-bar-c1">
                                        <h2 className='subtitle-question'>Latitude <b className='asterisco'>*</b></h2>
                                        <input type="text" value={coordinates?.latitude ?? ''} placeholder={``} className='question-bar-c' disabled/>
                                    </div>
                                    <div className="flex-search-bar-c2">
                                        <h2 className='subtitle-question'>Longitude <b className='asterisco'>*</b></h2>
                                        <input type="text" value={coordinates?.longitude ?? ''} placeholder={``} className='question-bar-c' disabled/>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    

                        {/*coordinates && (
                        <div>
                            <p>Latitude: {coordinates.latitude}</p>
                            <p>Longitude: {coordinates.longitude}</p>
                        </div>
                        )*/}

                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>HORÁRIOS DE FUNCIONAMENTO</h2>
                    {
                        time.map(phone => (

                            <div className='flex-bar-multiselect'>
                            <div className="flex-search-bar-multiselect">
                                <h2 className='subtitle-question'>Dia(s) da semana</h2>
                                <Select isMulti options={diasDaSemana} className='multi-select' placeholder = "Selecione"
                                styles={multiSelectStyles}/>
                            </div>
    
                            <div className='bar-hour'>
                                <h2 className='subtitle-question'>Horário</h2>
                                
                                <form>
                                <p className='subtitle-hour'>Início:</p>
                                    <input type="text" placeholder="00:00" className='question-bar-hour'/>
                                </form>
                            </div>
    
                            <div className='flex-bar-hour'>
                                <form>
                                <p className='subtitle-hour'>Fim:</p>
                                    <input type="text" placeholder="00:00" className='question-bar-hour'/>
                                </form>
                            </div>
                        </div>

                        ))
                    }

                    <div className='add-time-button' onClick={addTimeButton}>
                        <img src={AddButton} alt="adicionar campo telefone"/>
                        <p className='p-time-button'>Adicionar dia/horário de funcionamento</p>
                    </div>

                    


                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>CONTATOS E REDES</h2>
                    
                    <div className='flex-bar-phones'>
                    {
                        phones.map((phones,index) => (
                            <div className='flex-bar-phones'>
                                <div className="flex-search-bar-c3">
                                    <h2 className='subtitle-question'>{`Telefone ${index+1}`}</h2>
                                    <span>{errors.telefone?.message}</span>
                                    <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                        <input 
                                            className={'question-bar'}
                                            type="text"
                                            placeholder="(00) 9 0000-0000"
                                        />
                                    </form>
                                </div>

                                <div className="flex-search-bar-c3">
                                    <h2 className='subtitle-question'>{`Whatsapp ${index+1}`}</h2>
                                    <span>{errors.whatsapp?.message}</span>
                                    <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            className={'question-bar'}
                                            type="text"
                                            placeholder="(00) 9 0000-0000"
                                            onChange={(e) => handleChangePhone(e, index)}
                                        />
                                    </form>
                                </div>
                            </div>
                        ))
                    }
                    </div>

                    <div className='flex-bar'>
                        <div className="flex-search-bar-a3">
                            <h2 className='subtitle-question'>Site</h2>
                            <span>{errors.site?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.site ? 'error-input' : ''}`}
                                    {...register('site', { required: true })}
                                    type="text"
                                    placeholder = "www.site.com.br"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-a3">
                            <h2 className='subtitle-question'>E-mail</h2>
                            <span>{errors.email?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.email ? 'error-input' : ''}`}
                                    {...register('email', { required: true })}
                                    type="text"
                                    placeholder = "exemplo@dominio.com"
                                />
                            </form>
                        </div>

                    </div>

                    <div className='flex-bar'>
                        
                        <div className="flex-search-bar-3">
                            <h2 className='subtitle-question'>Facebook</h2>
                            <span>{errors.facebook?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.facebook ? 'error-input' : ''}`}
                                    {...register('facebook', { required: true })}
                                    type="text"
                                    placeholder = "www.facebook.com/facebook"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-3">
                            <h2 className='subtitle-question'>Instagram</h2>
                            <span>{errors.instagram?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.instagram ? 'error-input' : ''}`}
                                    {...register('instagram', { required: true })}
                                    type="text"
                                    placeholder = "www.instagram.com/instagram"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-3">
                            <h2 className='subtitle-question'>Twitter</h2>
                            <span>{errors.twitter?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.twitter ? 'error-input' : ''}`}
                                    {...register('twitter', { required: true })}
                                    type="text"
                                    placeholder = "www.twitter.com/twitter" 
                                />
                            </form>
                        </div>

                         

                    </div>

                    <div className="btn-form">
                        <Link to="/modulo-abrigamento-temporario"><button className='btn-out'> CANCELAR </button></Link>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                        <button className="btn-coordinates" type="submit" form="form"> + INCLUIR </button> 
                    </div> 
            </div>
        </>
    );
};

export default AbrigamentoCadastro;
