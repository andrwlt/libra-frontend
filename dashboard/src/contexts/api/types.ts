import { Charge, Checkout } from "types";

export interface ApiContextInterface {
  getCharges: () => Promise<Charge[]>;
  createCheckout: (checkout: Checkout) => Promise<Checkout>;
  getListCheckout: () => Promise<Checkout[]>;
  getCheckout: (id: string) => Promise<Checkout>;
  updateCheckout: (id: string, data: Partial<Checkout>) => Promise<Checkout>;
}
