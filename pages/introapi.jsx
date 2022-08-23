import React, { useEffect, useState } from 'react'


const App = () => {

  return (
    <div className=' ml-60 pt-[60px] min-h-screen font-maru font-bold text-4xl'>
      <div className="m-16 bg-apt-dark py-12 px-24" >
        <p className="">Api</p>
        <p className="mt-8 text-2xl"><span className="text-apt-green">apto</span>thmoon api provides an easy way to get all send & receive transactions sorted by timestamps.</p>
        <p className="mt-8 mb-1 text-3xl text-apt-green">GET</p>
        <p className="text-2xl break-all">https://aptothemoon.vercel.app/api/getalltransctions/<span className="text-apt-green">&#123;address&#125;</span></p>
      </div>
    </div>
  )

}

export default App

