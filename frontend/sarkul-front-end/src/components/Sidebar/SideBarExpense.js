import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

function SideBarExpense() {
  const location = useLocation();
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(location.pathname)
  }, [location])
  return (
    <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/expense-entry">
        <div className="insider" style={{ backgroundColor:path.includes('expense-entry') && 'var(--darkblue)',color:path.includes('expense-entry') && 'var(--white)'}}>Entry Expense</div>
        </Link>
        <Link to="/expense-list" className="link-sb link-sb-mp">
          <div className="insider" style={{ backgroundColor:path.includes('expense-list') && 'var(--darkblue)',color:path.includes('expense-list') && 'var(--white)'}}>Expense List</div>
        </Link>
        
      </div>
    </div>
  );
}

export default SideBarExpense;
