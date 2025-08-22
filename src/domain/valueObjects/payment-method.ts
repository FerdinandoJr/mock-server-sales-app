export enum PaymentMethod {
  boleto,
  cartaoCredito,
  cartaoDebito,
  pix,
  transferencia,
  cheque,
  dinheiro,
  outros
}

export type PaymentMethodName = keyof typeof PaymentMethod;