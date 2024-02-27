
export function converterStringParaArray(string :string) {
    // Função para converter a string para um array recursivamente
    const convertRecursive = (str :string) => {
      // Inicializa um array resultante
      const result: any[][] = [];
  
      // Remove os espaços em branco em excesso e divide a string pelos separadores ','
      const parts = str.split(',');
  
      // Percorre os elementos e adiciona-os ao array resultante
      parts.forEach((part: any)  => {
        const trimmedPart = part.trim();
        // Verifica se o elemento é um array
        if (trimmedPart.startsWith('[') && trimmedPart.endsWith(']')) {
          // Remove os colchetes e chama recursivamente a função convertRecursive
          const innerArray = convertRecursive(trimmedPart.substring(1, trimmedPart.length - 1));
          result.push(innerArray);
        } else {
          // Se o elemento não for um array, adiciona-o ao array resultante
          result.push(trimmedPart);
        }
      });
  
      return result;
    };
  
    // Chama a função convertRecursive com a string inicial
    return convertRecursive(string);
  } 