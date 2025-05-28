import React from 'react'
import { Outlet } from 'react-router-dom'
import Shoppingheader from './header'

function Shoppingloyout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <Shoppingheader/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default Shoppingloyout