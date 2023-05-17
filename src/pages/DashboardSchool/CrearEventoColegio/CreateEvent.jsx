import React, { useEffect, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import CircularProgress from "@mui/material/CircularProgress";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getSchoolDetail } from "../../../redux/AuthActions";
import SwalProp from "../../../exports/SwalProp";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { MdDeleteForever } from "react-icons/md";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
export default function CreateEvent({ setActiveUpOne }) {
  const { user, oneSchool,loading } = useSelector((state) => state.auth);
  const id = user.id;

  const dispatch = useDispatch();
  const [hand, setHand] = useState(false);
  const [editEvento, setEditEvento] = useState({});
  const [evento, setEvento] = useState({
    idColegio: id,
    nombreEvento: "",
    descripcionEvento: "",
    tipoEvento: "",
    capacidadEvento: 0,
    fechaEvento: dayjs(new Date()),
    horaEvento: "08:00",
    image: "",
  });

  const [change, setChange] = useState(false);
  const [previewEvento, setPreviewEvento] = useState(null);
  const [fileEditEvento, setFileEditEvento] = useState(null);
  const [previewEditEvento, setPreviewEditEvento] = useState(null);
  const [dateEvento, setDateEvento] = React.useState(dayjs(new Date()));
  const [timeEvento, setTimeEvento] = React.useState(
    dayjs("2014-08-18T08:00:00")
  );
  const [dateEditEvento, setDateEditEvento] = React.useState(dayjs(new Date()));
  const [timeEditEvento, setTimeEditEvento] = React.useState(
    dayjs("2014-08-18T08:00:00")
  );
  const [fileEvento, setFileEvento] = useState(null);
  const [spanOne, setSpanOne] = useState(false);
  const [succesEditImage, setSuccesEditImage] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const disableEvento = () => {
    if (
      evento.nombreEvento !== "" &&
      evento.descripcionEvento !== "" &&
      evento.tipoEvento !== "" &&
      evento.capacidadEvento !== 0 &&
      evento.fechaEvento !== "" &&
      evento.horaEvento !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const stringyDate = (date) => {
    if (date.toString().length === 1) {
      return "0" + date++;
    } else {
      return date;
    }
  };
  const handleChangeDate = (newValue) => {
    setDateEvento(dayjs(newValue));
    setEvento({
      ...evento,
      fechaEvento: [
        stringyDate(newValue["$D"]).toString(),
        stringyDate(newValue["$M"] + 1).toString(),
        newValue["$y"].toString(),
      ].join("/"),
    });
  };

  const handleChangeTime = (newValue) => {
    setTimeEvento(dayjs(newValue));
    setEvento({
      ...evento,
      horaEvento: [
        stringyDate(newValue["$H"]).toString(),
        stringyDate(newValue["$m"]).toString(),
      ].join(":"),
    });
  };
  const handleChangeDateEdit = (newValue) => {
    setDateEditEvento(dayjs(newValue));
    setEditEvento({
      ...editEvento,
      fechaEvento: [
        stringyDate(newValue["$D"]).toString(),
        stringyDate(newValue["$M"] + 1).toString(),
        newValue["$y"].toString(),
      ].join("/"),
    });
  };
  const handleSubmitEvento = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/eventos", evento)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text: "Evento creado!",
          });
          dispatch(getSchoolDetail(id));
          setEvento({
            idColegio: id,
            nombreEvento: "",
            descripcionEvento: "",
            tipoEvento: "",
            capacidadEvento: 0,
            fechaEvento: dayjs(new Date()),
            horaEvento: "08:00",
            image: "",
          });
          setFileEvento(null);
          setPreviewEvento(null);
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Ups!...",
            text: "Algo salió mal!",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilesSubmitEvento = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", previewEvento);
      formData.append("upload_preset", "tcotxf16");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
        formData
      );
      setEvento({ ...evento, image: res.data.secure_url });
    } catch (error) {
      console.log(error);
      SwalProp({
        status: false,
        title: "Algo salió mal",
        text: "Intenta nuevamente",
      });
    }
    SwalProp({
      status: true,
      title: "Éxito",
      text: "Imagen subida!",
    });
    setSpanOne(false);
    setActiveUpOne(false);
  };
  const handleFilesSubmitEditEvento = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", previewEditEvento);
      formData.append("upload_preset", "tcotxf16");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
        formData
      );
      setEditEvento({ ...editEvento, image: res.data.secure_url });
      setHand(false);
      setSuccesEditImage(true);
    } catch (error) {
      console.log(error);
    }
    setSpanOne(false);
    setActiveUpOne(false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setEditEvento({});
    setOpenModal(false);
  };

  const handleSubmitEditEvento = (id) => {
    if (change) {
      try {
        axios
          .put(`/eventos/${id}`, editEvento)
          .then((res) => {
            SwalProp({
              status: true,
              title: "Éxito",
              text: "Evento editado!",
            });
            dispatch(getSchoolDetail(user.id));
          })
          .catch((err) => {
            SwalProp({
              status: false,
              title: "Ups!...",
              text: "Algo salió mal!",
            });
          });
      } catch (error) {
        console.log(error);
      }
      handleCloseModal();
      setHand(false);
      setSuccesEditImage(false);
      setChange(false);
    } else {
      const horaEvento = [
        stringyDate(editEvento.horaEvento["$H"]).toString(),
        stringyDate(editEvento.horaEvento["$m"]).toString(),
      ].join(":");
      const newEvent = { ...editEvento, horaEvento };
      console.log(newEvent);
      console.log(editEvento);
      try {
        axios
          .put(`/eventos/${id}`, newEvent)
          .then((res) => {
            SwalProp({
              status: true,
              title: "Éxito",
              text: "Evento editado!",
            });
            dispatch(getSchoolDetail(user.id));
          })
          .catch((err) => {
            SwalProp({
              status: false,
              title: "Ups!...",
              text: "Algo salió mal!",
            });
          });
      } catch (error) {
        console.log(error);
      }
      handleCloseModal();
      setHand(false);
      setSuccesEditImage(false);
      setChange(false);
    }
  };
  const handleChangeTimeEdit = (newValue) => {
    setChange(true);
    setTimeEditEvento(dayjs(newValue));
    setEditEvento({
      ...editEvento,
      horaEvento: [
        stringyDate(newValue["$H"]).toString(),
        stringyDate(newValue["$m"]).toString(),
      ].join(":"),
    });
  };
  const handleEdit = (id) => {
    handleOpenModal();
    const editEventoNew = oneSchool?.Eventos?.find((e) => e.id === id);

    const newFecha = "2014-08-18T" + editEventoNew.hora_evento + ":00";
    setTimeEditEvento(dayjs(newFecha));
    setDateEditEvento(editEventoNew.fecha_evento);
    setEditEvento({
      idColegio: editEventoNew.id,
      nombreEvento: editEventoNew.nombre_evento,
      descripcionEvento: editEventoNew.descripcion,
      tipoEvento: editEventoNew.tipo_evento,
      capacidadEvento: editEventoNew.capacidad,
      fechaEvento: dateEditEvento,
      horaEvento: timeEditEvento,
      image: editEventoNew.imagen_evento,
    });
  };

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar!",
        denyButtonText: `No`,
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(`/eventos/${id}`)
            .then((res) => {
              dispatch(getSchoolDetail(user.id));
              SwalProp({
                status: true,
                title: "Éxito",
                text: "Evento eliminado!",
              });
            })
            .catch((err) => {
              SwalProp({
                status: false,
                title: "Ups!...",
                text: "Algo salió mal!",
              });
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (fileEvento !== null && fileEvento !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(fileEvento);
      reader.onloadend = () => {
        setPreviewEvento(reader.result);
      };
    }
  }, [fileEvento]);

  useEffect(() => {
    if (fileEditEvento !== null && fileEditEvento !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(fileEditEvento);
      reader.onloadend = () => {
        setPreviewEditEvento(reader.result);
        setHand(true);
      };
    }
  }, [fileEditEvento]);

  return (
    <div className="min-h-screen p-10 flex flex-col gap-5">
      <h1 className="text-xl font-medium">Crear nuevo evento</h1>
      <p>Si no agregas una imagen se crea una plantilla por default</p>
      <div className="flex flex-col lg:flex-row gap-5">
        <form onSubmit={handleFilesSubmitEvento} className="flex flex-col">
          <div className="file-select flex w-full lg:min-w-[200px] ">
            <label
              htmlFor="image"
              className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
            >
              <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
              <span className="text-sm mx-auto text-center text-[#0061dd]">
                Agregar imagen
              </span>{" "}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png,image/jpeg"
              onChange={(e) => {
                setSpanOne(true);
                setFileEvento(e.target.files[0]);
              }}
              className="hidden"
            />
          </div>
          {fileEvento !== null && (
            <button
              type="submit"
              disabled={previewEvento == null}
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
          {previewEvento !== null && (
            <img
              src={previewEvento}
              alt=""
              className="object-cover mt-2 rounded-md"
            />
          )}
        </form>
        <form className="flex flex-col w-full gap-2">
          <label htmlFor="nombreEvento" className="font-medium">
            Nombre del Evento
          </label>
          <input
            type="text"
            value={evento.nombreEvento}
            id="nombreEvento"
            className="p-3 rounded-md border-2  outline-none"
            onChange={(e) => {
              setEvento({ ...evento, nombreEvento: e.target.value });
            }}
          />
          <label className="font-medium" htmlFor="descripcionEvento">
            Breve descripción del evento
          </label>
          <textarea
            value={evento.descripcionEvento}
            id="descripcionEvento"
            className="p-3 rounded-md border-2  outline-none"
            onChange={(e) => {
              setEvento({ ...evento, descripcionEvento: e.target.value });
            }}
          />
          <div className="lg:grid grid-cols-3 gap-5 flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="tipoEvento" className="font-medium">
                Tipo de evento
              </label>
              <input
                type="text"
                value={evento.tipoEvento}
                id="tipoEvento"
                className="p-3 rounded-md border-2  outline-none"
                onChange={(e) => {
                  setEvento({ ...evento, tipoEvento: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="capacidadEvento" className="font-medium">
                Capacidad
              </label>
              <input
                type="number"
                value={evento.capacidadEvento}
                id="capacidadEvento"
                className="p-3 rounded-md border-2  outline-none"
                onChange={(e) => {
                  setEvento({
                    ...evento,
                    capacidadEvento: e.target.value,
                  });
                }}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex w-full items-center justify-between mt-4  flex-col gap-4 lg:flex-row">
                <MobileDatePicker
                  label="Elegir fecha"
                  value={dateEvento}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  disablePast
                  onChange={handleChangeDate}
                  className="bg-white"
                />
                <MobileTimePicker
                  label="Elegir hora"
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                  value={timeEvento}
                  className="bg-white"
                  onChange={handleChangeTime}
                />
              </div>
            </LocalizationProvider>
          </div>
          <button
            type="button"
            onClick={handleSubmitEvento}
            disabled={disableEvento()}
            className="p-2 mt-2 mx-auto lg:mx-0 w-fit bg-[#0061dd] text-white rounded-md disabled:bg-[#0061dd]/40"
          >
            Crear evento{" "}
          </button>
        </form>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-center text-2xl font-medium">
            Cargando nuevos eventos...
          </h1>
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <>
          <h1 className="text-xl font-medium">Historial de eventos</h1>
          {oneSchool?.Eventos?.length > 0 ? (
            <div className="flex flex-col mx-10 gap-5">
              {oneSchool?.Eventos?.map((evento) => (
                <div className="flex lg:flex-row flex-col w-full items-center p-3 justify-around shadow-md bg-white rounded-md gap-2">
                  {evento.imagen_evento !== "" ? (
                    <img
                      src={evento.imagen_evento}
                      alt={evento.nombre_evento}
                      className="rounded-full w-24 h-24 object-cover"
                    />
                  ) : oneSchool.logo !== null ? (
                    <img
                      src={oneSchool.logo}
                      alt={oneSchool.nombre_colegio}
                      className="rounded-full w-24 h-24 object-cover"
                    />
                  ) : null}
                  <div className="flex flex-col text-center lg:text-start gap-2">
                    <h2 className="font-semibold">{evento.nombre_evento}</h2>
                    <div className="flex gap-2">
                      <small className="font-medium">
                        Fecha:{" "}
                        <span className="font-normal">
                          {evento.fecha_evento}
                        </span>{" "}
                      </small>
                      <small className="font-medium">
                        Hora:{" "}
                        <span className="font-normal">
                          {" "}
                          {evento.hora_evento}
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <small className="font-medium">
                      Capacidad:{" "}
                      <span className="font-normal">{evento.capacidad}</span>{" "}
                    </small>
                    <small className="font-medium">
                      Inscriptos: <span className="font-normal">123</span>{" "}
                    </small>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(evento.id)}
                      className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20"
                    >
                      Editar
                    </button>
                    <MdDeleteForever
                      onClick={() => handleDelete(evento.id)}
                      className="text-[#0061dd] text-4xl cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>No hay eventos creados</h1>
          )}
        </>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="flex flex-col lg:flex-row gap-5">
            <form
              onSubmit={handleFilesSubmitEditEvento}
              className="flex flex-col"
            >
              <div className="file-select flex w-full lg:min-w-[200px] ">
                <label
                  htmlFor="imageEdit"
                  className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
                >
                  <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                  <span className="text-sm mx-auto text-center text-[#0061dd]">
                    Modificar imagen
                  </span>{" "}
                </label>
                <input
                  type="file"
                  id="imageEdit"
                  name="imageEdit"
                  accept="image/png,image/jpeg"
                  onChange={(e) => {
                    setFileEditEvento(e.target.files[0]);
                  }}
                  className="hidden"
                />
              </div>
              {hand && (
                <button
                  type="submit"
                  disabled={previewEditEvento == null}
                  className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
                >
                  Upload
                </button>
              )}

              {hand && (
                <span className="relative text-center animate-bounce text-3xl">
                  👆
                </span>
              )}

              <img
                src={editEvento.image}
                alt=""
                className="object-cover mt-2 rounded-md"
              />
              {succesEditImage && (
                <span className="text-green-500 text-sm">
                  Imagen modificada con exito
                </span>
              )}
            </form>
            <form className="flex flex-col w-full gap-2">
              <label htmlFor="nombreEvento" className="font-medium">
                Nombre del Evento
              </label>
              <input
                type="text"
                value={editEvento.nombreEvento}
                id="nombreEvento"
                className="p-3 rounded-md border-2  outline-none"
                onChange={(e) => {
                  setEditEvento({
                    ...editEvento,
                    nombreEvento: e.target.value,
                  });
                }}
              />
              <label htmlFor="descripcionEvento" className="font-medium">
                Breve descripción del evento
              </label>
              <textarea
                value={editEvento.descripcionEvento}
                id="descripcionEvento"
                className="p-3 rounded-md border-2  outline-none"
                onChange={(e) => {
                  setEditEvento({
                    ...editEvento,
                    descripcionEvento: e.target.value,
                  });
                }}
              />
              <div className="gap-5 flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="tipoEvento" className="font-medium">
                    Tipo de evento
                  </label>
                  <input
                    type="text"
                    value={editEvento.tipoEvento}
                    id="tipoEvento"
                    className="p-3 rounded-md border-2  outline-none"
                    onChange={(e) => {
                      setEditEvento({
                        ...editEvento,
                        tipoEvento: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="capacidadEvento" className="font-medium">
                    Capacidad
                  </label>
                  <input
                    type="number"
                    value={editEvento.capacidadEvento}
                    id="capacidadEvento"
                    className="p-3 rounded-md border-2  outline-none"
                    onChange={(e) => {
                      setEditEvento({
                        ...editEvento,
                        capacidadEvento: e.target.value,
                      });
                    }}
                  />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex w-full items-center justify-between mt-4  flex-col gap-4 lg:flex-row">
                    <MobileDatePicker
                      label="Elegir fecha"
                      value={dateEditEvento}
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => <TextField {...params} />}
                      disablePast
                      onChange={handleChangeDateEdit}
                      className="bg-white"
                    />
                    <MobileTimePicker
                      label="Elegir hora"
                      renderInput={(params) => <TextField {...params} />}
                      ampm={false}
                      value={timeEditEvento}
                      className="bg-white"
                      onChange={handleChangeTimeEdit}
                    />
                  </div>
                </LocalizationProvider>
              </div>
              <button
                type="button"
                onClick={() => handleSubmitEditEvento(editEvento.idColegio)}
                className="p-2 mt-2 mx-auto lg:mx-0 w-fit bg-[#0061dd] text-white rounded-md disabled:bg-[#0061dd]/40"
              >
                Modificar evento{" "}
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
