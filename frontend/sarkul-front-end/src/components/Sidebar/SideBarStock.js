import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function SideBarStock() {

  const location = useLocation();
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  return (
    <div>
        <div className="sidebar-right">
      <div className="insider-div">
        <Link to="/stockmanagement/stock-entry">
        <div className="insider" style={{ backgroundColor:path.includes('stock-entry') && 'var(--darkblue)',color:path.includes('stock-entry') && 'var(--white)'}}>Stock Entry</div>
        </Link>
        <Link to="/stockmanagement/current-stock" className="link-sb link-sb-mp">
          <div className="insider"  style={{ backgroundColor:path.includes('current-stock') && 'var(--darkblue)',color:path.includes('current-stock') && 'var(--white)'}}>Current Stock</div>
        </Link>
       
      </div>
    </div>
    </div>
  )
}

export default SideBarStock