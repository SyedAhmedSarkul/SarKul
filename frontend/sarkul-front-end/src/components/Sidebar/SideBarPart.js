import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

function SideBarPart() {
  return (
    <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/parttransaction/branch-to-engineer">
        <div className="insider">Branch To Engineer</div>
        </Link>
        <Link to="/parttransaction/engineer-to-branch" className="link-sb link-sb-mp">
          <div className="insider">Engineer To Branch</div>
        </Link>
        <Link to="/parttransaction/part-transaction-detail" className="link-sb link-sb-mp"> 
          <div className="insider">Transaction Detail</div>
        </Link>
      </div>
    </div>
  );
}

export default SideBarPart;
