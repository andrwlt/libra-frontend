import { Charge, Checkout } from "types";

export interface ApiContextInterface {
  getCharges: () => Promise<Charge[]>;
  createCheckout: (checkout: any) => Promise<Checkout | null>;
  getListCheckout: () => Promise<Checkout[]>;
  getCheckout: (id: string) => Promise<Checkout | null>;
}
