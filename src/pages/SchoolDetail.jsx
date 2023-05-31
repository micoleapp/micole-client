import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clannDetailid,
  getAllGrados,
  getHorariosSchool,
  getSchoolDetail,
} from "../redux/SchoolsActions";
import CircularProgress from "@mui/material/CircularProgress";
import ModalLogin from "../components/ModalLogin/ModalLogin";
import { setVacantesRedux } from "../redux/AuthActions";
import SliderC from "../components/SliderC";
import SwDetail from "./SchoolDetail/SwipperDetail/SwDetail";
import SnackComparador from "./ListSchool/SnackComparador/SnackComparador";
import IconSnack from "./ListSchool/SnackComparador/IconSnackBar/IconSnack";
import TabsDetail from "./SchoolDetail/TabsDetail/TabsDetail";
import HeaderSD from "./SchoolDetail/Header/HeaderSD";
let url = window.location.href;

function SchoolDetail() {
  const { id } = useParams();
  const { oneSchool, grados } = useSelector((state) => state.schools);
  const [images, setImages] = useState({
    open: false,
    src: [],
  });

  const { user, isAuth, vacantes } = useSelector((state) => state.auth);

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [gradoParams, setGradoParams] = React.useState(params.get("grado"));

  const [ingresoParams, setIngresoParams] = React.useState(
    params.get("ingreso")
  );
  const [listaParams, setListaParams] = React.useState(params.get("lista"));
  const nombre_grado = grados?.find(
    (grado) => grado.id == gradoParams
  )?.nombre_grado;

  const [currentVacante, setCurrentVacante] = useState([]);

  useEffect(() => {
    dispatch(setVacantesRedux(id));
  }, []);
  useEffect(() => {
    if (vacantes.length > 0) {
      setCurrentVacante(
        vacantes?.filter(
          (vac) =>
            vac.GradoId === Number(gradoParams) &&
            vac.año === Number(ingresoParams)
        )
      );
    }
  }, [vacantes]);
  useEffect(() => {}, [isAuth]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGrados());
    dispatch(getSchoolDetail(id));
    dispatch(getHorariosSchool(id));
    return () => {
      dispatch(clannDetailid());
    };
  }, []);

  const [openLogin, setOpenLogin] = useState(false);

  document.title =
    oneSchool?.nombre_colegio?.length > 0 ? oneSchool.nombre_colegio : "MiCole";
  const [openComparador, setOpenComparador] = useState(false);
  const handlerOpenComparador = () => {
    setOpenComparador(true);
  };
  return (
    <>
      <div className="  bg-[#f6f7f8]  ">
        {/* Carrusel de img  */}
        {images.open && (
          <SliderC setImages={setImages} images={images.src}></SliderC>
        )}
        {oneSchool?.primera_imagen?.length > 0 ? (
          <SwDetail />
        ) : (
          <div className="w-full h-[500px] flex justify-center items-center">
            <CircularProgress size="5rem" style={{ color: "#0061dd" }} />
          </div>
        )}
        {/* BODY DETAIL----------------lg:px-[100px]-------*/}
        <div className="flex flex-col  sm:flex-row pl-1 pb-20 justify-around">
          {/* Header // Nombre colegio // compartir // Pension*/}
          <HeaderSD
            currentVacante={currentVacante}
            url={url}
            nombre_grado={nombre_grado}
            ingresoParams={ingresoParams}
          />

          {/* TABS DETAIL */}
          <TabsDetail
            id={id}
            gradoParams={gradoParams}
            ingresoParams={ingresoParams}
            nombre_grado={nombre_grado}
            listaParams={listaParams}
            handlerOpenComparador={handlerOpenComparador}
          />

          {/* ---------------------------------Modales---------------------------------------------- */}
        </div>
        {openLogin && <ModalLogin handlerClose={setOpenLogin} />}
      </div>
      {openComparador && (
        <SnackComparador open={openComparador} setOpen={setOpenComparador} />
      )}
      {openComparador === false && (
        <div onClick={handlerOpenComparador}>
          <div className="sm:flex flex-none">
            <IconSnack open={openComparador} setOpen={setOpenComparador} />
          </div>
        </div>
      )}
    </>
  );
}

export default SchoolDetail;
