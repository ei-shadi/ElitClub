import { FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp, FaFacebook } from "react-icons/fa";
import "./SocialBTN.css";
import { Link } from "react-router";

const SocialBTN = () => {
  return (
    <div className="flex items-center gap-4  md:w-full">
      <Link
        to="https://www.facebook.com"
        target="_blank"
        className="socialContainer containerZero" aria-label="Instagram">
        <FaFacebook className="socialIcon" />
      </Link>

      <Link
        to="https://www.instagram.com"
        target="_blank"
        className="socialContainer containerOne" aria-label="Instagram">
        <FaInstagram className="socialIcon" />
      </Link>

      <Link
        to="https://twitter.com"
        target="_blank" className="socialContainer containerTwo" aria-label="Twitter">
        <FaTwitter className="socialIcon" />
      </Link>

      <Link 
        to="https://www.linkedin.com/in" 
        target="_blank" className="socialContainer containerThree" aria-label="LinkedIn">
        <FaLinkedinIn className="socialIcon" />
      </Link>

    </div>
  );
};

export default SocialBTN;