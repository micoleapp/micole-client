import React, { useState } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: '80%',
  minWidth: "40vh",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 1,
  maxHeight: "90vh",
  overflowY: "scroll",
  gap: "2vh",
};
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";


export default function ModalLeadsExternos({ open, handleClose }) {
  const { grados } = useSelector((state) => state.schools);
  const yearNow = new Date().getFullYear();
  const [filterAño, setfilterAño] = useState("");
  const [filterGrado, setfilterGrado] = useState("");
  const [modo, setModo] = React.useState(true);
  const handleChangeState = (event) => {
    setfilterAño(event.target.value);
  };
  const handleChangeStateGrado = (event) => {
    setfilterGrado(event.target.value);
  };

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  const OnSubmit = async (cita) => {
    const newLead = {
      date: "",
      time: "",
      modo: modo ? "Presencial" : "Virtual",
      nombre: cita.name,
      celular: cita.celular,
      correo: cita.email,
      añoIngreso: filterAño,
      grado: filterGrado,
    };
    console.log(newLead);
  };
  const handleModo = () => {
    setModo(!modo);
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styles}>
        <h1 className="text-[2.5vh] text-[#0D263B] p-2 font-semibold">
          Añadir Cita
        </h1>
        <h1 className="pl-[1vh] w-full text-start text-[1.9vh]">
          Datos Personales
        </h1>
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col p-2 gap-2 justify-center items-center"
        >
          <input
            placeholder="Nombre"
            {...register("name", {
              required: true,
              maxLength: 100,
            })}
            className="text-[1.8vh] placeholder:text-[1.9vh] placeholder:text-[#6e6d6de8]  font-normal placeholder:pl-2   w-full h-[5vh] outline-[#ffff] border-solid border-[1px] rounded-[2px] border-[#99999966] "
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            {...register("email", {
              required: true,
              maxLength: 100,
            })}
            className="text-[1.8vh] placeholder:text-[1.9vh] placeholder:text-[#6e6d6de8]  font-normal placeholder:pl-2   w-full h-[5vh] outline-[#ffff] border-solid border-[1px] rounded-[2px] border-[#99999966] "
          />
          <input
            type="number"
            placeholder="Telefono"
            {...register("celular", {
              required: true,
              maxLength: 100,
            })}
            className="text-[1.8vh] placeholder:text-[1.9vh] placeholder:text-[#6e6d6de8]  font-normal placeholder:pl-2   w-full h-[5vh] outline-[#ffff] border-solid border-[1px] rounded-[2px] border-[#99999966] "
          />
          <h1 className="w-full text-start text-[1.9vh]">Modalidad</h1>
          <div className="flex gap-5">
            <input
              type="button"
              value={"Presencial"}
              className={`border w-[120px] ${
                modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
              } py-2 rounded-md shadow-lg duration-300`}
              onClick={handleModo}
              disabled={modo}
            />
            <input
              type="button"
              value={"Virtual"}
              className={`border w-[120px] py-2 rounded-md shadow-lg ${
                !modo ? "bg-[#0061dd] text-white" : "cursor-pointer"
              } duration-300`}
              onClick={handleModo}
              disabled={!modo}
            />
          </div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
   
        <DatePicker label="Basic date picker" />
    
    </LocalizationProvider> */}
          <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
            <InputLabel id="demo-select-small">Grado</InputLabel>

            <Select
              sx={{ border: "none", outline: "none" }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={filterGrado}
              label={"Grado"}
              onChange={handleChangeStateGrado}
            >
              {grados?.map((g) => (
                <MenuItem value={g.id}>{g.nombre_grado} </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
            <InputLabel id="demo-select-small">Año</InputLabel>

            <Select
              sx={{ border: "none", outline: "none" }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={filterAño}
              label={"Año"}
              onChange={handleChangeState}
            >
              <MenuItem value={yearNow}>{yearNow} </MenuItem>
              <MenuItem value={yearNow + 1}>{yearNow + 1} </MenuItem>
              <MenuItem value={yearNow + 2}>{yearNow + 2} </MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Agregar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}