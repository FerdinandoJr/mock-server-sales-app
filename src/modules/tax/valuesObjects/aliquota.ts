import { BrazilianState } from "../../../domain/valueObjects/brazilian-state";

export type AliquotaMatrix = {
  [origem in BrazilianState]: {
    [destino in BrazilianState]: number;
  };
};