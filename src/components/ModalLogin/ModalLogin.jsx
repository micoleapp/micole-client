import React, { useEffect, useState } from "react";
import FormLogin from "../FormLogin/FormLogin";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import style from "./ModaLogin.module.css";
import CloseButton from "../ModalInscripcion/svg/CloseButton";
import { useSelector } from "react-redux";
import Logo from "../../assets/logoPayment.png";
import { Link } from "react-router-dom";
import Terms from "../Terms/Terms"

export default function ModalLogin({ handlerClose }) {
  const { isAuth } = useSelector((state) => state.auth);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [Openterms, setOpenTerms]  = useState(false);
  const toggleClose = () => {
    handlerClose(false);
  };

  useEffect(() => {
    if(isAuth){
      handlerClose(false)
    }
  },[isAuth]);

  return (
    <div  className={style.Overlay}>
      <div>
        <div data-aos="fade-down" data-aos-mirror={false} className={`${style.contenedorModal}`}>
          <div className={style.DivCloseButton}>
            <div style={{ cursor: "pointer" }} onClick={toggleClose}>
              <CloseButton />
            </div>
          </div>
          {Openterms && (<><Terms></Terms></>)}
     {OpenLogin && Openterms === false && <FormInscripcion handlerOpenLogin={setOpenLogin} OpenLogin={OpenLogin} /> }
     {OpenLogin === false && Openterms === false && <FormLogin OpenLogin={OpenLogin} setOpenLogin={setOpenLogin} handlerClose={handlerClose} /> }
     {OpenLogin && Openterms === false && <div className="flex items-center justify-center">
               <p className="text-sm text-[1.5vh] text-center mb-2">
               Al adquirir nuestros planes estás aceptando los{" "}
               <Link onClick={() => setOpenTerms(true)} className="text-[#0061dd] hover:underline">
                 Términos y Condiciones de Uso y la Política de Privacidad
               </Link>
             </p>
           </div>
           
          }
      {Openterms ? <div className={style.divButton}>
          <button onClick={() => {setOpenTerms(false)}}>ENTENDIDO</button>
         
        </div>:null}  


     
        </div>
      </div>
    </div>
  );
}
