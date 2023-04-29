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
import MobileDatosGenerales from "./Components/MobileDatosGenerales";
import MobileMetodoNeuro from "./Components/MobileMetodoNeuro";
import MobileAfiliaciones from "./Components/MobileAfiliaciones";
import MobileInfraestructura from "./Components/MobileInfraestructura";
import { Link } from "react-router-dom";
export default function CardsMobileComparador() {
  const { arrColegios } = useSelector((state) => state.comparador);
  const [openSch, setOpenSch] = useState(false);
  const [openSection, setOpenSection] = useState({
    infra: false,
    afiliaciones: false,
    datosGenerales: true,
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
      {/*  cards head */}
      <div className=" w-full flex flex-col gap-5 justify-between shadow-md pb-5 p-2">
 
        {arrColegios?.map((c) => {
          return (
            <>
              <div className={style.containerCard}>
                {/* HEAD */}
                <div className={style.cardHead}>
                  <img src={c.colegio.logo === null ? "https://res.cloudinary.com/dvztuncle/image/upload/v1682798271/3256151_zdcs0j.png":c.colegio.logo  } alt={c.colegio.nombre_colegio} />
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
                <div className="flex flex-row gap-[2vh] items-start">
                  {/* <Link>
                  <p   className="text-[1.6vh] text-[#0061df] font-semibold">
                      Ver Perfil
                  </p>
              
                </Link> */}
                  <CloseIcon
                    sx={{ color: "#0061df" }}
                    onClick={(e) => handlerDelete(e, c.colegio.id)}
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* Datos Generales*/}
      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            datosGenerales: !openSection.datosGenerales,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-4"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Datos generales
        </p>

        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>
      {/* div que se expande Datos Generales*/}
      {openSection.datosGenerales && <MobileDatosGenerales />}
      {/* Metodo y Neuro */}
      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            MetodologiasNeuro: !openSection.MetodologiasNeuro,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-4"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Metodologías y Neurodiversidad
        </p>

        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>

      {/* div que se expande Metodo y Neuro */}
      {openSection.MetodologiasNeuro && <MobileMetodoNeuro />}

      {/*   Afiliaciones*/}
      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            afiliaciones: !openSection.afiliaciones,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-4"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Afiliaciones
        </p>

        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>
      {/* div que se expande  Afiliaciones*/}
      {openSection.afiliaciones && <MobileAfiliaciones />}

      {/*   Infraestructura*/}
      <div
        onClick={() =>
          setOpenSection({
            ...openSection,
            infra: !openSection.infra,
          })
        }
        className=" w-full flex flex-row justify-between shadow-md p-4"
      >
        <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
          Infraestructura
        </p>
        <KeyboardArrowDownTwoToneIcon
          onClick={handleOpenList}
          sx={{ color: "#0D263B" }}
        />
      </div>
      {/* div que se expande    Infraestructura**/}
      {openSection.infra && <MobileInfraestructura />}
    </div>
  );
}
