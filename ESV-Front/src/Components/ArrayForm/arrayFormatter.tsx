import React from 'react';



export function converterArrayParaString(array: (string | string[])[]): string {
  // Implementação da função
  // Função para verificar se um elemento é um array
  const isArray = (element: any) => Array.isArray(element);

  // Função para converter o array para string recursivamente
  const convertRecursive = (arr: any) => {
    return arr.reduce((acc: any, curr: any) => {
      if (isArray(curr)) {
        // Se o elemento for um array, chama recursivamente a função convertRecursive
        return acc + convertRecursive(curr);
      } else {
        // Se o elemento não for um array, adiciona ao acumulador
        return acc + curr.toString() + ', ';
      }
    }, '');
  };

  // Chama a função convertRecursive com o array inicial
  return convertRecursive(array).slice(0, -2); // Remove a última vírgula e espaço
}


