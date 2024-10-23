import { IOrderDto } from "./OrderDto";

export type IAddProuctToCartDto = IOrderDto["orderedProducts"][number]
