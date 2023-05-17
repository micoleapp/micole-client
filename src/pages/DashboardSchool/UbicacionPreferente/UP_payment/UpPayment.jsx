import React, { useState } from "react";
import { Modal, Box, Button, Card, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import style from "./Up_payment.module.css";
import MaterialCheckBox from "@mui/material/Checkbox";
import Visa from "../../../../components/FormPayment/svg/Visa";
import ImageMG from "../../../../components/FormPayment/svg/infoMG.png";
import MasterCard from "../../../../components/FormPayment/svg/MasterCard";
import Union from "../../../../components/FormPayment/svg/Union";
import Paypal from "../../../../components/FormPayment/svg/Paypal";
import MercadoPagoLogo from "../../../../assets/mercado-pago-logo-.png";
import YapeLogo from "../../../../components/FormPayment/svg/yape.png";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // minWidth: '80%',
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 1,
  maxHeight: "90vh",
  overflowY: "scroll",
  gap: "2vh",
};

export default function UpPayment({ open, handlerClose }) {
  const { user } = useSelector((state) => state.auth);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [buttonMp, setButtonMp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMp = (e) => {
    e.preventDefault();
    const data = {
      colegioId: user.id,
      email: user.email,
    };
    try {
      setIsLoading(true);
      axios
        .post("/payments", data)
        .then((res) => {
          setButtonMp(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleYape = (e) => {
    e.preventDefault();
    handlerClose();
    const data = {
      colegioId: user.id,
      planPagoId,
      cantidad: months,
      email: user.email,
    };

    Swal.fire({
      imageUrl:
        "https://c7.alamy.com/compes/j54064/ejemplo-de-codigo-qr-en-la-forma-de-una-cara-sonriente-aislado-sobre-fondo-blanco-j54064.jpg",
      imageWidth: 300,
      imageHeight: 300,
      title: "¡Escanea el QR!",
      text: "Al apretar OK, revise su correo y espere a que un asesor se ponga en contacto con usted.",
    });
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handlerClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styles}>
        <main>
          <body className="flex flex-row gap-2">
            {/* Detalles de compra y  Metodos de pago */}
            <div className="flex flex-col p-5 gap-10">
              {/* Beneficios del plan (solo aparece en el mobile) */}
              <div className={style.responsiveBtnMobile}>
                <div className="flex flex-col ">
                  <div className="flex flex-col text-[1.7vh] gap-4 ">
                    <h1 className="text-[2.2vh] text-[#0061df] font-semibold pb-2 min-w-[35vh] max-w-[35vh] ">
                      Información Detallada de Ubicación Preferente
                    </h1>
                    <p> ✔️ Tu anuncio aparece en las primeras ubicaciones</p>
                    <p>
                      {" "}
                      ✔️ Puedes renovar este beneficio la veces que quieras
                    </p>
                    <p> ✔️ Válido para planes a partir de básico.</p>
                    <p> ✔️Válido por 1 mes</p>
                  </div>

                
                </div>
              </div>

              {/* Detalles de compra */}
              <div className="flex flex-col ">
                <h1 className="text-[2.2vh] text-[#0061df] font-semibold pb-2">
                  Detalles de Compra
                </h1>
                <div>
                  <div className="flex flex-row w-full justify-between ">
                    <p>Plan Especial + IGV</p>
                    <p>S/ 20</p>
                  </div>
                  <div className="flex flex-row w-full justify-between">
                    <p>total</p>
                    <p>S/ 20</p>
                  </div>
                </div>
              </div>

              {/* Metodos de pago*/}
              <div className={style.containerMetodoPago}>
                <h1 className="text-[2.2vh] text-[#0061df] font-semibold pb-2">
                  Elige tu método de pago
                </h1>
                {/* MERCADO PAGO */}
                <div className={style.mercadoPago}>
                  <div
                    style={{
                      display: "flex",
                      fleDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCheckBox
                      name="paymentMethod"
                      type="checkbox"
                      checked={selectedMethod === "mercadoPago"}
                      onChange={() => setSelectedMethod("mercadoPago")}
                    />

                    <img
                      style={{ width: "90px", height: "30px" }}
                      src={MercadoPagoLogo}
                    />
                  </div>

                  <div className={style.tarjetas}>
                    <Visa />
                    <MasterCard />
                    <Union />
                    <Paypal />
                  </div>
                </div>
                <img style={{ width: "100%", height: "20vh" }} src={ImageMG} />
                {/* YAPE */}
                <div className={style.mercadoPago}>
                  <div
                    style={{
                      display: "flex",
                      fleDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCheckBox
                      name="paymentMethod"
                      type="checkbox"
                      checked={selectedMethod === "yape"}
                      onChange={() => {
                        setButtonMp(null);
                        setSelectedMethod("yape");
                      }}
                    />
                    <img
                      style={{
                        width: "40px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                      src={YapeLogo}
                    />
                    <small className="ml-5">
                      Se enviara un correo a tu email para continuar con el
                      proceso
                    </small>
                  </div>
                </div>

                <div className={style.responsiveBtnMobile}>
                  {buttonMp == null && selectedMethod === "mercadoPago" ? (
                    <div className={style.divButton}>
                      <button onClick={handleMp}>
                        {" "}
                        {isLoading ? (
                          <CircularProgress
                            size="1rem"
                            style={{ color: "#fff", marginTop: "5px" }}
                          />
                        ) : (
                          "GENERAR LINK DE PAGO"
                        )}
                      </button>
                    </div>
                  ) : buttonMp == null && selectedMethod === "yape" ? (
                    <div className={style.divButton}>
                      <button onClick={handleYape}>GENERAR QR</button>
                    </div>
                  ) : null}
                  {buttonMp && (
                    <div className="w-full flex  bg-[#0061df] rounded-md px-3 py-2 items-center justify-center">
                      <a
                        className="text-white bg-[#0061df]  px-3 "
                        href={buttonMp}
                        onClick={() => setButtonMp(null)}
                      >
                        PAGAR
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detalles de plan seleccionado */}
            <div className={style.responsiveBtnDesktop}>
              <div className="flex flex-col p-5">
                <div className="flex flex-col text-[1.7vh] gap-4 pb-20 ">
                  <h1 className="text-[2.2vh] text-[#0061df] font-semibold pb-2 max-w-[30vh] ">
                    Información Detallada de Ubicación Preferente
                  </h1>
                  <p> ✔️ Tu anuncio aparece en las primeras ubicaciones</p>
                  <p> ✔️ Puedes renovar este beneficio la veces que quieras</p>
                  <p> ✔️ Válido para planes a partir de básico.</p>
                  <p> ✔️Válido por 1 mes</p>
                </div>

                <div className={style.responsiveBtnDesktop}>
                  {buttonMp == null && selectedMethod === "mercadoPago" ? (
                    <div className={style.divButton}>
                      <button onClick={handleMp}>
                        {" "}
                        {isLoading ? (
                          <CircularProgress
                            size="1rem"
                            style={{ color: "#fff", marginTop: "5px" }}
                          />
                        ) : (
                          "GENERAR LINK DE PAGO"
                        )}
                      </button>
                    </div>
                  ) : buttonMp == null && selectedMethod === "yape" ? (
                    <div className={style.divButton}>
                      <button onClick={handleYape}>GENERAR QR</button>
                    </div>
                  ) : null}
                  {buttonMp && (
                    <div className="w-full flex  bg-[#0061df] rounded-md px-3 py-2 items-center justify-center">
                      <a
                        className="text-white bg-[#0061df]  px-3 "
                        href={buttonMp}
                        onClick={() => setButtonMp(null)}
                      >
                        PAGAR
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </body>
        </main>
      </Box>
    </Modal>
  );
}
