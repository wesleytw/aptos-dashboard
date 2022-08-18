import React, { useEffect } from 'react'
import { useWeb3Context } from '../src/context/WalletContext'

const Navbar = () => {
  const { iswallet, isconnect, account, balance, connectWallet, disconnect, sendApt } = useWeb3Context()
  useEffect(() => {
    console.log("nav", isconnect)
  }, [isconnect])
  console.log("nav1111")
  return (
    <div>
      <h3>This is Header{`${isconnect}`}</h3>
      <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
    </div>
  )
}

export default Navbar