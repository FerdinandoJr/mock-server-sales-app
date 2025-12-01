import { Money } from "../../../domain/valueObjects/money";
import { Image } from "./image";

export interface AttributeValue {
    id: number,
    value: string,
    price?: Money,
    images: Image[]
}