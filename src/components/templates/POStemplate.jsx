import styled from "styled-components";
import { categorias, productos } from "../../utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Btn1 } from "../moleculas/Btn1";
import { ItemCategoria } from "../moleculas/ItemCategoria";
import { ItemProductos } from "../moleculas/ItemProductos";
import { CartIcon } from "../moleculas/CartIcon";
import { CartView } from "../organismos/CartView";
import { useState } from "react";
import { DataUser } from "../organismos/DataUser";
import { useQuery } from "@tanstack/react-query";
import { useProductosStore } from "../../store/ProductosStore";
import { useCartVentasStore } from "../../store/CartVentasStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useAuthStore } from "../../store/AuthStore";
export function POStemplate() {
  const [stateCartView, setStateCartView] = useState(false);

  const { mostrarProductos } = useProductosStore();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["mostrar productos"],
    queryFn: mostrarProductos,
  });
  if (isLoading) {
    return <span>cargando productos...</span>;
  }
  if (isError) {
    return <span>error: {error.message}</span>;
  }
  return (
    <Container>
      {stateCartView && (
        <CartView setState={() => setStateCartView(!stateCartView)} />
      )}

      <ContentPage>
        <section className="area1">
          <CartIcon setState={() => setStateCartView(!stateCartView)} />
          <span className="titulo">LA TIA VENENO</span>
          <article>
            <DataUser />
          </article>
          <article className="contentCantegorias">
            {categorias.map((item, index) => {
              return <ItemCategoria index={index} item={item} />;
            })}
          </article>
        </section>
        <section className="area2">
          <ContentListProductos>
            {data.map((item, index) => {
              return <ItemProductos key={index} item={item} />;
            })}
          </ContentListProductos>
        </section>
      </ContentPage>
    </Container>
  );
}

const Container = styled.div``;
const ContentPage = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
  gap: 20px;
  .area1 {
    position: relative;
    gap: 20px;
    grid-area: area1;
    /* background-color: red; */
    padding: 15px;
    display: flex;
    flex-direction: column;

    .contentCantegorias {
      background-color: #e01e20;
      padding: 10px;
      justify-content: center;
      display: flex;
      border-radius: 10px;
    }
    .titulo {
      font-weight: 700;
      font-size: 3rem;
      align-self: center;
    }
  }
  .area2 {
    /* background-color: #380505; */
  }
`;
const ContentListProductos = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  padding: 14px;
`;
