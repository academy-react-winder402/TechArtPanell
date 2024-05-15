// ** Icons Import
import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        COPYRIGHT © {new Date().getFullYear()}{" "}
        <a
          href="https://1.envato.market/pixinvent_portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pixinvent
        </a>
        <span className="d-none d-sm-inline-block">
          , تمامی حقوق این وبسایت محفوظ می باشد
        </span>
      </span>
      <span className="float-md-end d-none d-md-block">
        Tech Art
        <Heart size={14} />
      </span>
    </p>
  );
};

export default Footer;