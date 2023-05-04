import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import BalanceIcon from "@mui/icons-material/Balance";
import { motion } from "framer-motion";
const IconSnack = ()=> {
  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={50000}
        // onClose={handleClose}
      >
        <motion.div
          className="pb-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.1,
            ease: [0, 0.71, 0.3, 1.02],
          }}
        >
          <div  className="p-4 flex flex-col items-start justify-start bg-white  shadow hover:shadow-lg shadow-2xl rounded-[50%] border-[0.2px] border-[#0061DF] cursor-pointer">
            <BalanceIcon sx={{ color: "#0061DF", height: "2.4vh" }} />
          </div>
        </motion.div>
      </Snackbar>
    </Stack>
  );
}


export default  IconSnack