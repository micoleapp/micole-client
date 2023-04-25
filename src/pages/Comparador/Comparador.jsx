import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDataSchools } from "../../redux/ComparadorActions";
import CardsSch from "./Components/Card/CardsSch";
import style from "./compa.module.css";
import { useState } from "react";
export default function Comparador() {
  const dispatch = useDispatch();
  const [Vermas, setVermas] = useState(false)

  //   const handler = () => {
  //     dispatch(getDataSchools({ colegio }));
  //   };
  return (
    <>
      <div className="min-h-screen">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "5vh",

            // paddingBottom: "2vh",
          }}
        >
          <Button
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "0D263B",
              fontSize: "1.5vh",
            }}
            variant="contained"
          >
            Descargar comparación
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "10vh",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "0D263B",
              fontSize: "2.5vh",
            }}
          >
            Comparador de Colegios
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            gap: "3vh",
            alignItems: "flex-end",
            justifyContent:'center'
            
          }}
        >
          <div className={style.divP}>
            <div className={`${style.divTabla} justify-end items-end`}>
              <p>Dirección:</p>
            </div>
            <div   className={`${style.divTabla} justify-center items-center`}>
              <p>Tipo de escuela:</p>
            </div>
            <div className={`${style.divTabla} justify-center flex-col gap-2`}>
              <p>Cant. Alumnos:</p>
              <p>Área:</p>
            </div>
           

            <div className={style.divTabla}>
              <p>Métodos de Aprendizaje:</p>
            </div>
            <div className={style.divTabla}>
              <p>Neurodiversidad:</p>
            </div>
               {/* { Vermas === false &&<p>Ver mas</p>} */}
           {Vermas&&
           <>
            <div className={style.divTabla}>
              <p>Infraestructura:</p>

            </div>
            <div className={style.divTabla}>
              <p>Afiliaciones:</p>
            </div>
           </>
          }
           <div className={style.divTabla}>
             
             </div>
            {/* <p>Acreditaciones:</p> */}
          </div>
          <CardsSch  verMas={Vermas} setVermas={setVermas}/>
        </div>
      </div>
    </>
  );
}
