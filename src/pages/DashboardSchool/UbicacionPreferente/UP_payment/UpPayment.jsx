import React from "react";
import { Modal, Box, Button, Card, Typography } from "@mui/material";
import style from "./Up_payment.module.css";
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

export default function UpPayment({ open, handlerClose }) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handlerClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styles}>
        {/*     font-size: 2.2vh;
    color: #0061df;
    font-weight: 600;
    padding-bottom: 2vh; */}
        <main>
          <body>
            {/* Detalles de compra */}
            <div className="flex flex-col p-5">
           
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
              {/* Detalles de plan seleccionado */}
              
          </body>
        </main>
      </Box>
    </Modal>
  );
}
