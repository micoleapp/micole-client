import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const updateLocalStorage = (state) => {
  window.localStorage.setItem("arrColegios", JSON.stringify(state));
};

export const comparadorSlice = createSlice({
  name: "comparador",
  initialState: {
    arrColegios: JSON.parse(window.localStorage.getItem("arrColegios")) || [],
    Afilia: [],
    Infras: [],
  },
  reducers: {
    getDataColegios: (state, action) => {
      const Colegio = Object.assign({}, ...action.payload.Colegio);

      const data = {
        colegio: Colegio,
        infra: action.payload.CountInfraestructuras,
        Afilia: action.payload.CountAfiliaciones,
      };

      const ColegioRepetido = state.arrColegios.some(
        (ele) => ele.colegio.id === data.colegio.id
      );

      if (ColegioRepetido === false && state.arrColegios.length < 3) {
        const arrColegios = [...state.arrColegios, data];
        const sortColegios = arrColegios.sort((a, b) => b.infra - a.infra);

        state.arrColegios = sortColegios;
        updateLocalStorage(state.arrColegios);
      }
    },
    getAcreCom: (state, action) => {
      console.log(action.payload);
      const data = Object.assign({}, ...action.payload);
      console.log(data);
      state.Afilia = [...state.Afilia, data];
    },

    deleteSch: (state, action) => {
      const id = action.payload;
      console.log(id);

      state.arrColegios = state.arrColegios.filter(
        (ele) => ele.colegio.id != id
      );
      updateLocalStorage(state.arrColegios);
    },
    ClearSch: (state, action) => {
      state.arrColegios = [];
      updateLocalStorage([]);
    },
  },
});

export const { getDataColegios, getAcreCom, deleteSch, ClearSch } =
  comparadorSlice.actions;

export default comparadorSlice.reducer;
