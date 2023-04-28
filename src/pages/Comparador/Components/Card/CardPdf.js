import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import style from "./cardSch.module.css";
import SwComparador from "../Swipper/SwComparador";
import Pincon from "./svg/PinIcon";
import { useSelector } from "react-redux";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

export default function CardsSch() {
  const [rating, setRating] = React.useState(null);
  const { arrColegios } = useSelector((state) => state.comparador);
  console.log(arrColegios);

  return (
    <Document>
      <Page size='A4'>
         <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <View style={{ display: "flex", flexDirection: "column" }}>
        <View
          style={{
            paddingLeft: "15vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {arrColegios?.map((c) => {
            return (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1vh",
                    maxWidth: "35vh",
                  }}
                >
                  {/* HEAD */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingBottom: "1vh",
                      gap: "1vh",
                      minHeight: "12vh",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "(0px 10px 50px rgba(13, 38, 59, 0.1))",
                    }}
                  >
                       <Image src={c.colegio.logo} alt={c.colegio.nombre_colegio} />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0",
                        fontSize: "1.5vh",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          color: "#0D263B",
                          fontSize: "1.6vh",
                        }}
                      >
                        {c.colegio.nombre_colegio}
                      </Text>
                      <Text>{c.colegio.Distrito?.nombre_distrito}</Text>
                    </View>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </View>
    </View>
      </Page>
      
    </Document>
   
  );
}
{
  /* afili */
}
{
  /* <div className="flex flex-row items-start gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.7vh] text-[#0D263B]  font-semibold   ">
              Afiliaciones:
            </p>
          </div>
          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    {verMas && (
                      <div
                        className={`${style.div} max-h-[50vh] items-start justify-start  `}
                      >
                        <AcredComparador
                          ids={c.colegio.id}
                          nameColegio={c.colegio.nombre_colegio}
                        />
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div> */
}
{
  /* infras */
}
{
  /* <div className="flex flex-row items-start gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.7vh] text-[#0D263B] font-semibold ">
              Infraestructura:
            </p>
          </div>

          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    {verMas && (
                      <div
                        className={`${style.div} max-h-[50vh]  items-start justify-start  `}
                      >
                        <InfraComparador id={c.colegio.id} />
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        // </div> */
}

{
  /* dire */
}
// <div className="flex flex-row items-center gap-[4rem]">
//   <div className="min-w-[8vh] max-w-[8vh]">
//     <p className="text-[1.7vh] text-[#0D263B] font-semibold  ">
//       Dirección:
//     </p>
//   </div>
//   <div className={style.bodyCard}>
//     {arrColegios?.map((c) => {
//       return (
//         <>
//           <div className={style.containerCard}>
//             <div className={style.div}>
//               <p className="flex text-[1.5vh] max-w-[20vh]">
//                 {c.colegio.direccion}
//               </p>
//             </div>
//           </div>
//         </>
//       );
//     })}
//   </div>
// </div>
// {/* tipo esc */}
// <div className="flex flex-row items-center gap-[4rem]">
//   <div className="min-w-[8vh] max-w-[8vh]">
//     <p className="text-[1.7vh] text-[#0D263B] font-semibold  ">
//       Tipo de escuela:
//     </p>
//   </div>

//   <div className={style.bodyCard}>
//     {arrColegios?.map((c) => {
//       return (
//         <>
//           <div className={style.containerCard}>
//             <div className={style.div}>
//               {c.colegio.Categoria?.map((ca) => {
//                 return (
//                   <>
//                     <div
//                       style={{
//                         display: "flex",

//                         fontSize: "1.6vh",
//                         flexDirection: "row",
//                       }}
//                     >
//                       <Pincon />
//                       <p className="text-[1.6vh] ">
//                         {ca.nombre_categoria}
//                       </p>
//                     </div>
//                   </>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       );
//     })}
//   </div>
// </div>
// {/* cant. alum */}
// <div className="flex flex-row  items-center gap-[4rem]">
//   <div className="min-w-[8vh] max-w-[8vh]">
//     <p className="text-[1.7vh] text-[#0D263B] font-semibold">
//       Cant. Alumnos:
//     </p>
//   </div>

//   <div className={style.bodyCard}>
//     {arrColegios?.map((c) => {
//       return (
//         <>
//           <div className={style.containerCard}>
//             <div className={style.div}>
//               <p
//                 style={{
//                   fontSize: "1.6vh",
//                 }}
//               >
//                 {c.colegio.numero_estudiantes} {"alumnos"}
//               </p>
//             </div>
//           </div>
//         </>
//       );
//     })}
//   </div>
// </div>
// {/* area */}
// <div className="flex flex-row items-center gap-[4rem]">
//   <div className="min-w-[8vh] max-w-[8vh]">
//     <p className="text-[1.7vh] text-[#0D263B] font-semibold  ">Área:</p>
//   </div>
//   <div className={style.bodyCard}>
//     {arrColegios?.map((c) => {
//       return (
//         <>
//           <div className={style.containerCard}>
//             <div className={style.div}>
//               <p
//                 style={{
//                   fontSize: "1.6vh",
//                 }}
//               >
//                 {c.colegio.area} {"m2"}
//               </p>
//             </div>
//           </div>
//         </>
//       );
//     })}
//   </div>
// </div>
// {/*  Métodos Aprendizaje  */}
// <div className="flex flex-row items-start gap-[3rem]">
//   <div className="min-w-[8vh] max-w-[10vh]">
//     <p className="text-[1.7vh] text-[#0D263B] font-semibold  ">
//       Métodos Aprendizaje
//     </p>
//   </div>
//   <div className={style.bodyCard}>
//     {arrColegios?.map((c) => {
//       return (
//         <>
//           <div className={style.containerCard}>
//             <div className={style.div}>
//               {c.colegio.Metodos.length > 0 ? (
//                 c.colegio.Metodos?.map((m) => {
//                   return (
//                     <>
//                       <div
//                         key={m}
//                         style={{
//                           display: "flex",
//                           gap: "1vh",
//                           fontSize: "1.6vh",
//                           flexDirection: "row",
//                         }}
//                       >
//                         <Pincon />
//                         <p className="text-[1.6vh] ">{m}</p>
//                       </div>
//                     </>
//                   );
//                 })
//               ) : (
//                 <div className="flex w-full items-center gap-1  pl-2 justify-start">
//                   <DoDisturbIcon
//                     sx={{ color: "#999999", width: "2vh" }}
//                   />
//                   <p className="text-[1.5vh]">Sin especificar</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       );
//     })}
//   </div>
// </div>
// {/* neuro */}
// <div className="flex flex-row items-center gap-[4rem]">
//   <div className="min-w-[8vh] max-w-[8vh]">
//     <p className="text-[1.7vh] text-[#0D263B] font-semibold  ">
//       Neurodiversidad:
//     </p>
//   </div>

//   <div className={style.bodyCard}>
//     {arrColegios?.map((c) => {
//       return (
//         <>
//           <div className={style.containerCard}>
//             <div className={style.div}>
//               {c.colegio.Dificultades.length > 0 ? (
//                 c.colegio.Dificultades?.map((d) => {
//                   return (
//                     <>
//                       <div
//                         key={d}
//                         style={{
//                           display: "flex",
//                           gap: "1vh",
//                           fontSize: "1.6vh",
//                           flexDirection: "row",
//                         }}
//                       >
//                         <Pincon />
//                         <p className="text-[1.6vh] ">{d}</p>
//                       </div>
//                     </>
//                   );
//                 })
//               ) : (
//                 <div className="flex w-full items-center gap-1  pl-2 justify-start">
//                   <DoDisturbIcon
//                     sx={{ color: "#999999", width: "2vh" }}
//                   />
//                   <p className="text-[1.5vh]">Sin Soporte</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       );
//     })}
//   </div>
// </div>
