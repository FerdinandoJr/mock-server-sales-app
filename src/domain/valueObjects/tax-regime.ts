export enum TaxRegime {
    simples,
    presumido,
    real
}

export type TaxRegimeName = keyof typeof TaxRegime;