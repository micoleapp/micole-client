import axios from "axios";
import {
  getDataColegios,
  getAcreCom,
  deleteSch,
  ClearSch,
} from "./ComparadorSlice";
import Swal from "sweetalert2";
import SwalProp from "../exports/SwalProp";
export const getDataSchools =
  ({ id }) =>
  (dispatch) => {
    console.log(id);
    try {
      axios
        .get(`/comparador/${id}`)
        .then((res) => dispatch(getDataColegios(res.data)))
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err,
          });
        });
    } catch (err) {
      SwalProp({
        status: false,
        title: "Algo salió mal",
        text: err,
      });
    }

    // dispatch(getDataColegios(colegio));
  };

export const getAcreditacionesComparador = (id) => (dispatch) => {
  try {
    axios

      .get(`/colegios/afiliacion/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getAcreCom(res.data));
      })
      .catch((err) => {
        SwalProp({
          status: false,
          title: "Algo salió mal",
          text: err,
        });
      });
  } catch (err) {
    SwalProp({
      status: false,
      title: "Algo salió mal",
      text: err,
    });
  }
};

export const deleteColegio =
  ({ id }) =>
  (dispatch) => {
    console.log(id);
    dispatch(deleteSch(id));
  };

export const ClearComparador = () => (dispatch) => {
  dispatch(ClearSch());
};
