import { create } from "zustand";

interface SendParcelStateProps {
  deliveryMode: string;
  setDeliveryMode: (mode: string) => void;
  fromCountry: string;
  setFromCountry: (country: string) => void;
  fromState: string;
  setFromState: (state: string) => void;
  toCountry: string;
  setToCountry: (country: string) => void;
  toState: string;
  setToState: (state: string) => void;
  fromPostcode: string;
  setFromPostcode: (postcode: string) => void;
  toPostcode: string;
  setToPostcode: (postcode: string) => void;
}

export const useSendParcelStore = create<SendParcelStateProps>((set) => ({
  deliveryMode: "domestic",
  setDeliveryMode: (mode: string) => {
    set({ deliveryMode: mode });
  },
  fromCountry: "",
  setFromCountry: (country: string) => {
    set({ fromCountry: country });
  },
  fromState: "",
  setFromState: (state: string) => {
    set({ fromState: state });
  },
  toCountry: "",
  setToCountry: (country: string) => {
    set({ toCountry: country });
  },
  toState: "",
  setToState: (state: string) => {
    set({ toState: state });
  },
  fromPostcode: "",
  setFromPostcode: (postcode: string) => {
    set({ fromPostcode: postcode });
  },
  toPostcode: "",
  setToPostcode: (postcode: string) => {
    set({ toPostcode: postcode });
  },
}));
