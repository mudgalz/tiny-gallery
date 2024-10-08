import { Link } from "react-router-dom";
import ReactLink from "./reactlink";
import logo from "/tiny.svg";
export default function () {
  return (
    <div className="shadow py-4 sticky top-0 z-10 bg-white px-2 xl:px-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex gap-2">
          <img src={logo} className="size-6" />
          <h1 className="font-medium">Tiny Gallery</h1>
        </Link>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <ReactLink target="_blank" href="https://mudgal.framer.ai">
              I'm Here
            </ReactLink>
          </div>
        </div>
      </div>
    </div>
  );
}
