import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  InsertarVenta,
  InsertarDetalleVenta,
  MostrarVentaXIduser,
} from "../models/crudVentas";

export const useVentasStore = create(
  persist(
    (set, get) => ({
      dataventas: [],
      idventa: 0,
      insertarVentas: async (p) => {
        const response = await InsertarVenta(p);
        console.log(response);
        set({ dataventas: response });
        set({ idventa: response.id });
        return response;
      },
     
      insertarDetalleVentas: async (p) => {
        const response = await InsertarDetalleVenta(p);
        return response;
      },
      mostrarVentaXIduser: async (p) => {
        const response = await MostrarVentaXIduser(p);
        set({ dataventas: response });
        return response;
      },
    }),
    {
      name: "dataventas-storage", // Nombre clave para el almacenamiento en localStorage
      partialize: (state) => ({ dataventas: state.dataventas }), // Solo persiste `dataventas`
    }
  )
);
