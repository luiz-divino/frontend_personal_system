export const applyCurrencyMask = (value: string): string => {
  const numbersOnly = value.replace(/\D/g, "");

  if (!numbersOnly) return "";

  const decimalValue = Number(numbersOnly) / 100;

  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(decimalValue);
};

export const formatCurrencyValue = (cents: number): string => {

const decimalValue = cents / 100;

  // 2. Formata como moeda oficial com o "R$"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(decimalValue);
};

/**
 * Recebe "100,00" e transforma no inteiro 10000 para a API
 */
export function parseToCentsForAPI(maskedValue: string): number {
  // 1. Remove tudo que não é número
  const onlyNumbers = maskedValue.replace(/\D/g, "");

  // 2. Converte a string limpa para Number
  return Number(onlyNumbers);
}

// Exemplo: parseToCentsForAPI("100,00") // Retorna 10000
// Exemplo: parseToCentsForAPI("1.250,50") // Retorna 125050
