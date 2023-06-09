import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import style from "./cardSch.module.css";
import SwComparador from "../Swipper/SwComparador";
import Pincon from "./svg/PinIcon";
import { useSelector } from "react-redux";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import AcredComparador from "../drop/Acred";
import InfraComparador from "../drop/Infra";
import CloseIcon from "@mui/icons-material/Close";
import { deleteColegio } from "../../../../redux/ComparadorActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function CardsSch({ verMas, setVermas }) {
  const { arrColegios } = useSelector((state) => state.comparador);

  const hanlderVermas = () => {
    setVermas(!verMas);
  };

  const dispatch = useDispatch();
  const handlerDelete = (e, id) => {
    dispatch(deleteColegio({ id }));
  };
  return (
    //                className={`${style.div} max-h-[50vh] items-start justify-start  `}
    <div className=" flex flex-col items-center ">
      <div className="flex flex-col">
        <div className="pl-[15vh]  max-w-fit flex flex-end flex-row">
          {arrColegios?.map((c) => {
            return (
              <>
                <div className={style.containerCard}>
                  {/* HEAD */}
                  <div className={style.cardHead}>
                    <img
                      src={
                        c.colegio.logo === null
                          ? "https://res.cloudinary.com/dvztuncle/image/upload/v1682798271/3256151_zdcs0j.png"
                          : c.colegio.logo
                      }
                      alt={c.colegio.nombre_colegio}
                    />
                    <div className={style.cardHead_info}>
                      <p className="font-semibold text-[2vh]  text-[#0D263B]  ">
                        {c.colegio.nombre_colegio}
                      </p>
                      <p>{c.colegio.Distrito?.nombre_distrito}</p>
                      <div className="drop-shadow-md">
                        <Rating
                          name="simple-controlled"
                          value={c.colegio.rating / 2}
                          readOnly
                          max={5}
                        />
                      </div>
                    </div>
                    <CloseIcon
                      sx={{ color: "#9999" }}
                      onClick={(e) => handlerDelete(e, c.colegio.id)}
                    />
                  </div>
                  <div>
                    {/* SW*/}
                    <div className={style.SW}>
                      <SwComparador
                        galeria={c.colegio?.galeria_fotos}
                        primeraFoto={c.colegio?.primera_imagen}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex flex-row items-center gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.9vh] text-[#0D263B] font-semibold  ">
              Dirección:
            </p>
          </div>
          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className={style.div}>
                      <p className="flex text-[1.7vh] max-w-[20vh]">
                        {c.colegio.direccion}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.9vh] text-[#0D263B] font-semibold  ">
              Tipo de escuela:
            </p>
          </div>

          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className={style.div}>
                      {c.colegio.Categoria?.map((ca) => {
                        return (
                          <>
                            <div
                              style={{
                                display: "flex",

                                fontSize: "1.6vh",
                                flexDirection: "row",
                              }}
                            >
                              <Pincon />
                              <p className="text-[1.7vh] ">
                                {ca.nombre_categoria}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row  items-center gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.9vh] text-[#0D263B] font-semibold">
              Cant. Alumnos:
            </p>
          </div>

          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className={style.div}>
                      <p
                        style={{
                          fontSize: "1.7vh",
                        }}
                      >
                        {c.colegio.numero_estudiantes} {"alumnos"}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.9vh] text-[#0D263B] font-semibold  ">Área:</p>
          </div>
          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className={style.div}>
                      <p
                        style={{
                          fontSize: "1.7vh",
                        }}
                      >
                        {c.colegio.area} {"m2"}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-start gap-[3rem]">
          <div className="min-w-[8vh] max-w-[10vh]">
            <p className="text-[1.9vh] text-[#0D263B] font-semibold  ">
              Métodos Aprendizaje
            </p>
          </div>
          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className={style.div}>
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
                                <p className="text-[1.7vh] ">
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
                          <p className="text-[1.7vh]">Sin especificar</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center gap-[4rem]">
          <div className="min-w-[8vh] max-w-[8vh]">
            <p className="text-[1.9vh] text-[#0D263B] font-semibold  ">
              Neurodiversidad:
            </p>
          </div>

          <div className={style.bodyCard}>
            {arrColegios?.map((c) => {
              return (
                <>
                  <div className={style.containerCard}>
                    <div className={style.div}>
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
                                <p className="text-[1.7vh] ">
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
                          <p className="text-[1.7vh]">Sin Soporte</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {verMas === false && (
          <div
            onClick={hanlderVermas}
            className="pt-2 flex flex-row items-center justify-center gap-12"
          >
            <p className="text-[2vh] text-[#0061DF] font-semibold   ">
              Ver mas
            </p>
          </div>
        )}

        {verMas && (
          <div
            onClick={hanlderVermas}
            className="flex flex-row items-center justify-center gap-12"
          >
            <p className="text-[2vh] text-[#0061DF] font-semibold   ">
              Ver menos
            </p>
          </div>
        )}
        {verMas && (
          <div className="flex flex-row items-start gap-[4rem]">
            <div className="min-w-[8vh] max-w-[8vh]">
              <p className="text-[1.9vh] text-[#0D263B]  font-semibold   ">
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
          </div>
        )}
        {verMas && (
          <div className="flex flex-row items-start gap-[4rem]">
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
          </div>
        )}

        <div className=" pl-20 flex flex-row gap-40 w-full items-end justify-center pt-10 ">
          {arrColegios?.map((c) => {
            return (
              <>
                {/* /schooldetail/5e684c3b-2146-4cbf-85e3-32b776e680cf?grado=2&ingreso=2023&lista=false */}

                <div className="w-full flex flex-row  max-w-[20vh] bg-[#0061df] rounded-md px-3 py-2 items-center justify-center">
                  <a
                    target="_blank"
                    className="text-white text-[1.8vh]  bg-[#0061df]  px-3 "
                    href={`/#/schooldetail/${c.colegio.id}?grado=2&ingreso=2023&lista=false`}
                  >
                    Ver Colegio
                  </a>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
