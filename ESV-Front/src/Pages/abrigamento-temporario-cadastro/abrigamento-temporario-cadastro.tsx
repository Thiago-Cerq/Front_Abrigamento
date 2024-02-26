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
//import { maskCEP, maskHorario, maskPhone } from '../../Components/Masks/Masks'; Ta sendo ussado?

// Assets
import questionImage from '../../assets/Icons/question.svg';
import AddButton from '../../assets/add_button.png'
import axios from 'axios';



const schema = yup
  .object({
    // estado: yup.string().required("O campo é obrigatório!"), 
    // cidade: yup.string().required("O campo é obrigatório!"), 
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

// MultiSelect Horarios de Funcionamento

const diasDaSemana = [
    { value: 'SEGUNDA', label: 'Segunda' },
    { value: 'TERCA', label: 'Terça' },
    { value: 'QUARTA', label: 'Quarta' },
    { value: 'QUINTA', label: 'Quinta' },
    { value: 'SEXTA', label: 'Sexta' },
    { value: 'SABADO', label: 'Sábado' },
    { value: 'DOMINGO', label: 'Domingo' },
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

    // Funções setEstado
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null);
    const [estado, setEstado] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedUF, setSelectedUF] = useState('')

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
    //   const handleEstadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSelectedEstado(event.target.value);
    //   };

      const handleEstadoChange = (e: any) => {
        setSelectedEstado(e.value)
        setSelectedUF(e.sigla)
      };

      const estados = estado.map((state) => (
        {value: state.nome, label: state.nome, sigla: state.sigla}
    ))

    // Funções setCidade
    const [cidade, setCidade] = useState([]);
    const [selectedCidade, setSelectedCidade] = useState('');
    const [loadingCidades, setLoadingCidades] = useState(false)
      useEffect(() => {
        // Função para buscar as cidades da API
        if (!selectedEstado) return;

        setLoadingCidades(true)
        fetch(`http://localhost:8080/localidade/v1/municipios/uf/${selectedUF}`)
            .then((response) => response.json())
            .then((data) => setCidade(data))
            .then(() => setLoadingCidades(false))

        }, [selectedEstado]);

      // Manipulador de mudanças no select
      const handleCidadeChange = (e: any) => {
        setSelectedCidade(e.value);
      };

      const cidades = cidade.map((cidade) => (
        {value: cidade.nome, label: cidade.nome}
    ))


    let navigate = useNavigate();
    const [googleMapsUrl, setGoogleMapsUrl] = useState("");

   
    
    const [coordinatesError, setCoordinatesError] = useState(false);

    const { register, handleSubmit ,formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(userData: any) {
        const dataToSend = {
            "identificador": null,
            "nome": userData.nome,
            "codigoMunicipio": null,
            "nomeMunicipio": selectedCidade, //???
            "unidadeFederacao": selectedEstado, //???
            "logradouro": userData.endereco,
            "cep": userData.cep,
            "endereco": userData.bairro+", "+userData.endereco + ", " + userData.cep,
            "numero": null, //Não possui
            "complemento": null, //Não possui
            "bairro": userData.bairro,
            "pontoDeReferencia": null, //Não possui
            "telefone": telephone,
            "whatsapp": whatsapp,
            "ramal": userData.ramal,
            "email": userData.email,
            "coordenadas": {
                "type": "Point",
                "coordinates": [
                        coordinates?.latitude,
                        coordinates?.longitude,
                        
                ]
            },
            "diasSemana": userData.diasSemana,
            "horasDia":  userData.diasSemana,
            "tipoEquipamentoId": "61ae149ea87dca62af24a805", //???
            "tipoEquipamento":   {
                "$ref": "tipos",
                "$id": {
                  "$oid": "61ae149ea87dca62af24a805"
                }
              },
              "_class": "br.jus.cnj.esv.rede.suas.domain.Equipamento"
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
        console.log("Coordenadas: ",extractedCoordinates);
        console.log(coordinates);
        setCoordinatesError(false);
        } else {
        setCoordinates(null);
        setCoordinatesError(true);
        }
    };

    // Add Horario
    const [selectedHorarios, setSelectedHorarios] = useState('');
    const [time, setTime] = useState([''])

    const addTimeButton = (e: any) => {
        e.preventDefault()
        setTime([...time, ""])
    }

    const [valoresSelecionados, setValoresSelecionados] = useState(['']);

    // Função para lidar com a mudança de valor no multiselect
    const handleMultiselectChange = (selectedOptions, index) => {
        const novosValoresSelecionados = selectedOptions.map(option => option.value);
        setValoresSelecionados(prevState => ({
            ...prevState,
            [index]: novosValoresSelecionados
        })); // Atualiza o estado com os novos valores selecionados para o multiselect específico
    };

    const [horaInicio, setHoraInicio] = useState([''])
    const [horaFim, setHoraFim] = useState([''])

    const handleChangeInicio = (e, index) => {
        horaInicio[index] = e.target.value
        setHoraInicio([...horaInicio])
        console.log(horaInicio)
    }

    const handleChangeFim = (e, index) => {
        horaFim[index] = e.target.value
        setHoraFim([...horaFim])
        console.log(horaFim)
    }

    // Add Phone
    const [phones, setPhones] = useState([''])
    const [telephone, setTelephone] = useState([''])
    const [whatsapp, setWhatsapp] = useState([''])

    const addPhoneButton = (e: any) => {
        e.preventDefault()
        setPhones([...phones, ""])
    }

    const handleChangeTelephone = (e: any, index: any) => {
        telephone[index] = e.target.value
        setTelephone([...telephone])
        console.log(telephone)
    }

    const handleChangeWhatsapp = (e: any, index: any) => {
        whatsapp[index] = e.target.value
        setWhatsapp([...whatsapp])
        console.log(whatsapp)
    }

    

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
                                <input
                                    className={`question-bar ${errors.cep ? 'error-input' : ''}`}
                                    {...register('cep', { required: true })}
                                    type="text"
                                    placeholder="00000-000"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-4">
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}></form>
                                <h2 className='subtitle-question'>Estado <b className='asterisco'>*</b></h2>
                                <Select options={estados} 
                                className="multi-select" 
                                placeholder="Selecione"
                                styles={selectStyles} 
                                onChange={handleEstadoChange} 
                                value={estados.find(function (option){return option.value === selectedEstado;})}
                            />
                                <p>Você selecionou o estado com sigla {selectedUF}</p>
                            <form/>
                        </div>
 
                        
                        <div className="flex-search-bar-4">
                            <h2 className='subtitle-question'>Cidade <b className='asterisco'>*</b></h2>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}></form>
                                <Select options={cidades} className="multi-select" placeholder="Selecione"
                                styles={selectStyles} onChange={handleCidadeChange}
                                value={cidades.find(function (option) {return option.value === selectedCidade;})}
                                />
                                <p>Você selecionou a cidade com Código {selectedCidade}</p>
                            <form/>
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
                                    placeholder="Digite neste campo o nome da Rua e , Avenida, Quadra e numero do logradouro. Exemplo: Rua Maria da Penha, 100."
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
                                    <p className='p-add-button'> <img src={questionImage} alt="adicionar campo telefone"/>  como posso gerar esse link?</p>
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
                        time.map((time, index) => (

                            <div className='flex-bar-multiselect'>
                            <div className="flex-search-bar-multiselect">
                                <h2 className='subtitle-question'>Dia(s) da semana</h2>
                                <Select isMulti options={diasDaSemana} className='multi-select' placeholder = "Selecione"
                                styles={multiSelectStyles}
                                onChange={(e) => handleMultiselectChange(e, index)}
                                value={diasDaSemana.find(function (option){return option.value === selectedHorarios;})}
                                />
                            </div>

                            {/* <div>
                <h2>Valores Selecionados:</h2>
                <ul>
                    {diasDaSemanaSelecionados.map((valor, index) => (
                        <li key={index}>{valor}</li>
                    ))}
                </ul>
            </div> */}
    
                            <div className='bar-hour'>
                                <h2 className='subtitle-question'>Horário</h2>
                                
                                <form>
                                <p className='subtitle-hour'>Início:</p>
                                    <input type="text" placeholder="00:00" className='question-bar-hour'
                                    onChange={(e) => handleChangeInicio(e, index)}
                                    />
                                </form>
                            </div>
    
                            <div className='flex-bar-hour'>
                                <form>
                                <p className='subtitle-hour'>Fim:</p>
                                    <input type="text" placeholder="00:00" className='question-bar-hour'
                                    onChange={(e) => handleChangeFim(e, index)}
                                    />
                                </form>
                            </div>
                        </div>

                        ))
                    }

                    <div className='add-button-div' onClick={addTimeButton}>
                        <img src={AddButton} alt="adicionar campo telefone"/>
                        <p className='p-add-button'>Adicionar dia/horário de funcionamento</p>
                    </div>

                    


                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>CONTATOS E REDES</h2>
                    
                    <div className='flex-bar-phones'>
                    {
                        phones.map((phone,index) => (
                            <div className='flex-bar-phones'>
                                <div className="flex-search-bar-c3">
                                    <h2 className='subtitle-question'>{`Telefone ${index+1}`}</h2>
                                    <span>{errors.telefone?.message}</span>
                                    <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                        <input 
                                            className={'question-bar'}
                                            type="text"
                                            placeholder="(00) 9 0000-0000"                                            
                                            onChange={(e) => handleChangeTelephone(e, index)}
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
                                            onChange={(e) => handleChangeWhatsapp(e, index)}
                                        />
                                    </form>
                                </div>
                            </div>
                        ))
                    }
                    </div>

                    <div className='add-button-div' onClick={addPhoneButton}>
                        <img src={AddButton} alt="adicionar campo telefone"/>
                        <p className='p-add-button'>Adicionar telefone e/ou whatsapp</p>
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
