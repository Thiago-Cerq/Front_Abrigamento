import './abrigamento-temporario-cadastro.css'

// Assets

function AbrigamentoCadastro() {


    return (
      <>
        <div className='container'>
            <hr />

            <h1 className='titulo-page'>CENTRO DE REFERÊNCIA DE ABRIGAMENTO TEMPORÁRIO</h1>
            <h2 className='subtitulo-AT'>Os campos marcados com <b className='asterisco'>*</b> são de preenchimento obrigatório</h2>

            <div className='heavy-line'></div>
            <h2 className='subtitle-question'>Nome do Local <b className='asterisco'>*</b></h2>
            <div className="search-bar">
                <form>
                <input type="text" placeholder=" Digite" className='question-bar'/>
                </form>
            </div>

            <div className='heavy-line'></div>
            <h2 className='subtitle-question'>ENDEREÇO</h2>

            <div className='flex-bar'>
                <div className="flex-search-bar-4">
                    <h2 className='subtitle-question'>CEP <b className='asterisco'>*</b></h2>
                    <form>
                    <input type="text" placeholder=" 00000-000" className='question-bar'/>
                    </form>
                </div>

                <div className="flex-search-bar-4">
                    <h2 className='subtitle-question'>Estado <b className='asterisco'>*</b></h2>
                    <form>
                    <input type="text" placeholder=" Selecione" className='question-bar'/>
                    </form>
                </div>

                <div className="flex-search-bar-4">
                    <h2 className='subtitle-question'>Cidade <b className='asterisco'>*</b></h2>
                    <form>
                    <input type="text" placeholder=" Selecione" className='question-bar'/>
                    </form>
                </div>

                <div className="flex-search-bar-4">
                    <h2 className='subtitle-question'>Bairro <b className='asterisco'>*</b></h2>
                    <form>
                    <input type="text" placeholder=" Digite" className='question-bar'/>
                    </form>
                </div>
            </div>

            <h2 className='subtitle-question'>Endereço <b className='asterisco'>*</b></h2>
            <div className="search-bar">
                <form>
                <input type="text" placeholder=" Digite" className='question-bar'/>
                </form>
            </div>

            <h2 className='subtitle-question'>Geolocalização
            (link do Google Maps) <b className='asterisco'>*</b></h2>
            <div className="search-bar">
                <form>
                <input type="text" placeholder=" Digite" className='question-bar'/>
                </form>
            </div>

            <div className='heavy-line'></div>
            <h2 className='subtitle-question'>HORÁRIOS DE FUNCIONAMENTO</h2>

            <div className='heavy-line'></div>
            <h2 className='subtitle-question'>CONTATOS E REDES</h2>
            <div className='flex-bar'>
                <div className="flex-search-bar-3">
                    <h2 className='subtitle-question'>Facebook</h2>
                    <form>
                    <input type="text" placeholder=" 00000-000" className='question-bar'/>
                    </form>
                </div>

                <div className="flex-search-bar-3">
                    <h2 className='subtitle-question'>Instagram</h2>
                    <form>
                    <input type="text" placeholder=" 00000-000" className='question-bar'/>
                    </form>
                </div>

                <div className="flex-search-bar-3">
                    <h2 className='subtitle-question'>Twitter</h2>
                    <form>
                    <input type="text" placeholder=" 00000-000" className='question-bar'/>
                    </form>
                </div>

            </div>
        </div>
      </>
    )
  }
  
  export default AbrigamentoCadastro