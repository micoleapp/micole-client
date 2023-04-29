import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import style from "./cardSch.module.css";
import SwComparador from "../Swipper/SwComparador";
import Pincon from "./svg/PinIcon";
import { useSelector } from "react-redux";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const ComparacionPdf = ({ arrColegios }) => (
  // const [rating, setRating] = React.useState(null);
  // const { arrColegios } = useSelector((state) => state.comparador);
  // console.log(arrColegios);

  <Document>
    <Page>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "flex-start",
          width: "100%",
        }}
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

                      // padding: "1vh",
                      // maxWidth: "35vh",
                    }}
                  >
                    {/* HEAD */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: "1vh",
                        gap: "1vh",
                        // minHeight: "12vh",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "(0px 10px 50px rgba(13, 38, 59, 0.1))",
                      }}
                    >
                      <Image
                        style={{ height: "8vh", width: "8vh" }}
                        src={c.colegio.logo}
                        alt={c.colegio.nombre_colegio}
                      />
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cener",
              gap: "4rem",
            }}
            // className="flex flex-row items-center gap-[4rem]"
          >
            <View style={{ minWidth: "8vh", maxWidth: "8vh" }}>
              <Text
                style={{
                  fontSize: "1.7vh",
                  color: "#0D263B",
                  fontWeight: "600",
                }}
                // className="text-[1.7vh] text-[#0D263B] font-semibold  "
              >
                Dirección:
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}

              // className={style.bodyCard}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "35vh",
                        padding: "1vh",
                      }}
                      // className={style.containerCard}
                    >
                      <View
                        style={{
                          height: "100%",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "1.8vh",
                        }}
                        // style={{ height:'100%', overflowY:'scroll', display:'flex',justifyContent:'center', flexDirection:'column', fontSize:'1.8vh'}}
                      >
                        <Text className="flex text-[1.5vh] max-w-[20vh]">
                          {c.colegio.direccion}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cener",
              gap: "4rem",
            }}
          >
            <View
              style={{ minWidth: "8vh", maxWidth: "8vh" }}
              // className="min-w-[8vh] max-w-[8vh]"
            >
              <Text
                style={{
                  fontSize: "1.7vh",
                  color: "#0D263B",
                  fontWeight: "600",
                }}
              >
                Tipo de escuela:
              </Text>
            </View>

            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "35vh",
                        padding: "1vh",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "1.8vh",
                        }}
                      >
                        {c.colegio.Categoria?.map((ca) => {
                          return (
                            <>
                              <View
                                style={{
                                  display: "flex",

                                  fontSize: "1.6vh",
                                  flexDirection: "row",
                                }}
                              >
                                <Pincon />
                                <Text className="text-[1.6vh] ">
                                  {ca.nombre_categoria}
                                </Text>
                              </View>
                            </>
                          );
                        })}
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cener",
              gap: "4rem",
            }}
          >
            <View style={{ minWidth: "8vh", maxWidth: "8vh" }}>
              <Text
                style={{
                  fontSize: "1.7vh",
                  color: "#0D263B",
                  fontWeight: "600",
                }}
              >
                Cant. Alumnos:
              </Text>
            </View>

            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "35vh",
                        padding: "1vh",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "1.8vh",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "1.6vh",
                          }}
                        >
                          {c.colegio.numero_estudiantes} {"alumnos"}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cener",
              gap: "4rem",
            }}
          >
            <View style={{ minWidth: "8vh", maxWidth: "8vh" }}>
              <Text
                style={{
                  fontSize: "1.7vh",
                  color: "#0D263B",
                  fontWeight: "600",
                }}
              >
                Área:
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "35vh",
                        padding: "1vh",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "1.8vh",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "1.6vh",
                          }}
                        >
                          {c.colegio.area} {"m2"}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cener",
              gap: "3rem",
            }}
          >
            <View style={{ minWidth: "8vh", maxWidth: "10vh" }}>
              <Text
                style={{
                  fontSize: "1.7vh",
                  color: "#0D263B",
                  fontWeight: "600",
                }}
              >
                Métodos Aprendizaje
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "35vh",
                        padding: "1vh",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "1.8vh",
                        }}
                      >
                        {c.colegio.Metodos.length > 0 ? (
                          c.colegio.Metodos?.map((m) => {
                            return (
                              <>
                                <View
                                  key={m}
                                  style={{
                                    display: "flex",
                                    gap: "1vh",
                                    fontSize: "1.6vh",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Pincon />
                                  <p style={{ fontSize: "1.6vh" }}>
                                    {m.nombre_metodo}
                                  </p>
                                </View>
                              </>
                            );
                          })
                        ) : (
                          <View className="flex w-full items-center gap-1  pl-2 justify-start">
                            <DoDisturbIcon
                              sx={{ color: "#999999", width: "2vh" }}
                            />
                            <p className="text-[1.5vh]">Sin especificar</p>
                          </View>
                        )}
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cener",
              gap: "4rem",
            }}
          >
            <View style={{ minWidth: "8vh", maxWidth: "8vh" }}>
              <Text
                style={{
                  fontSize: "1.7vh",
                  color: "#0D263B",
                  fontWeight: "600",
                }}
              >
                NeuroViewersidad:
              </Text>
            </View>

            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {arrColegios?.map((c) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "35vh",
                        padding: "1vh",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "1.8vh",
                        }}
                      >
                        {c.colegio.Dificultades.length > 0 ? (
                          c.colegio.Dificultades?.map((d) => {
                            return (
                              <>
                                <View
                                  key={d}
                                  style={{
                                    display: "flex",
                                    gap: "1vh",
                                    fontSize: "1.6vh",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Pincon />
                                  <Text className="text-[1.6vh] ">
                                    {d.nombre_dificultad}
                                  </Text>
                                </View>
                              </>
                            );
                          })
                        ) : (
                          <View
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1vh",
                              paddingLeft: "1vh",
                              justifyContent: "flex-start",
                            }}
                            // className="flex w-full items-center gap-1  pl-2 justify-start"
                          >
                            <DoDisturbIcon
                              sx={{ color: "#999999", width: "2vh" }}
                            />
                            <Text style={{ fontSize: "1.5vh" }}>
                              Sin Soporte
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ComparacionPdf;
