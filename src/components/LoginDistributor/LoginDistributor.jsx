import { useState } from "react";
import { createContext, useContext } from "react";
import FormLogin from "../FormLogin/FormLogin";
import PassRecovery from "../PassRecovery/PassRecovery";
import ResetPassword from "../ResetPassword/ResetPassword";

export const RecoveryContext = createContext();
function LoginDistributor({handlerOpenLogin, setOpenLogin, handlerClose, OpenLogin} ) {
  console.log(setOpenLogin)
  console.log(handlerClose)
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  console.log(email);

  function NavigateComponents() {
    if (page === "login") return <FormLogin handlerOpenLogin={handlerOpenLogin} setOpenLogin={setOpenLogin} handlerClose={handlerClose} OpenLogin={OpenLogin}/>;
    if (page === "otp") return <PassRecovery />;
    if (page === "reset") return <ResetPassword />;

    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div >
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
}

export default LoginDistributor ;