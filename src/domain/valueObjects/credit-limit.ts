import { Money } from "./money";

export interface CreditLimit {
  maximum: Money      // limite total
  available: Money    // quanto ainda está disponível
}