import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import style from "./FormLogin.module.css";
import Logo from "../../assets/logoPayment.png";
import FB from "./svg/FB";
import { login } from "../../redux/AuthActions";
import Gmail from "./svg/Gmail";
import { useDispatch } from "react-redux";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RecoveryContext } from "../LoginDistributor/LoginDistributor";
import axios from "axios";
import SwalProp from "../../exports/SwalProp";


export default function FormLogin({ handlerClose, OpenLogin, setOpenLogin }) {
 
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext)
  const dispatch = useDispatch();

  const ToggleSeePass = () => {
    setseePassword(!seePassword);
  };
  const [seePassword, setseePassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onChange",
  });

  const OnSubmit = async (user) => {
    dispatch(login(user));
  };

  const otpHandler = (data) => {
    if (data) {
      const otp = Math.floor(Math.random() * 9000 + 1000);
      console.log(otp);
      setOTP(otp);
      setEmail(data)

      axios
        .post("http://localhost:3001/auth/recovery", {
         mail: data,
         otp,
        })
        .then((res) => {
            if (res.data == "usuario inexistente"){
              SwalProp({
                status: false,
                title: "Ups!...",
                text: "No existe usuario registrado con ese correo",
              });
            }
            else{ setPage("otp")} })
        
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err.response.data.error,
          });
        } );
      return;
    }
    SwalProp({
      status: false,
      title: "Ups!...",
      text: "Debes ingresar tu correo para recuperar la contraseña",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)} className={style.Form}>
        <div className={style.img_div}>
          <img src={Logo} />
        </div>
        <input
          placeholder="Correo Electrónico"
          {...register("email", {
            required: true,
            maxLength: 100,
          })}
          className="shadow-md"
        />
        {errors.email?.type === "required" && (
          <p className={style.p}>Campo requerido</p>
        )}

        <div className={style.DivPass}>
          {seePassword === true ? (
            <BsEye onClick={ToggleSeePass} className={style.Password} />
          ) : (
            <BsEyeSlash onClick={ToggleSeePass} className={style.Password} />
          )}

          <input
            placeholder="Contraseña"
            type={seePassword === true ? "text" : "password"}
            {...register("password", {
              required: true,
              maxLength: 100,
            })}
            className="shadow-md"
          />
        </div>
        <button className="hover:shadow-lg shadow-black duration-300">
          INGRESAR
        </button>
      </form>
      <div className="text-center mb-3">
        <p  className="  text-base">¿Has olvidado tu contraseña?</p>
        <p  onClick={()=> otpHandler(getValues("email"))} 
        className="text-[#0061dd] text-sm  cursor-pointer" >Recuperar contraseña</p>
      </div>
      
      <div className={style.socialMedia}>
        <p className="  text-base">Prefiero iniciar sesion con:</p>
        <div
          style={{
            display: "flex",
            gap: "2vh",
            padding: "1vh",
            alignItems: "center",
          }}
        >
          <FB />
          <Gmail />
        </div>
      </div>
      <div className="text-center mb-3  p-2">
        <p className="  text-base">¿No tienes una cuenta?</p>
        <p
          className="text-[#0061dd] text-sm  cursor-pointer"
          onClick={() => setOpenLogin(!OpenLogin)}
        >
          Registrate Aqui
        </p>
      </div>
    </>
  );
}
