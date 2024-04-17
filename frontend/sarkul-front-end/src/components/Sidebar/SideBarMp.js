import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

function SideBarMp() {
  const location = useLocation();
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(location.pathname)
  }, [location])
  return (
    <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/manpower/manpower-entry">
        <div className="insider" style={{ backgroundColor:path.includes('manpower-entry') && 'var(--darkblue)',color:path.includes('manpower-entry') && 'var(--white)'}}>Entry Detail</div>
        </Link>
        <Link to="/manpower/manpower-all" className="link-sb link-sb-mp">
          <div className="insider" style={{ backgroundColor:path.includes('manpower-all') && 'var(--darkblue)',color:path.includes('manpower-all') && 'var(--white)'}}>All Employee</div>
        </Link>
        <Link to="/manpower/manpower-info" className="link-sb link-sb-mp">
          <div className="insider" style={{ backgroundColor:path.includes('manpower-info') && 'var(--darkblue)',color:path.includes('manpower-info') && 'var(--white)'}}>Check Info</div>
        </Link>
      </div>
    </div>
  );
}

export default SideBarMp;
