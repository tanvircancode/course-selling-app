import { atom } from "recoil";

export const purchaseState = atom({
  key: "purchaseState",
  default: {
    isPurchase: false,
  },
});
