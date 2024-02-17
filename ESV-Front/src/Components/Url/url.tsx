import React, { useState } from 'react';

const DesencurtadorDeURL = () => {
  const [urlEncurtada, setUrlEncurtada] = useState('');

  return (
    <div>
      <label>
        Insira a URL encurtada do Google:
        <input
          type="text"
          value={urlEncurtada}
          onChange={(e) => setUrlEncurtada(e.target.value)}
        />
      </label>
      <button>
        <a href={urlEncurtada} target="_blank" rel="noopener noreferrer">
          Desencurtar
        </a>
      </button>
    </div>
  );
};

export default DesencurtadorDeURL;