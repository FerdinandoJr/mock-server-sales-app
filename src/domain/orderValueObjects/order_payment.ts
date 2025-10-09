import { Money } from "../valueObjects/money";
import { PaymentMethod } from "../valueObjects/payment-method";

export interface OrderPayment {
   paymentMethod: PaymentMethod,
   money: Money
}