import React, { useState } from 'react';


function App() {
  const [urlOriginal, setUrlOriginal] = useState('');
  const [urlCurta, setUrlCurta] = useState('');

  const encurtarURL = async () => {
    try {
      const response = await fetch('http://localhost:5000/encurtar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url_original: urlOriginal }),
      });

      if (response.ok) {
        const data = await response.json();
        setUrlCurta(`http://localhost:3000/${data.url_curta}`);
      } else {
        console.error('Erro ao encurtar a URL');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="App">
      <h1>Desencurtador de URL</h1>
      <label>
        Insira a URL original:
        <input
          type="text"
          value={urlOriginal}
          onChange={(e) => setUrlOriginal(e.target.value)}
        />
      </label>
      <button onClick={encurtarURL}>Encurtar2</button>
      {urlCurta && (
        <div>
          <p>URL curta gerada:</p>
          <a href={urlCurta} target="_blank" rel="noopener noreferrer">
            {urlCurta}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;