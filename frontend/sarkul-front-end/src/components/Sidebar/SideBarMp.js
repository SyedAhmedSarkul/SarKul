import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

function SideBarMp() {
  return (
    <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/manpower/manpower-entry">
        <div className="insider">Entry Detail</div>
        </Link>
        <Link to="/manpower/manpower-all" className="link-sb link-sb-mp">
          <div className="insider">All Employee</div>
        </Link>
        <Link to="/manpower/manpower-info" className="link-sb link-sb-mp">
          <div className="insider">Check Info</div>
        </Link>
      </div>
    </div>
  );
}

export default SideBarMp;
