import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
export function ItemCategoria({item}) {
  return (<Container>
    {
      item.icono
    }
<span>{item.nombre}</span>
  </Container>);
}
const Container =styled.div`
  display:flex;
 margin:10px;
 background-color:#fff;
 color:#E01E20;
 font-weight:650;
 padding:10px;
 gap:5px;
 border-radius:5px;
 &:hover{
  cursor: pointer;
 }
`