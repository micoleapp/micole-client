import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Confetti from "react-confetti";
import { steps } from "../MockupInfo/Pasos";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import useWindowSize from "react-use-window-size";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
const initialDatosPrincipales = {
  nombreColegio: oneSchool?.nombre_colegio ? oneSchool.nombre_colegio : "",
  descripcion: oneSchool?.descripcion ? oneSchool.descripcion : "",
  propuesta: oneSchool?.propuesta_valor ? oneSchool.propuesta_valor : "",
  categoria: oneSchool?.Categoria ? oneSchool.Categoria : "",
  nombreDirector: oneSchool?.nombre_director ? oneSchool.nombre_director : "",
  fundacion: oneSchool?.fecha_fundacion
    ? Number(oneSchool?.fecha_fundacion)
    : null,
  ruc: oneSchool?.ruc ? Number(oneSchool.ruc) : null,
  ugel: oneSchool?.ugel ? Number(oneSchool.ugel) : null,
  area: oneSchool?.area ? Number(oneSchool.area) : null,
  ingles: oneSchool?.horas_idioma_extranjero
    ? Number(oneSchool.horas_idioma_extranjero)
    : null,
  alumnos: oneSchool?.numero_estudiantes
    ? Number(oneSchool.numero_estudiantes)
    : null,
  niveles: oneSchool?.Nivels?.length > 0 ? oneSchool.Nivels : [],
  departamento: oneSchool?.Departamento ? oneSchool.Departamento : {},
  provincia: oneSchool?.Provincium ? oneSchool.Provincium : {},
  distrito: oneSchool?.Distrito ? oneSchool.Distrito : {},
  direccion: oneSchool?.direccion ? oneSchool.direccion : "",
  lat:
    oneSchool?.ubicacion?.length > 0
      ? JSON.parse(oneSchool.ubicacion).lat
      : 0,
  lng:
    oneSchool?.ubicacion?.length > 0
      ? JSON.parse(oneSchool.ubicacion).lng
      : 0,
  infraestructura: oneInfra?.Infraestructuras
    ? oneInfra.Infraestructuras
    : [],
  afiliaciones: oneAfiliacion?.Afiliacions ? oneAfiliacion.Afiliacions : [],
  dificultades: oneSchool?.Dificultades ? oneSchool.Dificultades : [],
  metodos: oneSchool?.Metodos ? oneSchool.Metodos : [],
};
export default function FormPerfilColegio() {
  const {
    categories,
    provincias,
    distrits,
    departaments,
    niveles,
    infraestructura: infraState,
    afiliaciones,
    dificultades,
    metodos,
  } = useSelector((state) => state.schools);
  const {
    user,
    oneSchool,
    loading,
    infraestructura: oneInfra,
    afiliacion: oneAfiliacion,
  } = useSelector((state) => state.auth);

  const { width, height } = useWindowSize();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const initialCenter = {
    lat: datosPrincipales.lat,
    lng: datosPrincipales.lng,
  };
  const [center, setCenter] = React.useState(initialCenter);

  useEffect(() => {
    setCenter(initialCenter);
  }, [datosPrincipales]);

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const zoom = 18;
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const direccion = useRef();

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoadPlace = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setLatitud(place.geometry.location.lat());
      setLongitud(place.geometry.location.lng());
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setDatosPrincipales({
        ...datosPrincipales,
        direccion:
          place.address_components[1].long_name +
          " " +
          place.address_components[0].long_name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
 

  const [datosPrincipales, setDatosPrincipales] = useState(
    initialDatosPrincipales
  );

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const dispatch = useDispatch();



  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompleteDatosPrincipales = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    // setAllData({ ...allData, ...datosPrincipales });
    try {
      axios
        .put(`/colegios/${user.id}`, datosPrincipales)
        .then((res) => {
          console.log(res);
          dispatch(getSchoolDetail(user.id));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }

    handleNext();
  };

  const handleCompleteVacantes = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleCompleteInfraestructura = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    try {
      axios
        .put(`/colegios/${user.id}`, datosPrincipales)
        .then((res) => {
          console.log(res);
          dispatch(getInfraestructuraSchool(user.id));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    handleNext();
  };

  const handleCompleteAcreditaciones = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    try {
      axios
        .put(`/colegios/${user.id}`, datosPrincipales)
        .then((res) => {
          dispatch(getAfiliacionSchool(user.id));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    handleNext();
  };

  const handleCompleteMultimedia = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    try {
      axios
        .put(`/colegios/multimedia/${user.id}`, { multimedia })
        .then((res) => {
          console.log(res);
          dispatch(getSchoolDetail(user.id));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    handleNext();
    setActiveUpOne(true);
    setActiveUpTwo(true);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const handleSubmitFormComplete = (e) => {
    e.preventDefault();
    Swal.fire({
      imageUrl: Success,
      title: "Felicidades, ya estás a un paso de publicar tu colegio",
      confirmButtonText: "Continuar",
    }).then((res) => {
      if (res.isConfirmed) {
        handleReset();
        setPage(1);
      }
    });
  };




  useEffect(() => {
    setDatosPrincipales(initialDatosPrincipales);
  }, [oneInfra, oneAfiliacion, oneSchool]);
  const datosPrincipalesCompleted = () => {
    if (
      datosPrincipales.nombreColegio !== "" &&
      datosPrincipales.descripcion !== "" &&
      datosPrincipales.propuesta !== "" &&
      datosPrincipales.categoria.length !== 0 &&
      datosPrincipales.nombreDirector !== "" &&
      datosPrincipales.fundacion !== null &&
      datosPrincipales.ruc !== null &&
      datosPrincipales.ugel !== null &&
      datosPrincipales.area !== null &&
      datosPrincipales.ingles !== null &&
      datosPrincipales.alumnos !== null &&
      datosPrincipales.niveles.length !== 0 &&
      Object.keys(datosPrincipales.departamento).length !== 0 &&
      Object.keys(datosPrincipales.provincia).length !== 0 &&
      Object.keys(datosPrincipales.distrito).length !== 0 &&
      datosPrincipales.direccion !== "" &&
      datosPrincipales.lat !== 0 &&
      datosPrincipales.lng !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };





  return (
    <Box sx={{ width: "100%", height: "100%" }}>
    <Stepper
      nonLinear
      activeStep={activeStep}
      orientation={width > 700 ? "horizontal" : "vertical"}
    >
      {steps.map((label, index) => (
        <Step key={label} completed={completed[index]}>
          <StepButton
            color="inherit"
            // disabled={!completed[index]}
            onClick={handleStep(index)}
          >
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
    <div className="mt-10">
      {allStepsCompleted() ? (
        <React.Fragment>
          <Confetti
            width={width - 10}
            height={width > 900 ? height + 155 : height}
            style={{ zIndex: 500, position: "fixed" }}
          />
          <div
            className={`h-screen flex flex-col gap-10 justify-center`}
          >
            <h1 className="text-4xl text-center font-bold mt-5">
              Felicitaciones completaste todos los pasos
            </h1>
            <p className="text-center">
              Porfavor continua completando tus horarios para citas
            </p>
            <img src={Logo} alt="" className="object-cover mx-auto" />
            <button
              type="submit"
              className="bg-[#0061dd] text-white rounded-md mx-auto p-3"
              onClick={handleSubmitFormComplete}
            >
              Continuar
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <form className="flex flex-col gap-7">
              <div className="flex flex-col">
                <label
                  htmlFor="nombreColegio"
                  className="text-lg font-medium"
                >
                  Nombre del Colegio
                </label>
                <input
                  type="text"
                  name="nombreColegio"
                  id="nombreColegio"
                  className="p-3 rounded-md border-2  outline-none"
                  value={datosPrincipales.nombreColegio}
                  onChange={(e) =>
                    setDatosPrincipales({
                      ...datosPrincipales,
                      nombreColegio: e.target.value,
                    })
                  }
                  placeholder="Ingresa el nombre del colegio"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="descripcion"
                  className="text-lg font-medium"
                >
                  Descripcion
                </label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  className="p-3 rounded-md border-2 outline-none"
                  rows={5}
                  onChange={(e) =>
                    setDatosPrincipales({
                      ...datosPrincipales,
                      descripcion: e.target.value,
                    })
                  }
                  value={datosPrincipales.descripcion}
                  placeholder="Ingresa la descripción de tu colegio"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="propuesta"
                  className="text-lg font-medium"
                >
                  Propuesta de Valor Educativa
                </label>
                <textarea
                  name="propuesta"
                  id="propuesta"
                  className="p-3 rounded-md border-2 outline-none"
                  rows={5}
                  onChange={(e) =>
                    setDatosPrincipales({
                      ...datosPrincipales,
                      propuesta: e.target.value,
                    })
                  }
                  value={datosPrincipales.propuesta}
                  placeholder="Ingresa la propuesta de valor educativa de tu colegio"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="categoria"
                    className="text-lg font-medium"
                  >
                    Categoria
                  </label>
                  <small>Puede marcar mas de una opción</small>
                </div>
                <div className="flex flex-col lg:grid grid-cols-3">
                  {categories?.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          checked={
                            datosPrincipales?.categoria.length > 0 &&
                            datosPrincipales?.categoria
                              .map((e) => e.id)
                              .includes(category.id)
                          }
                          onChange={(event, target) => {
                            if (target) {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                categoria: [
                                  ...datosPrincipales.categoria,
                                  category,
                                ],
                              });
                            } else {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                categoria:
                                  datosPrincipales.categoria.filter(
                                    (cat) => cat.id !== category.id
                                  ),
                              });
                            }
                          }}
                        />
                      }
                      label={category.nombre_categoria}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="director"
                  className="text-lg font-medium"
                >
                  Nombre del Director
                </label>
                <input
                  type="text"
                  name="director"
                  id="director"
                  className="p-3 rounded-md border-2  outline-none"
                  onChange={(e) =>
                    setDatosPrincipales({
                      ...datosPrincipales,
                      nombreDirector: e.target.value,
                    })
                  }
                  placeholder="Ingresa el nombre del director"
                  value={datosPrincipales.nombreDirector}
                />
              </div>
              <div className="flex flex-col lg:grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="fundacion"
                    className="text-lg font-medium"
                  >
                    Año de Fundación
                  </label>
                  <input
                    type="number"
                    name="fundacion"
                    id="fundacion"
                    className="p-3 rounded-md border-2  outline-none"
                    onChange={(e) =>
                      setDatosPrincipales({
                        ...datosPrincipales,
                        fundacion: Number(e.target.value),
                      })
                    }
                    pattern="\d{4}"
                    placeholder="Ingresa un año"
                    value={datosPrincipales.fundacion}
                    title="Solo se permiten numeros, 4 caracteres y un año superior a 1700"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="ruc" className="text-lg font-medium">
                    N° RUC
                  </label>
                  <input
                    type="number"
                    name="ruc"
                    placeholder="Ingresa el RUC"
                    id="ruc"
                    className="p-3 rounded-md border-2  outline-none"
                    onChange={(e) =>
                      setDatosPrincipales({
                        ...datosPrincipales,
                        ruc: Number(e.target.value),
                      })
                    }
                    value={datosPrincipales.ruc}
                    pattern="^[0-9]+"
                    title="Solo se permiten numeros"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="ugel" className="text-lg font-medium">
                    UGEL
                  </label>
                  <input
                    type="number"
                    name="ugel"
                    placeholder="Ingresa el UGEL"
                    id="ugel"
                    className="p-3 rounded-md border-2  outline-none"
                    onChange={(e) =>
                      setDatosPrincipales({
                        ...datosPrincipales,
                        ugel: Number(e.target.value),
                      })
                    }
                    value={datosPrincipales.ugel}
                    pattern="^[0-9]+"
                    title="Solo se permiten numeros"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="area" className="text-lg font-medium">
                    Área del campus (m2)
                  </label>
                  <input
                    type="number"
                    name="area"
                    id="area"
                    placeholder="Ingresa el area del campus"
                    className="p-3 rounded-md border-2  outline-none"
                    pattern="^[0-9]+"
                    title="Solo se permiten numeros"
                    onChange={(e) =>
                      setDatosPrincipales({
                        ...datosPrincipales,
                        area: Number(e.target.value),
                      })
                    }
                    value={datosPrincipales.area}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="ingles"
                    className="text-lg font-medium"
                  >
                    Hr/Semana idioma Inglés
                  </label>
                  <input
                    type="number"
                    name="ingles"
                    id="ingles"
                    placeholder="Ingresa las horas de ingles"
                    className="p-3 rounded-md border-2  outline-none"
                    pattern="^[0-9]+"
                    title="Solo se permiten numeros"
                    onChange={(e) =>
                      setDatosPrincipales({
                        ...datosPrincipales,
                        ingles: Number(e.target.value),
                      })
                    }
                    value={datosPrincipales.ingles}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="alumnos"
                    className="text-lg font-medium"
                  >
                    Cantidad de Alumnos
                  </label>
                  <input
                    type="number"
                    name="alumnos"
                    id="alumnos"
                    placeholder="Ingresa la cantidad de alumnos"
                    className="p-3 rounded-md border-2  outline-none"
                    pattern="^[0-9]+"
                    title="Solo se permiten numeros"
                    onChange={(e) =>
                      setDatosPrincipales({
                        ...datosPrincipales,
                        alumnos: Number(e.target.value),
                      })
                    }
                    value={datosPrincipales.alumnos}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label
                    htmlFor="alumnos"
                    className="text-lg font-medium"
                  >
                    Niveles
                  </label>
                  <small>Puede marcar mas de una opción</small>
                </div>
                <div className="flex flex-col lg:grid grid-cols-3">
                  {niveles?.map((level, key) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={datosPrincipales.niveles.some(
                            (niv) => niv.id === level.id
                          )}
                          onChange={(event, target) => {
                            if (target) {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                niveles: [
                                  ...datosPrincipales.niveles,
                                  level,
                                ],
                              });
                            } else {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                niveles:
                                  datosPrincipales.niveles.filter(
                                    (cat) => cat.id !== level.id
                                  ),
                              });
                            }
                          }}
                        />
                      }
                      label={level.nombre_nivel}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label
                    htmlFor="alumnos"
                    className="text-lg font-medium"
                  >
                    ¿Aceptas estudiantes con alguna de estas
                    dificultades?
                  </label>
                  <small>Puede marcar mas de una opción</small>
                </div>
                <div className="flex flex-col lg:grid grid-cols-3">
                  {dificultades?.map((level, key) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={datosPrincipales.dificultades.some(
                            (niv) =>
                              niv.id_dificultad === level.id_dificultad
                          )}
                          onChange={(event, target) => {
                            if (target) {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                dificultades: [
                                  ...datosPrincipales.dificultades,
                                  level,
                                ],
                              });
                            } else {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                dificultades:
                                  datosPrincipales.dificultades.filter(
                                    (cat) =>
                                      cat.id_dificultad !==
                                      level.id_dificultad
                                  ),
                              });
                            }
                          }}
                        />
                      }
                      label={level.nombre_dificultad}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label
                    htmlFor="alumnos"
                    className="text-lg font-medium"
                  >
                    ¿Utilizas alguno de estos métodos pedagógicos?{" "}
                  </label>
                  <small>Puede marcar mas de una opción</small>
                </div>
                <div className="flex flex-col lg:grid grid-cols-3">
                  {metodos?.map((level, key) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={datosPrincipales.metodos.some(
                            (niv) => niv.id_metodo === level.id_metodo
                          )}
                          onChange={(event, target) => {
                            if (target) {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                metodos: [
                                  ...datosPrincipales.metodos,
                                  level,
                                ],
                              });
                            } else {
                              setDatosPrincipales({
                                ...datosPrincipales,
                                metodos:
                                  datosPrincipales.metodos.filter(
                                    (cat) =>
                                      cat.id_metodo !== level.id_metodo
                                  ),
                              });
                            }
                          }}
                        />
                      }
                      label={level.nombre_metodo}
                    />
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-2xl font-medium">Ubicación</h1>
                <div className="flex w-full gap-5 flex-col lg:flex-row">
                  <div className="flex flex-col w-full gap-3">
                    <label className="text-lg font-medium">
                      Departamento
                    </label>
                    <FormControl size="medium" className="w-full">
                      <InputLabel id="demo-simple-select-standard-label">
                        Selecciona un Departamento
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-type-select-standard"
                        value={datosPrincipales.departamento}
                        onChange={(e) => {
                          setDatosPrincipales({
                            ...datosPrincipales,
                            departamento: e.target.value,
                          });
                        }}
                        label="Selecciona una Provincia"
                        className="bg-white"
                        defaultValue={datosPrincipales.departamento}
                      >
                        <MenuItem value={datosPrincipales.departamento}>
                          {
                            datosPrincipales.departamento
                              .nombre_departamento
                          }
                        </MenuItem>
                        {departaments
                          .filter(
                            (dep) =>
                              dep.nombre_departamento !==
                              datosPrincipales.departamento
                                .nombre_departamento
                          )
                          .map((type, index) => (
                            <MenuItem value={type} key={type.index}>
                              <ListItemText
                                primary={type.nombre_departamento}
                              />
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label className="text-lg font-medium">
                      Provincia
                    </label>

                    <FormControl size="medium" className="w-full">
                      <InputLabel id="demo-simple-select-standard-label">
                        Selecciona una Provincia
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-type-select-standard"
                        value={datosPrincipales.provincia}
                        onChange={(e) => {
                          setDatosPrincipales({
                            ...datosPrincipales,
                            provincia: e.target.value,
                          });
                        }}
                        label="Selecciona una Provincia"
                        className="bg-white"
                        defaultValue={datosPrincipales.provincia}
                      >
                        <MenuItem value={datosPrincipales.provincia}>
                          {datosPrincipales.provincia.nombre_provincia}
                        </MenuItem>
                        {provincias
                          .filter(
                            (prov) =>
                              prov.nombre_provincia !==
                              datosPrincipales.provincia
                                .nombre_provincia
                          )
                          .map((type, index) => (
                            <MenuItem value={type} key={type.index}>
                              <ListItemText
                                primary={type.nombre_provincia}
                              />
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label className="text-lg font-medium">
                      Distrito
                    </label>

                    <FormControl size="medium" className="w-full">
                      <InputLabel id="demo-simple-select-standard-label">
                        Selecciona un Distrito
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-type-select-standard"
                        value={datosPrincipales.distrito}
                        onChange={(e) => {
                          setDatosPrincipales({
                            ...datosPrincipales,
                            distrito: e.target.value,
                          });
                        }}
                        label="Selecciona una Provincia"
                        className="bg-white"
                        defaultValue={datosPrincipales.distrito}
                      >
                        <MenuItem value={datosPrincipales.distrito}>
                          {datosPrincipales.distrito.nombre_distrito}
                        </MenuItem>
                        {distrits
                          .filter(
                            (distrit) =>
                              distrit.nombre_distrito !==
                              datosPrincipales.distrito.nombre_distrito
                          )
                          .map((type, index) => (
                            <MenuItem value={type} key={type.index}>
                              <ListItemText
                                primary={type.nombre_distrito}
                              />
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <label
                    htmlFor="direccion"
                    className="text-lg font-medium"
                  >
                    Dirección
                  </label>
                  {isLoaded && (
                    <>
                      <div className="flex flex-col lg:flex-row w-full gap-5">
                        <Autocomplete
                          onPlaceChanged={onPlaceChanged}
                          onLoad={onLoadPlace}
                        >
                          <input
                            type="text"
                            className={`p-3 rounded-md border-2 ${
                              width > 900 ? "w-[400px]" : " w-full"
                            }  outline-none`}
                            ref={direccion}
                          />
                        </Autocomplete>
                        <input
                          type="text"
                          name="direccion"
                          id="direccion"
                          className={`p-3 rounded-md border-2 ${
                            datosPrincipales.direccion === null
                              ? "bg-inherit"
                              : "bg-white"
                          }  outline-none w-full`}
                          placeholder="Dirección"
                          value={datosPrincipales.direccion}
                          disabled
                          onChange={(e) => {
                            setDatosPrincipales({
                              ...datosPrincipales,
                              direccion: e.target.value,
                            });
                          }}
                        />
                        <input
                          type="text"
                          name="lat"
                          id="lat"
                          className={`p-3 rounded-md border-2 ${
                            latitud === null ? "bg-inherit" : "bg-white"
                          }  outline-none hidden`}
                          placeholder="Latitud"
                          value={latitud}
                          disabled
                          onChange={(e) => {
                            setDatosPrincipales({
                              ...datosPrincipales,
                              lat: e.target.value,
                            });
                          }}
                        />
                        <input
                          type="text"
                          name="lng"
                          id="lng"
                          className={`p-3 rounded-md border-2 ${
                            longitud === null
                              ? "bg-inherit"
                              : "bg-white"
                          }  outline-none hidden`}
                          placeholder="Longitud"
                          value={longitud}
                          disabled
                          onChange={(e) => {
                            setDatosPrincipales({
                              ...datosPrincipales,
                              lng: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                      >
                        {center.lat !== 0 && center.lng !== 0 && (
                          <MarkerF position={center}></MarkerF>
                        )}

                        <></>
                      </GoogleMap>{" "}
                    </>
                  )}
                </div>
              </div>
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Atrás
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  type="submit"
                  onClick={handleCompleteDatosPrincipales}
                  sx={{ mr: 1 }}
                  disabled={datosPrincipalesCompleted()}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Guardar y continuar
                </button>
              </Box>
            </form>
          )}
          {activeStep === 1 && (
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl">
                Debes selecionar al menos una casilla
              </h1>
              <small>Puede marcar mas de una opción</small>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="grid lg:grid-cols-5 grid-cols-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Administrativo
                    </label>

                    {infraState
                      .filter((inf) => inf.InfraestructuraTipoId === 1)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.infraestructura.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura: [
                                          ...datosPrincipales.infraestructura,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura:
                                          datosPrincipales.infraestructura.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_infraestructura}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Artistica
                    </label>

                    {infraState
                      .filter((inf) => inf.InfraestructuraTipoId === 2)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.infraestructura.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura: [
                                          ...datosPrincipales.infraestructura,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura:
                                          datosPrincipales.infraestructura.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_infraestructura}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Deportiva
                    </label>

                    {infraState
                      .filter((inf) => inf.InfraestructuraTipoId === 3)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.infraestructura.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura: [
                                          ...datosPrincipales.infraestructura,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura:
                                          datosPrincipales.infraestructura.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_infraestructura}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Enseñanza
                    </label>

                    {infraState
                      .filter((inf) => inf.InfraestructuraTipoId === 4)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.infraestructura.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura: [
                                          ...datosPrincipales.infraestructura,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura:
                                          datosPrincipales.infraestructura.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_infraestructura}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Laboratorio
                    </label>

                    {infraState
                      .filter((inf) => inf.InfraestructuraTipoId === 5)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.infraestructura.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura: [
                                          ...datosPrincipales.infraestructura,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        infraestructura:
                                          datosPrincipales.infraestructura.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_infraestructura}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Atrás
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  onClick={handleCompleteInfraestructura}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Guardar y continuar
                </button>
              </Box>
            </div>
          )}
          {activeStep === 2 && (
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl">
                Almenos una casilla debe ser seleccionada
              </h1>
              <small>Puede marcar mas de una opción</small>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="grid lg:grid-cols-4 grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Afiliaciones
                    </label>

                    {afiliaciones
                      .filter((inf) => inf.Afiliacion_tipo_id === 1)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.afiliaciones.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones: [
                                          ...datosPrincipales.afiliaciones,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones:
                                          datosPrincipales.afiliaciones.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_afiliacion}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Alianzas
                    </label>

                    {afiliaciones
                      .filter((inf) => inf.Afiliacion_tipo_id === 2)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.afiliaciones.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones: [
                                          ...datosPrincipales.afiliaciones,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones:
                                          datosPrincipales.afiliaciones.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_afiliacion}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Certificaciones
                    </label>

                    {afiliaciones
                      .filter((inf) => inf.Afiliacion_tipo_id === 3)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.afiliaciones.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones: [
                                          ...datosPrincipales.afiliaciones,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones:
                                          datosPrincipales.afiliaciones.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_afiliacion}
                            />
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="categoria"
                      className="text-lg font-medium"
                    >
                      Asociaciones
                    </label>

                    {afiliaciones
                      .filter((inf) => inf.Afiliacion_tipo_id === 4)
                      .map((infra) => (
                        <>
                          <div className="flex flex-col">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={datosPrincipales.afiliaciones.some(
                                    (inf) => inf.id === infra.id
                                  )}
                                  onChange={(event, target) => {
                                    if (target) {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones: [
                                          ...datosPrincipales.afiliaciones,
                                          infra,
                                        ],
                                      });
                                    } else {
                                      setDatosPrincipales({
                                        ...datosPrincipales,
                                        afiliaciones:
                                          datosPrincipales.afiliaciones.filter(
                                            (inf) => inf.id !== infra.id
                                          ),
                                      });
                                    }
                                  }}
                                />
                              }
                              label={infra.nombre_afiliacion}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Atrás
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  onClick={handleCompleteAcreditaciones}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Guardar y continuar
                </button>
              </Box>
            </div>
          )}
          {activeStep === 3 && (
            <div className="flex gap-2 min-h-screen flex-col w-full lg:w-[900px] overflow-hidden">
              <h1 className="text-2xl">Vacantes disponibles</h1>
              <small>
                Debera enviar el formulario de al menos 1 de los 3 años
                antes de continuar
              </small>
              <button
                className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
                onClick={() =>
                  vacantes === 0 ? setVacantes(null) : setVacantes(0)
                }
              >
                {" "}
                <span>2023</span>{" "}
                <FontAwesomeIcon
                  size="lg"
                  icon={vacantes === 0 ? faArrowUp : faArrowDown}
                />{" "}
              </button>
              {vacantes === 0 && (
                <GridVacantes
                  setVacantesOff={setVacantesOffOne}
                  año={yearNow}
                />
              )}
              <button
                className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
                onClick={() =>
                  vacantes === 1 ? setVacantes(null) : setVacantes(1)
                }
              >
                {" "}
                <span>2024</span>{" "}
                <FontAwesomeIcon
                  size="lg"
                  icon={vacantes === 1 ? faArrowUp : faArrowDown}
                />{" "}
              </button>
              {vacantes === 1 && (
                <GridVacantes
                  setVacantesOff={setVacantesOffTwo}
                  año={yearNow + 1}
                />
              )}
              <button
                className="flex font-semibold justify-between items-center bg-white p-2 rounded-md shadow-md"
                onClick={() =>
                  vacantes === 2 ? setVacantes(null) : setVacantes(2)
                }
              >
                {" "}
                <span>2025</span>{" "}
                <FontAwesomeIcon
                  size="lg"
                  icon={vacantes === 2 ? faArrowUp : faArrowDown}
                />{" "}
              </button>
              {vacantes === 2 && (
                <GridVacantes
                  setVacantesOff={setVacantesOffThree}
                  año={yearNow + 2}
                />
              )}
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Atrás
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  disabled={
                    vacantesOffOne && vacantesOffTwo && vacantesOffThree
                  }
                  onClick={handleCompleteVacantes}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Guardar y continuar
                </button>
              </Box>
            </div>
          )}
          {activeStep === 4 && (
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl">Agregar imagenes</h1>
              <small>
                Deberas subir las imagenes con el boton{" "}
                <span className="font-bold">Upload</span> antes de
                proseguir
              </small>
              <div className="flex flex-col lg:flex-row gap-5">
                <form
                  onSubmit={handleFilesSubmitOne}
                  className="flex flex-col"
                >
                  <div className="file-select flex w-full lg:min-w-[200px] ">
                    <label
                      htmlFor="image"
                      className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                    >
                      <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                      <span className="text-sm mx-auto text-center text-[#0061dd]">
                        Imagen principal
                      </span>{" "}
                    </label>
                    <input
                      multiple={false}
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png,image/jpeg"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </div>
                  {activeUpOne && (
                    <button
                      type="submit"
                      disabled={
                        file !== null && previewOne !== null
                          ? false
                          : true
                      }
                      className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                    >
                      Upload
                    </button>
                  )}

                  {spanOne && (
                    <span className="relative text-center animate-bounce text-3xl">
                      👆
                    </span>
                  )}
                </form>
                {previewOne !== "" && (
                  <>
                    <div className="border-2 rounded-md overflow-hidden p-2 bg-white">
                      <StandardImageList
                        eliminarImagenDePreview={
                          eliminarImagenDePreviewOne
                        }
                        one={true}
                        setImage={setImage}
                        list={previewOne}
                      />
                    </div>
                    <div
                      className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
                        image ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-4 z-[100] text-white"
                      >
                        Atras
                      </button>
                      <img
                        src={image}
                        alt=""
                        className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <form
                  onSubmit={handleFilesSubmit}
                  className="flex flex-col"
                >
                  <div className="file-select flex w-full lg:min-w-[200px] ">
                    <label
                      htmlFor="images"
                      className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                    >
                      <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                      <span className="text-sm mx-auto text-center text-[#0061dd]">
                        Galeria de imagenes
                      </span>{" "}
                    </label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/png,image/jpeg"
                      onChange={(e) => {
                        setFiles(e.target.files);
                      }}
                      multiple
                      className="hidden"
                    />
                  </div>
                  {activeUpTwo && (
                    <button
                      type="submit"
                      disabled={
                        files !== null && preview.length !== 0
                          ? false
                          : true
                      }
                      className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                    >
                      Upload
                    </button>
                  )}

                  {spanTwo && (
                    <span className="relative text-center animate-bounce text-3xl">
                      👆
                    </span>
                  )}
                </form>
                {preview.length !== 0 && (
                  <>
                    <div className="border-2 rounded-md overflow-hidden p-2 bg-white">
                      <StandardImageList
                        eliminarImagenDePreview={
                          eliminarImagenDePreview
                        }
                        one={false}
                        setImage={setImage}
                        list={preview}
                      />
                    </div>
                    <div
                      className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
                        image ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-4 z-[100] text-white"
                      >
                        Atras
                      </button>
                      <img
                        src={image}
                        alt=""
                        className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <form
                  onSubmit={handleFilesSubmitLogo}
                  className="flex flex-col"
                >
                  <div className="file-select flex w-full lg:min-w-[200px] ">
                    <label
                      htmlFor="imageLogo"
                      className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                    >
                      <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                      <span className="text-sm mx-auto text-center text-[#0061dd]">
                        Agregar logo
                      </span>{" "}
                    </label>
                    <input
                      type="file"
                      id="imageLogo"
                      name="imageLogo"
                      accept="image/png,image/jpeg"
                      onChange={(e) => {
                        setFileLogo(e.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </div>
                  {activeUpLogo && (
                    <button
                      type="submit"
                      disabled={
                        fileLogo !== null && previewLogo !== null
                          ? false
                          : true
                      }
                      className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                    >
                      Upload
                    </button>
                  )}

                  {spanLogo && (
                    <span className="relative text-center animate-bounce text-3xl">
                      👆
                    </span>
                  )}
                </form>
                {previewLogo !== "" && (
                  <>
                    <div className="border-2 rounded-md overflow-hidden p-2 bg-white">
                      <StandardImageList
                        eliminarImagenDePreview={
                          eliminarImagenDePreviewLogo
                        }
                        one={true}
                        setImage={setImageLogo}
                        list={previewLogo}
                      />
                    </div>
                    <div
                      className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
                        imageLogo ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() => setImageLogo(null)}
                        className="absolute top-2 right-4 z-[100] text-white"
                      >
                        Atras
                      </button>
                      <img
                        src={imageLogo}
                        alt=""
                        className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover "
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="nombreColegio"
                  className="text-lg font-medium"
                >
                  Video Url
                </label>
                <input
                  type="url"
                  pattern="^((https?|ftp):\/\/)?([a-z0-9]+(\.[a-z0-9]+)+([\/?#][^#\s]*)?)$
                  "
                  name="video"
                  id="video"
                  className="p-3 rounded-md border-2  outline-none"
                  value={multimedia.video_url}
                  onChange={(e) =>
                    setMultimedia({
                      ...multimedia,
                      video_url: e.target.value,
                    })
                  }
                />
              </div>
              <Box
                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              >
                <button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Atrás
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  onClick={handleCompleteMultimedia}
                  sx={{ mr: 1 }}
                  disabled={multimediaCompleted()}
                  className="p-2 bg-[#0061dd] text-white rounded-md px-4 disabled:bg-[#0061dd]/40"
                >
                  Guardar y continuar
                </button>
              </Box>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  </Box>
  )
}
