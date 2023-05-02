import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
export const comparadorSlice = createSlice({
  name: "comparador",
  initialState: {
    arrColegios: [],
    Afilia: [],
    Infras: [],
  },
  reducers: {
    getDataColegios: (state, action) => {
      console.log(action.payload);
      const Colegio= Object.assign({}, ...action.payload.Colegio);
      // console.log(data)
      // console.log(data);
      // CountInfraestructuras: 17,
      // CountAfiliaciones: 4
      const data ={
         colegio: Colegio,
         infra:action.payload.CountInfraestructuras,
         Afilia:action.payload.CountAfiliaciones

      }
      console.log(data)

      if (state.arrColegios.length < 3) {
        const arrColegios =  [...state.arrColegios, data]
        const sortColegios = arrColegios.sort((a, b) => b.infra - a.infra);
        console.log(sortColegios)
       
        state.arrColegios =sortColegios;
       
      } 

    },
    getAcreCom: (state, action) => {
      console.log(action.payload);
      const data = Object.assign({}, ...action.payload);
      console.log(data);
      state.Afilia = [...state.Afilia, data];
    },

    deleteSch: (state, action) => {
      console.log(action.payload);
      const id = action.payload;
      console.log(id)
 
 
      state.arrColegios =  state.arrColegios.filter((ele) => ele.colegio.id != id);
     
    },
  },
});

export const { getDataColegios, getAcreCom, deleteSch } =
  comparadorSlice.actions;

export default comparadorSlice.reducer;
