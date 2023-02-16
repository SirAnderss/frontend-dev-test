/**
 * Convierte los números a moneda (sin símbolo $)
 *
 * @module currencyFormat
 */

/**
 * @description Convierte un tipo number a moneda (sin símbolo $)
 *
 * @param { number} param - Número a convertir
 * @returns {string} string
 * @example currencyFormat(123456789.123456789) // '123,456,789.123456789'
 */
export function currencyFormat(param: number): string {
  if (isNaN(param)) return '';

  return `$ ${new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(param.toFixed(2)))}`;
}
