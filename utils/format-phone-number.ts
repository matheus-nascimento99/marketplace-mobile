export const formatPhoneNumber = (value: string) => {
  if (!value) return ''

  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  // Aplica a formatação de acordo com o comprimento do número
  if (numericValue.length <= 2) {
    return `(${numericValue}`
  } else if (numericValue.length <= 6) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`
  } else if (numericValue.length <= 10) {
    // Para telefones fixos (8 dígitos + DDD)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6, 10)}`
  } else {
    // Para celulares (9 dígitos + DDD)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`
  }
}
