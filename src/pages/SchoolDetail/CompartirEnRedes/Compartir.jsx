import React, { useState } from "react";
import {
  WhatsappShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

import {
  faFacebookF,
  faLinkedinIn,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

export default function Compartir({ url }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="pl-1 flex pt-10  pb-2 flex-row ">
      <span className="flex items-center gap-0">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            textTransform: "capitalize",
            color: "#696969",
            fontFamily: "Poppins",
            fontSize: "1.9vh",
            fontWeight: "400",
          }}
        >
          <ShareOutlinedIcon sx={{ color: "#696969", padding: "2px" }} />
          Compartir
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            {" "}
            <WhatsappShareButton url={url}>
              <FontAwesomeIcon
                color="#00bb2d"
                size="xl"
                className="mr-3"
                icon={faWhatsapp}
              />
              WhatsApp
            </WhatsappShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <FacebookMessengerShareButton url={url}>
              <FontAwesomeIcon
                color="#3b5998"
                size="xl"
                className="mr-5"
                icon={faFacebookF}
              />
              Facebook
            </FacebookMessengerShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <EmailShareButton url={url}>
              <FontAwesomeIcon className="mr-4" icon={faMailBulk} />
              Email
            </EmailShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <LinkedinShareButton url={url}>
              <FontAwesomeIcon
                className="mr-4"
                size="xl"
                color="#0e76a8"
                icon={faLinkedinIn}
              />
              Linkedin
            </LinkedinShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <TelegramShareButton url={url}>
              <FontAwesomeIcon
                className="mr-3"
                color="#229ED9"
                size="xl"
                icon={faTelegram}
              />
              Telegram
            </TelegramShareButton>
          </MenuItem>
        </Menu>
      </span>
      <span className="flex items-center pl-3 gap-0">
        {" "}
        <FavoriteBorderOutlinedIcon sx={{ color: "#696969", padding: "2px" }} />
        <p className="pl-1  text-[#696969] m-0 text-[1.9vh]">Favoritos</p>
      </span>
    </div>
  );
}
