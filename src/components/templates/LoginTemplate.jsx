import styled from "styled-components";
import { InputText } from "../organismos/formularios/InputText";
import { useForm } from "react-hook-form";
import { Btn1, useAuthStore } from "../../index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CrearCuenta } from "../organismos/CrearCuenta";
import tiendalogo from "../../assets/gty.png";
export function LoginTemplate() {
  const navigate = useNavigate();
  const [stateCrear, setStateCrear] = useState(false);
  const { signInWithEmail } = useAuthStore();
  const [stateInicio, setStateInicio] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function iniciar(data) {
    const response = await signInWithEmail({
      email: data.correo,
      password: data.pass,
    });
    if (response) {
      navigate("/");
    } else {
      setStateInicio(!stateInicio);
    }
  }
  return (
    <Container>
      <section>
        {stateCrear===true && (
          <CrearCuenta setState={() => setStateCrear(!stateCrear)} />
        )}
      
        {stateCrear === false && (
          <>
            <form onSubmit={handleSubmit(iniciar)}>
              LOGIN
            <img src={tiendalogo} style={{ width: 80 }} />
            <InputText>
              <input
                className="form__field"
                onChange={(e) => setCorreo(e.target.value)}
                type="text"
                placeholder="email"
                {...register("correo", {
                  required: true,
                })}
              />
              <label className="form__label">email</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText>
              <input
                className="form__field"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="contraseña"
                {...register("pass", {
                  required: true,
                })}
              />
              <label className="form__label">pass</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <Btn1 titulo="Iniciar" />
          </form>
           <Btn1 titulo="Crear" funcion={() => setStateCrear(!stateCrear)} />
          </>
        
        )}
       
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100vh;
  section {
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
