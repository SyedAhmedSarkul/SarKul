import React from 'react'
import { Link } from 'react-router-dom'

function SideBarStock() {
  return (
    <div>
        <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/stockmanagement/stock-entry">
        <div className="insider">Stock Entry</div>
        </Link>
        <Link to="/stockmanagement/current-stock" className="link-sb link-sb-mp">
          <div className="insider">Current Stock</div>
        </Link>
       
      </div>
    </div>
    </div>
  )
}

export default SideBarStock