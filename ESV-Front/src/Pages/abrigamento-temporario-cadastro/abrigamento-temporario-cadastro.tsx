import './abrigamento-temporario-cadastro.css'
import React, { useState } from 'react';
import{ useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
//import Url from "../../Components/Url/url2";

const schema = yup
  .object({
    UF: yup.string().required("O campo é obrigatório!"), 
    cidade: yup.string().required("O campo é obrigatório!"), 
    bairro: yup.string().required("O campo é obrigatório!"),
    endereco: yup.string().required("O campo é obrigatório!"),
    cep: yup.string().matches(/\d{5}-\d{3}/, "O CEP não está no formato!").required("O campo é obrigatório!"),
    nomeLocal: yup.string().required("O campo é obrigatório!"),
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


function AbrigamentoCadastro() {

    let navigate = useNavigate();
    const [googleMapsUrl, setGoogleMapsUrl] = useState("");
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null);
    const [coordinatesError, setCoordinatesError] = useState(false);

    const { register, handleSubmit ,formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(userData: any) {
        console.log(userData);
        navigate('/modulo-abrigamento-temporario')
    }

    console.log(errors); 

    const handleUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setGoogleMapsUrl(event.target.value);
    };

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


    

    return (
            <>
            <div className='container'>
                <hr />
                    {/*<Url/>*/}
                    <h1 className='titulo-page'>CENTRO DE REFERÊNCIA DE ABRIGAMENTO TEMPORÁRIO</h1>
                    <h2 className='subtitulo-AT'>Os campos marcados com <b className='asterisco'>*</b> são de preenchimento obrigatório</h2>

                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>Nome do Local <b className='asterisco'>*</b></h2>
                    <span>{errors.nomeLocal?.message}</span>
                    <div className="search-bar">
                        <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                className={`question-bar ${errors.nomeLocal ? 'error-input' : ''}`}
                                {...register('nomeLocal', { required: true })}
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

                        <SelectEstadoECidade options={estadosECidades}/>

                        <div className="flex-search-bar-4">
                            <h2 className='subtitle-question'>Bairro <b className='asterisco'>*</b></h2>
                            <span>{errors.bairro?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.bairro ? 'error-input' : ''}`}
                                    {...register('bairro', { required: true })}
                                    type="text"
                                    placeholder="Selecione"
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

                    <h2 className='subtitle-question'>Geolocalização (link do Google Maps) <b className='asterisco'>*</b></h2>
                        <div className="search-bar">
                            {coordinatesError && (
                                <p style={{ color: 'red' }}>Coordenadas não encontradas. Verifique se o link do Google Maps está correto.</p>
                            )}
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" value={googleMapsUrl} onChange={handleUrlChange} placeholder="Digite o link do Google Maps" className='question-bar' />
                            </form>
                            <div className='btn-div'>
                                <button className='btn-coordinates' onClick={handleExtractCoordinates}>Extrair Coordenadas</button>
                            </div>
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

                    <div className='heavy-line'></div>
                    <h2 className='subtitle-question'>CONTATOS E REDES</h2>
                    
                    <div className='flex-bar'>
                        
                        <div className="flex-search-bar-c3">
                            <h2 className='subtitle-question'>(DDD) + Telefone</h2>
                            <span>{errors.telefone?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.telefone ? 'error-input' : ''}`}
                                    {...register('telefone', { required: true })}
                                    type="text"
                                    placeholder="(00) 9 0000-0000"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-c3">
                            <h2 className='subtitle-question'>(DDD) + WhatsApp</h2>
                            <span>{errors.whatsapp?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.whatsapp ? 'error-input' : ''}`}
                                    {...register('whatsapp', { required: true })}
                                    type="text"
                                    placeholder="(00) 9 0000-0000"
                                />
                            </form>
                        </div>

                        <div className="flex-search-bar-a3">
                            <h2 className='subtitle-question'>Site</h2>
                            <span>{errors.site?.message}</span>
                            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    className={`question-bar ${errors.site ? 'error-input' : ''}`}
                                    {...register('site', { required: true })}
                                    type="text"
                                    placeholder = "www.dominioDoSite.com"
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

function SelectEstadoECidade(props: {options: {valor: string, estado: string, cidades: {cidade: string[]}}[]}) {

    return (
    <>
    <div className="flex-search-bar-4">
        <h2 className='subtitle-question'>Estado <b className='asterisco'>*</b></h2>
        <select className="form-select" aria-label="Select estado">
                <option selected>Selecione</option>
        {props.options.map(options =>
                <option value={options.valor}>{options.estado}</option>
            )}
        </select>
    </div>

    <div className="flex-search-bar-4">
        <h2 className='subtitle-question'>Cidade <b className='asterisco'>*</b></h2>
        <select className="form-select" aria-label="Select estado">
                <option selected>Selecione</option>
        {props.options.map(options =>
                <option value={options.valor}>{options.estado}</option>
            )}
        </select>
    </div>
    </>
    )
}

const estadosECidades = [
    {valor: '1', estado: 'Distrito Federal',
    cidades: {cidade: ['Água Quente', 'Arapoanga', 'Águas Claras', 'Arniqueira', 'Brazlândia',
                    'Candangolândia', 'Ceilândia', 'Cruzeiro', 'Fercal', 'Gama',
                    'Guará', 'Itapoã', 'Jardim Botânico', 'Lago Norte', 'Lago Sul',
                    'Núcleo Bandeirante', 'Paranoá', 'Park Way', 'Planaltina', 'Plano Piloto',
                    'Recanto das Emas', 'Riacho Fundo', 'Riacho Fundo II', 'Samambaia', 'Santa Maria',
                    'São Sebastião', 'SCIA/Estrutural', 'SIA', 'Sobradinho', 'Sobradinho II',
                    'Sol Nascente e Pôr do Sol', 'Sudoeste/Octogonal', 'Taguatinga', 'Varjão', 'Vicente Pires']}},
    {valor: '2', estado: 'Goiás',
    cidades: {cidade: ['Água Quente', 'Arapoanga', 'Águas Claras', 'Arniqueira', 'Brazlândia',
                    'Candangolândia', 'Ceilândia', 'Cruzeiro', 'Fercal', 'Gama',
                    'Guará', 'Itapoã', 'Jardim Botânico', 'Lago Norte', 'Lago Sul',
                    'Núcleo Bandeirante', 'Paranoá', 'Park Way', 'Planaltina', 'Plano Piloto',
                    'Recanto das Emas', 'Riacho Fundo', 'Riacho Fundo II', 'Samambaia', 'Santa Maria',
                    'São Sebastião', 'SCIA/Estrutural', 'SIA', 'Sobradinho', 'Sobradinho II',
                    'Sol Nascente e Pôr do Sol', 'Sudoeste/Octogonal', 'Taguatinga', 'Varjão', 'Vicente Pires']}}
]

export default AbrigamentoCadastro;
