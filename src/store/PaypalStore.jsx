import { create } from "zustand";
import { API_URL_PAYPAL } from "../api/conexiones";
import axios from "axios";
export const usePaypalStore = create((set) => ({
  crearOrdenPaypal: async (p) => {
    const response = await axios.post(
      `${API_URL_PAYPAL}/create`,
      {
        items: p.items,
        total: p.total,
      },
      {
        headers: {
          Authorization: `Bearer ${p.auth_token}`,
        },
      }
    );
    return response;
  },
  executeOrdenPaypal: async (p) => {
    console.log(p)
    const response = await axios.get(
      `${API_URL_PAYPAL}/success/${p.id_venta}?paymentId=${p.paymentId}&token=${p.token_paypal}&PayerID=${p.PayerID}&total=${p.total}`,
     
      {
        headers: {
          Authorization: `Bearer ${p.auth_token}`,
        },
      }
    );
    return response;
  },
}));
