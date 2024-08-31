import { Link } from "react-router-dom";
import logo from "/tiny.svg";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container p-6 mx-auto">
        <div className="flex flex-col items-center text-center gap-2">
          <Link to="/" className="flex gap-2">
            <img src={logo} className="size-6" />
            <h1 className="font-medium">Tiny.js</h1>
          </Link>
          <p className="text-sm text-gray-400">
            &copy; Copyright 2021. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
