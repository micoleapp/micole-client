import React, { useEffect, useState } from "react";
import style from "./ModalInscripcion.module.css";
import CloseButton from "./svg/CloseButton";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import Terms from "../Terms/Terms"
import Payment from "../FormPayment/Payment";
import FormLogin from "../FormLogin/FormLogin";
import { useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: '80%',
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 1,
  maxHeight: "90vh",
  overflowY: "scroll",
  gap: "2vh",
};
export default function ModalInscripcion({
  handleClose,
  switchLoginOrRegister,
  handleClosePayment,
  OpenPaymentPLan,
  Miplan,
}) {
  const { isAuth, success } = useSelector((state) => state.auth);
 
  const [OpenRegister, setOpenRegister] = useState(switchLoginOrRegister);
  const [OpenLogin, setOpenLogin] = useState(true);
  const [Openterms, setOpenTerms]  = useState(false);

  console.log(OpenRegister)

  const toggleClose = () => {
    handleClose(false);
    handleClosePayment(false);
    // handleClosePayment({
    //   ...OpenPaymentPLan,
    //   state: false,
    //   price: 0,
    //   plan: "",
    // });
  };

  

  return (
      
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styles}>
        <div className={style.DivCloseButton}>
          <div onClick={toggleClose}>
            <CloseButton />
          </div>
        </div>
       
        {OpenLogin === true && isAuth === false && OpenRegister === false && Openterms === false && (
          <FormLogin handlerOpenLogin={setOpenRegister} OpenRegister={OpenRegister}  handleClose={handleClose}/>)}
       
        {OpenLogin === true && OpenRegister === true && Openterms === true && (
          <Terms handlerOpenLogin={setOpenLogin} setOpenTerms={setOpenTerms} />)}
       
        {OpenLogin === true && isAuth === false && OpenRegister === true && Openterms === false && (
          <FormInscripcion handlerOpenLogin={setOpenRegister} OpenRegister={OpenRegister}  />
        )}
        <div>
        {isAuth === true  && Openterms === false && (
            <Payment
              plan={OpenPaymentPLan?.plan}
              price={OpenPaymentPLan?.price}
              handleClose={toggleClose}
              Miplan={Miplan}
            />
          )}
          {OpenLogin === true && Openterms === false && OpenRegister === true && (
           
           
           <div className="flex items-center justify-center">
             
              <p className="text-sm text-[1.5vh] text-center">
                Al adquirir nuestros planes estás aceptando los{" "}
                <Link onClick={() => setOpenTerms(true)} className="text-[#0061dd] hover:underline">
                  Términos y Condiciones de Uso y la Política de Privacidad
                </Link>
              </p>
            </div>
          )}

          {OpenLogin === true && Openterms === true && OpenRegister === true && (
              <div className={style.divButton}>
          <button onClick={() => {setOpenTerms(false)}}>ENTENDIDO</button>
         
        </div>
          )}
        </div>
        
        {/* </div> */}
      </Box>
    </Modal>
  );
}
