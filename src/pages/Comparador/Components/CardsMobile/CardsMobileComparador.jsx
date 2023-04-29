import React, { useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import style from "./cardMobile.module.css";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import Pincon from "../Card/svg/PinIcon";
import { Divider } from "@mui/material";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { deleteColegio } from "../../../../redux/ComparadorActions";
import AcredComparador from "../drop/Acred";
import InfraComparador from "../drop/Infra";

import { motion } from "framer-motion";
export default function CardsMobileComparador() {
  const { arrColegios } = useSelector((state) => state.comparador);
  const [openSch, setOpenSch] = useState(false);
  const [openSection, setOpenSection] = useState({
    infra: false,
    afiliaciones: false,
    datosGenerales: false,
    MetodologiasNeuro: false,
  });
  const dispatch = useDispatch();
  const handlerDelete = (e, id) => {
    dispatch(deleteColegio({ id }));
  };
  const handleOpenList = () => {
    setOpenSch(!openSch);
  };

  return (
    <div className=" flex flex-col items-center  w-full ">
      {arrColegios?.map((c) => {
        return (
          <>
            <div className={style.containerCard}>
              {/* HEAD */}
              <div className={style.cardHead}>
                <img src={c.colegio.logo} alt={c.colegio.nombre_colegio} />
                <div className={style.cardHead_info}>
                  <p
                    style={{
                      fontWeight: "700",
                      color: "#0D263B",
                      fontSize: "1.6vh",
                    }}
                  >
                    {c.colegio.nombre_colegio}
                  </p>
                  <p>{c.colegio.Distrito?.nombre_distrito}</p>
                </div>
              </div>
              <CloseIcon
                sx={{ color: "#9999" }}
                onClick={(e) => handlerDelete(e, c.colegio.id)}
              />
            </div>
          </>
        );
      })}
      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            datosGenerales: !openSection.datosGenerales,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-2"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Datos generales
        </p>

        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>

      {/* div que se expande  dato g*/}
      {openSection.datosGenerales && (
        <div className="pt-10 w-full flex flex-col justify-center items-start">
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className="gap-2  w-full p-2 pl-2 flex flex-row  items-start  gap-7">
                    <div className="flex justify-center items-center flex-col ">
                      <img
                        className="w-[8vh] h-[8vh]"
                        src={c.colegio.logo}
                        alt={c.colegio.nombre_colegio}
                      />
                    </div>

                    <div className=" flex flex-col items-start justify-start min-w-[20vh]">
                      <div>
                        <p className="text-[1.8vh]   font-semibold text-[#0D263B]">
                          Direccion
                        </p>
                        <p className="text-[1.6vh] text-ellipsis overflow-hidden max-w-[20vh]">
                          {c.colegio.direccion}
                        </p>
                      </div>

                      <div className="flex flex-col pb-2  ">
                        <p className="text-[1.8vh] pb-2 font-semibold text-[#0D263B]">
                          Tipo de escuela
                        </p>
                        {c.colegio.Categoria?.map((ca) => {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "1vh",
                                  fontSize: "1.4vh",
                                  flexDirection: "row",
                                }}
                              >
                                <Pincon />
                                <p className="text-[1.5vh] ">
                                  {ca.nombre_categoria}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <p className="text-[1.8vh] font-semibold text-[#0D263B]">
                          Area
                        </p>
                        <p className="text-[1.6vh]">
                          {" "}
                          {c.colegio.area} {"m2"}
                        </p>
                        <p className="text-[1.8vh] font-semibold text-[#0D263B]">
                          Alumnos
                        </p>
                        <p className="text-[1.6vh] pb-10">
                          {c.colegio.numero_estudiantes} {"alumnos"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </motion.div>
        </div>
      )}

      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            MetodologiasNeuro: !openSection.MetodologiasNeuro,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-2"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Metodologías y Neurodiversidad
        </p>

        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>

      {/* div que se expande mn */}
      {openSection.MetodologiasNeuro && (
        <div className="pl-1  pt-10 flex flex-col items-start justify-start">
          <div>
            <div className="pl-2  pb-2 flex flex-row w-full justify-end items-end gap-10">
              {" "}
              <p className="text-[1.6vh] font-semibold text-[#0D263B ">
                Metodologias
              </p>
              <p className="text-[1.6vh] font-semibold text-[#0D263B ">
                Neurodiversidad
              </p>
            </div>
            <motion.div
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <div className=" w-full min-w-[5vh] flex flex-row  pb-5 items-start justify-between gap-[5vh]">
                      <img
                        className="w-[7vh] h-[7vh]"
                        src={c.colegio.logo}
                        alt={c.colegio.nombre_colegio}
                      />
                      <div className="">
                        {c.colegio.Metodos.length > 0 ? (
                          c.colegio.Metodos?.map((m) => {
                            return (
                              <>
                                <div
                                  key={m}
                                  style={{
                                    display: "flex",
                                    gap: "1vh",
                                    fontSize: "1.6vh",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Pincon />
                                  <p className="text-[1.6vh] ">
                                    {m.nombre_metodo}
                                  </p>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <div className="flex w-full items-center gap-1  pl-2 justify-start">
                            <DoDisturbIcon
                              sx={{ color: "#999999", width: "2vh" }}
                            />
                            <p className="text-[1.5vh]">Sin especificar</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex flex-start flex-col items-start">
                          {c.colegio.Dificultades.length > 0 ? (
                            c.colegio.Dificultades?.map((d) => {
                              return (
                                <>
                                  <div
                                    key={d}
                                    style={{
                                      display: "flex",
                                      gap: "1vh",
                                      fontSize: "1.6vh",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Pincon />
                                    <p className="text-[1.6vh] text-ellipsis overflow-hidden max-w-[12vh] ">
                                      {d.nombre_dificultad}
                                    </p>
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <div className="flex w-full items-center gap-1  pl-2 justify-start">
                              <DoDisturbIcon
                                sx={{ color: "#999999", width: "2vh" }}
                              />
                              <p className="text-[1.5vh]">Sin Soporte</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            afiliaciones: !openSection.afiliaciones,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-2"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Afiliaciones
        </p>

        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>
      {/* div que se expande */}
      {openSection.afiliaciones && (
        <div className="pt-10 flex flex-col items-start justify-start">
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className="  w-full min-w-[5vh] flex flex-row  pb-5 items-start justify-between gap-[5vh]">
                      <img
                        className="w-[7vh] h-[7vh]"
                        src={c.colegio.logo}
                        alt={c.colegio.nombre_colegio}
                      />
                      <div
                        className={`${style.div} max-h-[20vh] min-w-[25vh]   items-start justify-start  `}
                      >
                        <AcredComparador
                          ids={c.colegio.id}
                          nameColegio={c.colegio.nombre_colegio}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </motion.div>
        </div>
      )}
      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            infra: !openSection.infra,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-2"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Infraestructura
          <KeyboardArrowDownTwoToneIcon
            onClick={handleOpenList}
            sx={{ color: "#0D263B" }}
          />
        </p>
      </div>

      {openSection.infra && (
        <div className="pt-10 flex flex-col items-start justify-start">
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className="  w-full min-w-[5vh] flex flex-row  pb-5 items-start justify-between gap-[5vh]">
                      <img
                        className="w-[7vh] h-[7vh]"
                        src={c.colegio.logo}
                        alt={c.colegio.nombre_colegio}
                      />
                      <div
                        className={`${style.div} max-h-[50vh] min-w-[25vh]   items-start justify-start  `}
                      >
                        <InfraComparador comparador id={c.colegio.id} />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </motion.div>
        </div>
      )}
    </div>
  );
}
