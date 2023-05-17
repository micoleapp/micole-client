import * as React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Squash as Hamburger } from "hamburger-react";
import DragAndDrop from "../components/DragAndDrop";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import style from "./Dashboard.module.css";
import {  getCitaAgendadas } from "../redux/SchoolsActions";
import { CiUser, CiClock1 } from "react-icons/ci";
import { BsWindowDock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { GiHexagonalNut } from "react-icons/gi";
import { BsCalendarCheck } from "react-icons/bs";
import { useEffect } from "react";
import {
  logout,
} from "../redux/AuthActions";
import { useState } from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import Cards from "../components/CardsDrgAndDrp/Cards";
import CardCitas from "../components/CardsCitas/CardCitas";
import { getCita } from "../redux/CitasActions";
import Miplan from "./DashboardSchool/Miplan/Miplan";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import UbiPreferente from "./DashboardSchool/UbicacionPreferente/UbiPreferente";
import ListadeEspera from "./DashboardSchool/ListaEspera/ListadeEspera";
import HorariosColegio from "./DashboardSchool/HorariosColegio/HorariosColegio";
import DatosPersonales from "./DashboardSchool/Configuracion/DatosPersonales";
import CreateEvent from "./DashboardSchool/CrearEventoColegio/CreateEvent";
import FormPerfilColegio from "./DashboardSchool/Formulario-PerfilColegio/FormPerfilColegio";


function DashboardSchool() {
  const [page, setPage] = React.useState(0);
  const [activeUpOne, setActiveUpOne] = useState(true);
  const [Filtro, setFiltro] = useState("");
  const dispatch = useDispatch();
  const {
    oneSchool,
  } = useSelector((state) => state.auth);
  const [isOpen, setOpen] = useState(false);
  const { citasAgendadas } = useSelector((state) => state.schools);
  useEffect(() => {
    dispatch(getCitaAgendadas());
    dispatch(getCita());
  }, [citasAgendadas.CitasActivas?.length]);



  return (
    <div className="flex lg:flex-row flex-col">
      <section
        className={`leftshadow ${
          !isOpen
            ? "h-[50px] lg:h-full lg:min-h-full"
            : "h-[500px] lg:h-full lg:min-h-full"
        } duration-300 overflow-hidden bg-white w-full lg:w-1/4 shadow-leftshadow flex justify-center z-50`}
      >
        <div className="absolute left-5 block lg:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#0061dd" />
        </div>
        <ul
          className={`${
            !isOpen ? "hidden" : "flex"
          } lg:flex flex-col justify-center gap-4 static lg:absolute lg:top-48`}
        >
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 0 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(0);
            }}
          >
            <CiUser
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 0 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 0 ? "text-white" : null
              }`}
            >
              Perfil del colegio
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 1 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(1);
            }}
          >
            <CiClock1
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            >
              Horario para citas{" "}
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 5 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(5);
            }}
          >
            <MoveToInboxOutlinedIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 5 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 5 ? "text-white" : null
              }`}
            >
              Citas Agendadas{" "}
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 6 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(6);
            }}
          >
            <BsCalendarCheck
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 6 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 6 ? "text-white" : null
              }`}
            >
              Eventos{" "}
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 4 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(4);
            }}
          >
            <AiOutlineIdcard
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 4 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 4 ? "text-white" : null
              }`}
            >
              Panel de control{" "}
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 2 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(2);
            }}
          >
            <BsWindowDock
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 2 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 2 ? "text-white" : null
              }`}
            >
              Mi plan
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 8 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(8);
            }}
          >
            <StarBorderIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 8 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 8 ? "text-white" : null
              }`}
            >
              Ubicación Preferente
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 7 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(7);
            }}
          >
            <FormatListBulletedIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 7 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 7 ? "text-white" : null
              }`}
            >
              Lista de Espera
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 3 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(3);
            }}
          >
            <GiHexagonalNut
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 3 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 3 ? "text-white" : null
              }`}
            >
              Configuración
            </span>
          </button>
          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => dispatch(logout())}
          >
            <AiOutlineLogout className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Logout
            </span>
          </button>
        </ul>
      </section>
      <section className="right w-full bg-[#EEEE] p-5 lg:px-31 lg:py-12">
        {page === 0 ? (
          <FormPerfilColegio />
        ) : page === 1 ? (
          <HorariosColegio />
        ) : page === 2 ? (
          <div className="min-h-screen">
            <Miplan UbiPreferente={false} />
          </div>
        ) : page === 3 ? (
          <DatosPersonales />
        ) : page === 4 ? (
          <div className="min-h-screen">
            <div
              className={style.layout}
              style={{ display: "flex", gap: "10px" }}
            >
              <Cards
                icon="solicitud"
                text="Solicitudes de Citas"
                nro={citasAgendadas?.CitasInactivas?.length}
              />
              <Cards
                icon="visualizacion"
                text="Visualizaciones"
                nro={oneSchool?.visualizaciones}
              />
              <Cards icon="mensaje" text="Mensajes" nro={0} />
              <Cards
                icon="comentario"
                text="Comentarios"
                nro={oneSchool?.Reviews?.length}
              />
            </div>

            <DragAndDrop />
          </div>
        ) : page === 5 ? (
          <div className=" min-h-screen">
            <h1>Citas</h1>
            <div className={style.containerBtn}>
              <div>
                <Button
                  onClick={() => setFiltro("")}
                  startIcon={<StarBorderIcon />}
                  variant="outlined"
                >
                  Todos
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => setFiltro("Confirmados")}
                  startIcon={<DraftsOutlinedIcon />}
                  variant="outlined"
                >
                  Confirmados
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => setFiltro("SinConfirmar")}
                  startIcon={<MailOutlineOutlinedIcon />}
                  variant="outlined"
                >
                  Sin Confirmar
                </Button>
              </div>
            </div>
            <div>
              <CardCitas
                data={citasAgendadas && citasAgendadas}
                setPlan={setPage}
                filtros={Filtro}
              />
            </div>
          </div>
        ) : page === 6 ? (
          <CreateEvent setActiveUpOne={setActiveUpOne} />
        ) : page === 7 ? (
          <div className=" min-h-screen">
            <ListadeEspera />
          </div>
        ) : page === 8 ? (
          <div className=" min-h-screen">
            <UbiPreferente />
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default DashboardSchool;
