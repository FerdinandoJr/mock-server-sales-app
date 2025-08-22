export enum UF {
  AC,
  AL,
  AM,
  AP,
  BA,
  CE,
  DF,
  ES,
  GO,
  MA,
  MG,
  MS,
  MT,
  PA,
  PB,
  PE,
  PI,
  PR,
  RJ,
  RN,
  RO,
  RR,
  RS,
  SC,
  SE,
  SP,
  TO
}


export type UFName = keyof typeof UF;

export interface StateRegistration {
    uf: UFName
    number: string | null
    isExempt: boolean
}