/**
 * Função para formatar um valor como moeda
 * @param {string} value - O valor a ser formatado
 * @param {string} prefix - Prefixo da moeda (opcional, padrão "R$ ")
 * @param {number} decimals - Número de casas decimais (opcional, padrão 2)
 * @param {string} decimalSeparator - Separador decimal (opcional, padrão ",")
 * @param {string} thousandSeparator - Separador de milhar (opcional, padrão ".")
 * @returns {string} - Valor formatado como moeda
 */
export const maskCurrency = (
  value: string,
  prefix = 'R$ ',
  decimals = 2,
  decimalSeparator = ',',
  thousandSeparator = '.',
) => {
  // Remove caracteres não numéricos
  const onlyNumbers = value.replace(/\D/g, '')

  // Converte para número e divide pelo fator de escala
  const scaleFactor = Math.pow(10, decimals)
  let floatValue = parseFloat(onlyNumbers) / scaleFactor

  // Garante que temos um número válido
  if (isNaN(floatValue)) {
    floatValue = 0
  }

  // Formata o número como moeda
  let formattedValue = floatValue.toFixed(decimals)

  // Substitui o ponto decimal pelo separador desejado
  formattedValue = formattedValue.replace('.', decimalSeparator)

  // Adiciona separador de milhar
  const parts = formattedValue.split(decimalSeparator)
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
  formattedValue = parts.join(decimalSeparator)

  // Adiciona o prefixo
  return `${prefix}${formattedValue}`
}
