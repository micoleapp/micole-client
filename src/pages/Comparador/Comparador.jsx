import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDataSchools } from "../../redux/ComparadorActions";
import CardsSch from "./Components/Card/CardsSch";
import style from "./compa.module.css";
export default function Comparador() {
  const dispatch = useDispatch();

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
                justifyContent: 'flex-end',
                paddingRight:'5vh'
                
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
            sx={{ fontFamily: "Poppins", fontWeight: "600", color: "0D263B",  fontSize: "2.5vh" }}
          >
            Comparador de Colegios
          </Typography>
         
    
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "4vh",
          }}
          // className={style.layout}
        >
         
          <CardsSch />
        </div>
      </div>
    </>
  );
}
