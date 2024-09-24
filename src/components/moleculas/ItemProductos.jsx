import styled from "styled-components";
import { Btn1 } from "./Btn1";
import {useCartVentasStore} from "../../store/CartVentasStore"
export function ItemProductos({ item }) {
  const {addItem} = useCartVentasStore()
  
  return (
    <Container>
      <img  src={item.imagen}/>
      <span className="nombre">{item.name}</span>
      <span className="precio">{item.price}</span>
      <section className="contentCart">
        
        <Btn1 bgcolor="#e01e20" color="#fff" titulo="add cart" funcion={()=>{
           const p ={
            id_venta: 1,
            cantidad: 1,
            precio_venta: item.price,
            total: 1 * item.price,
            descripcion: item.name,
            id_producto: item.id,
            imagen:item.imagen
          }
          addItem(p)
        }}/>
      </section>
    </Container>
  );
}
const Container = styled.div`
  
  border: 1px solid #dfdfdf;
  border-radius: 8px;
 
  padding: 20px;
  margin: 0;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
  gap:20px;
  .nombre{
    font-weight:590;
    font-size:18px;
  }
  .precio{
    color:#e01e20;
    font-weight:570;
  }
  .contentCart{
    display:flex;
    justify-content:center;
    height:100%;
    width:100%;
    align-items:center;
  }
  img {
    width: 100px;
  }
`;
