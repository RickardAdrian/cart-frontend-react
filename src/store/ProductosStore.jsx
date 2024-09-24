import { create } from "zustand";
import { MostrarProductos } from "../models/crudProductos";

export const useProductosStore = create((set) => ({
  dataproductos: [],
  mostrarProductos: async () => {
    const response = await MostrarProductos();
    set({ dataproductos: response });
    return response;
  },
}));
