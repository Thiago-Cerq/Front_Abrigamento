// 00000-000
export const maskCEP = (value: any) => {
    return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
}

export const maskHorario = (value: any) => {
    return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1:$2")
}


// (00) 00000-0000
export const maskPhone = (value: any) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})(\d)/, "$1-$2")
  }