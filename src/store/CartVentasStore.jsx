import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from 'sonner';

const initialState = {
  idventa: 0,
  items: [],
  total: 0,
  subtotal: 0,
  totalImpuesto: 0,
  tarjeta: 0,
  credito: 0,
  yape: 0,
  plin: 0,
  vuelto: 0,
  statePantallaCobro: false,
  tipopago: "",
  productoCount: 0, // Agregado: Contador de productos total
  alerta: () => ({})
};

function calcularSubtotal(total, TAX_RATE) {
  return parseFloat((total / (1 + TAX_RATE)).toFixed(2));
}

function calcularTotalImpuesto(total, subtotal) {
  return parseFloat((total - subtotal).toFixed(2));
}

function contarProductos(items) {
  return items.reduce((count, item) => count + item.cantidad, 0);
}

export const useCartVentasStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (p) => {
        return set((state) => {
          const existingItem = state.items.find(
            (item) => item.id_producto === p.id_producto
          );
          let updatedItems;
          if (existingItem) {
            updatedItems = state.items.map((item) => {
              if (item.id_producto === p.id_producto) {
                return {
                  ...item,
                  cantidad: item.cantidad + 1,
                  total: item.total + p.precio_venta,
                };
              }
              return item;
            });
          } else {
            updatedItems = [...state.items, { ...p, cantidad: 1, total: p.precio_venta }];
          }
          const newTotal = updatedItems.reduce(
            (total, item) => total + item.precio_venta * item.cantidad,
            0
          );
          const newSubtotal = calcularSubtotal(newTotal);
          const newTotalImpuesto = calcularTotalImpuesto(newTotal, newSubtotal);
          const newProductoCount = contarProductos(updatedItems);
          return {
            items: updatedItems,
            subtotal: newSubtotal,
            totalImpuesto: newTotalImpuesto,
            total: newTotal,
            productoCount: newProductoCount,
          };
        });
      },

      removeItem: (p) => {
        return set((state) => {
          const updatedItems = state.items.filter((item) => item.id_producto !== p.id_producto);
          const newTotal = updatedItems.reduce(
            (total, item) => total + item.precio_venta * item.cantidad,
            0
          );
          const newSubtotal = calcularSubtotal(newTotal);
          const newTotalImpuesto = calcularTotalImpuesto(newTotal, newSubtotal);
          const newProductoCount = contarProductos(updatedItems);
          return {
            items: updatedItems,
            subtotal: newSubtotal,
            totalImpuesto: newTotalImpuesto,
            total: newTotal,
            productoCount: newProductoCount,
          };
        });
      },

      resetState: () => set(initialState),

      addcantidadItem: (p) => {
        return set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id_producto === p.id_producto && item.cantidad > 0) {
              const updatedItem = { ...item, cantidad: item.cantidad + 1 };
              updatedItem.total = updatedItem.cantidad * updatedItem.precio_venta;
              return updatedItem;
            }
            return item;
          });
          const newTotal = updatedItems.reduce(
            (total, item) => total + item.precio_venta * item.cantidad,
            0
          );
          const newSubtotal = calcularSubtotal(newTotal);
          const newTotalImpuesto = calcularTotalImpuesto(newTotal, newSubtotal);
          const newProductoCount = contarProductos(updatedItems);
          return {
            items: updatedItems,
            subtotal: newSubtotal,
            totalImpuesto: newTotalImpuesto,
            total: newTotal,
            productoCount: newProductoCount,
          };
        });
      },

      restarcantidadItem: (p) => {
        return set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id_producto === p.id_producto && item.cantidad > 0) {
                const updatedQuantity = item.cantidad - 1;
                if (updatedQuantity === 0) {
                  return null;
                } else {
                  const updatedItem = { ...item, cantidad: updatedQuantity };
                  updatedItem.total = updatedItem.cantidad * updatedItem.precio_venta;
                  return updatedItem;
                }
              }
              return item;
            })
            .filter(Boolean);
          const newTotal = updatedItems.reduce(
            (total, item) => total + item.precio_venta * item.cantidad,
            0
          );
          const newSubtotal = calcularSubtotal(newTotal);
          const newTotalImpuesto = calcularTotalImpuesto(newTotal, newSubtotal);
          const newProductoCount = contarProductos(updatedItems);
          return {
            items: updatedItems,
            subtotal: newSubtotal,
            totalImpuesto: newTotalImpuesto,
            total: newTotal,
            productoCount: newProductoCount,
          };
        });
      },

      calcularvuelto: (p) => {
        return set((state) => {
          if (p.efectivo.trim() === "") {
            p.efectivo = state.total;
          }
          const resultvuelto = p.efectivo - state.total;
          return { vuelto: resultvuelto };
        });
      },

      setStatePantallaCobro: (p) => {
        return set((state) => {
          if (state.items.length === 0) {
            toast.warning('Agrega productos, no seas puerco');
            return { state };
          } else {
            return {
              statePantallaCobro: !state.statePantallaCobro,
              tipopago: p.tipopago,
            };
          }
        });
      },
    }),
    {
      name: "cart-ventas-storage",
    }
  )
);
