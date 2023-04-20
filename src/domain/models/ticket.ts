export interface TicketModel {
  id: number;
  type: string;
  price: number;
  description: string;
  availableQuantity: number;
  event: object;
}
