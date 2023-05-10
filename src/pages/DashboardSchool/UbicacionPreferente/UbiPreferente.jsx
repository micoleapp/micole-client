import React from "react";
import Miplan from "../Miplan/Miplan";
import { Button, Card, Typography } from "@mui/material";
export default function UbiPreferente() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-[2.5vh] text-[#0D263B] font-semibold">
        Ubicación Preferente
      </h1>
      <div className="pt-5 ">
        <p className="text-[1.7vh] text-[#0D263B] font-semibold pb-2">
          Plan Actual
        </p>
        <Miplan UbiPreferente={true} />
      </div>

      <div className="pt-5">
        <h1 className=" text-[2.5vh] text-[#0D263B] font-semibold">
          ¡Deseo adquirir ubicación preferente para mi colegio!
        </h1>
        <p className="text-[1.7vh] text-[#0D263B] font-normal">
          Ubica tu colegio en un posición preferente, para destacar entre los
          demás anuncios.
        </p>
        <div className="pt-5 pb-2">
          <Button
            variant="contained"
            sx={{ fontWeight: "600", fontFamily: "Poppins", fontSize: "1.5vh" }}
          >
            Ir a Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
