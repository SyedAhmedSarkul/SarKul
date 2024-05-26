import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

function SideBarPart() {

  const location = useLocation();
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  return (
    <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/parttransaction/branch-to-engineer">
          <div className="insider" style={{ backgroundColor: path.includes('branch-to-engineer') && 'var(--darkblue)', color: path.includes('branch-to-engineer') && 'var(--white)' }}>Branch To Engineer</div>
        </Link>
        <Link to="/parttransaction/engineer-to-branch" className="link-sb link-sb-mp">
          <div className="insider" style={{ backgroundColor: path.includes('engineer-to-branch') && 'var(--darkblue)', color: path.includes('engineer-to-branch') && 'var(--white)' }} >Engineer To Branch</div>
        </Link>
        <Link to="/parttransaction/part-transaction-detail" className="link-sb link-sb-mp">
          <div className="insider" style={{ backgroundColor: path.includes('part-transaction-detail') && 'var(--darkblue)', color: path.includes('part-transaction-detail') && 'var(--white)' }}>Transaction Detail</div>
        </Link>
      </div>
    </div>
  );
}

export default SideBarPart;
