import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import {API_URL_AUTH} from "../api/conexiones"

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: false,
      isAuthenticated: false,
      token: null,
      error: null,
      datauserAuth: [],
      signCreateEmail: async (p) => {
        try {
          const response = await axios.post(
            `${API_URL_AUTH}/signup`,
            { email: p.email, password: p.password }
          );
          ;
          const datauser = response.data.user
       
         
        
          return response.data;
        } catch (error) {
          set({ error: "Failed to login. Please check your credentials." });
          return null;
        }
      },
      signInWithEmail: async (p) => {
        try {
          const response = await axios.post(
            `${API_URL_AUTH}/signin`,
            { email: p.email, password: p.password }
          );
          const token = response.data.session.access_token;
          const datauser = response.data.session.user
       
          localStorage.setItem("token", token);
          set({
            isAuthenticated: true,
            token: token,
            error: null,
            datauserAuth:datauser
          });
          return response.data;
        } catch (error) {
          set({ error: "Failed to login. Please check your credentials." });
          return null;
        }
      },
      signout: async () => {
        localStorage.removeItem("token");
        set({ isAuthenticated: false, token: null,datauserAuth:[] });
      },
      checkAuth: () => {
        const token = localStorage.getItem("token");
        if (token) {
          set({ isAuthenticated: true, token: token });
        } else {
          set({ isAuthenticated: false, token: null });
        }
      },
    }),
    {
      name: "auth-storage", // Nombre del almacenamiento
      getStorage: () => localStorage, // Configurar el almacenamiento como localStorage
    }
  )
);
