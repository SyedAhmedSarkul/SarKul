import React from 'react'
import SideBarMain from '../Sidebar/SideBarMain';
import SideBarStock from '../Sidebar/SideBarStock';

function StockManagementPage() {
  return (
    <div className='stock-page'>
      <SideBarMain/>
      <SideBarStock/>
      </div>
  )
}

export default StockManagementPage;