import { create } from "zustand";
import { MostrarUsuarioXIdSupabase } from "../index";

export const useUsuariosStore = create((set) => ({
  datausuarios: [],
  mostrarUserXIdSupabase: async (p) => {
    console.log(p)
    const response = await MostrarUsuarioXIdSupabase(p);
    set({ datausuarios: response });
    return response;
  },
}));
