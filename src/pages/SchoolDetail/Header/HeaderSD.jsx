import React from "react";
import { useSelector } from "react-redux";
import Compartir from "../CompartirEnRedes/Compartir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../SchoolD.module.css";
import {
    faUsers,
    faCalendar,
    faSchool,
  
  } from "@fortawesome/free-solid-svg-icons";

export default function HeaderSD({ingresoParams,currentVacante, url, nombre_grado }) {
  const { oneSchool } = useSelector((state) => state.schools);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* compartir en redes */}
      <Compartir url={url} />

      {/*nombre colegio */}
      <h1 className="pl-3 lg:pl-0 font-semibold m-0  text-[#0D263B] text-[3.2vh]">
        {oneSchool.nombre_colegio}
      </h1>
      <h2 className="pl-3 lg:pl-0 text-[#696969] text-[2vh]">
        {oneSchool.direccion}{" "}
      </h2>
      <div>
        <div className={style.responsiveHead}>
          <div className=" min-w-fit  max-w-fit">
            {/* divs negro */}
            <div className="flex gap-2 lg:flex-row  pb-1 ">
              <span className="bg-[#0D263B] text-[1.6vh] min-w-fit m-0 px-3 p-0 text-white rounded-sm  flex items-center">
                {currentVacante &&
                  Number(currentVacante[0]?.capacidad) -
                    Number(currentVacante[0]?.alumnos_matriculados)}{" "}
                Vacantes
              </span>
              <span className="bg-[#0D263B] text-[1.6vh] min-w-fit m-0 px-3 p-0 text-white rounded-sm flex items-center">
                {nombre_grado}
              </span>
              <span className="bg-[#0D263B] text-[1.6vh] min-w-fit m-0 px-3 p-0 rounded-sm text-white  flex items-center">
                {ingresoParams}
              </span>
            </div>
          </div>
          {/* COUTA DE INGRESO */}
          {currentVacante && (
            <div className="flex flex-col w-full ">
              <small>
                <p className="font-semibold  text-[#0D263B] text-[2.5vh]">
                  {" "}
                  Pensión: S/{" "}
                  {currentVacante.length > 0 &&
                    currentVacante[0].cuota_pension}{" "}
                  mes{" "}
                </p>
              </small>
              <small>
                <p className="text-[#696969] text-[1.9vh]">
                  {" "}
                  Cuota de ingreso: S/{" "}
                  {currentVacante.length > 0 &&
                    currentVacante[0].cuota_ingreso}{" "}
                </p>
              </small>

              <small>
                <p className="text-[#696969] text-[1.9vh]">
                  Cuota de matricula: S/{" "}
                  {currentVacante.length > 0 && currentVacante[0].matricula}
                </p>
              </small>
            </div>
          )}
        </div>
      </div>
      {/* ICONS HEAD */}

      <div className="pt-4 h-fit gap-5  flex  justify-between items-start lg:items-start  flex-col">
        <div className={style.divIconsHead}>
          {" "}
          <div className="flex  flex-row  gap-3 text-center">
            <FontAwesomeIcon size="sm" color="#696969" icon={faUsers} />
            <span className="text-[1.9vh] text-[#696969] ">
              {oneSchool.numero_estudiantes} Alumnos
            </span>
          </div>
          {oneSchool?.Categoria?.map((cat) => (
            <div className="flex flex-row items-center min-w-[20vh] gap-3 text-center">
              <img
                src={cat.logo_categoria}
                alt="logo_categoria"
                className="w-4 object-cover  invert-[40%]"
              />
              <span className="text-[1.9vh] text-[#696969]">
                {cat.nombre_categoria}{" "}
              </span>
            </div>
          ))}
          <div className="flex flex-row gap-3 text-center">
            <FontAwesomeIcon size="sm" color="#696969" icon={faCalendar} />
            <span className="text-[1.9vh] text-[#696969]">
              Fundación: {oneSchool.fecha_fundacion}{" "}
            </span>
          </div>
          <div className="flex flex-row gap-3 text-center">
            <FontAwesomeIcon size="sm" color="#696969" icon={faSchool} />
            <span className="text-[1.9vh] text-[#696969]">
              UGEL: {oneSchool.ugel}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
