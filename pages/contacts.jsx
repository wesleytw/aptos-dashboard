import React, { useEffect, useState } from 'react'
import { createUser } from '../src/utils/fetchFirebase'
import { useWeb3Context } from '../src/contexts/WalletContext'

const App = () => {
  const { iswallet, isconnect, account, balance, name, connectWallet, disconnect, sendApt, sign } = useWeb3Context()

  return (
    <div className=' ml-60 pt-[60px] min-h-screen font-maru font-bold text-4xl'>
      <div className=" bg-white flex text-blue-500">
        {process.env.NEXT_PUBLIC_FIREBASE_API_KEY}
        <button onClick={() => createUser(account, { me: "45mm", you: new Date(Date.now()) })} className="m-4 bg-slate-400">send</button>
        {/* <button onClick={() => sign()} className="m-4 bg-slate-400">sign</button> */}
      </div>
      <div className="">
        {/* {receive} */}
      </div>


    </div>
  )

}

export default App

