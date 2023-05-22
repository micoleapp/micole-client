import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RecoveryContext} from "../LoginDistributor/LoginDistributor";
import style from "../ResetPassword/ResetPassword.module.css"
import  Logo  from "../../assets/logoPayment.png"
import axios from "axios";
import SwalProp from "../../exports/SwalProp";
import { login } from "../../redux/AuthActions";
import { useDispatch } from "react-redux";


export default function ResetPassword() {
  const { setPage, email } = useContext(RecoveryContext);
  const dispatch = useDispatch();
  function changePassword() {
    
  }
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
    mode: "onChange",
  });
  

  const OnSubmit = async (user) => {
    if (user.password !== user.repeatPassword) {
      SwalProp({
        status: false,
        title: "Ups!...",
        text: "Las nuevas contraseñas no coinciden",
      });

      return;
    }
  
    const data = {
      mail: email,
      password: user.password,
     
    };
    try {
      axios
        .post(`/auth/reset`, data)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text: "Datos actualizados!",
          });
        }).then((res) => {
          dispatch(login({
            email:data.mail,
            password: data.password
          }))
        })
         .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err.response.data.error,
          });
        });
    } catch (error) {
      SwalProp({
        status: false,
        title: "Algo salió mal",
        text: error.response,
      });
    }
  };







 
  
  return (
    <>
    <form onSubmit={handleSubmit(OnSubmit)}  className={style.Form}>
      <div className={style.img_div}>
        <img src={Logo} />
        <div className={style.DivPass}>
         

          <input
            placeholder="Nueva contraseña"
           
            {...register("password", {
              required: true,
              maxLength: 100,
            })}
            className="shadow-md"
          />

       {errors.password?.type === "required" && (
          <p className={style.p}>Campo requerido</p>
        )}

        </div>
        <div className={style.DivPass}>
        

          <input
            placeholder="Repetir nueva contraseña"
            
            {...register("repeatPassword", {
              required: true,
              maxLength: 100,
            })}
            className="shadow-md"
          />
           {errors.repeatPassword?.type === "required" && (
          <p className={style.p}>Campo requerido</p>
        )}
        </div>
        <button   className="hover:shadow-lg shadow-black duration-300">
                    CAMBIAR CONTRASEÑA
                </button>
       
      </div>
      
      
      
     
    </form>
   
    
    
    
  </>
  );
}