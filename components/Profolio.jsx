import React from 'react'
import { useWeb3Context } from '../src/contexts/WalletContext'

const Profolio = () => {
  const { iswallet, isconnect, account, balance, tokens, name, transactions, receptions, allTransactions, getAllTransctions, connectWallet, disconnect, sendApt } = useWeb3Context()
  console.log(tokens)
  return (
    <div className="p-20 pt-0 text-3xl">
      <div className=" w-full p-4 bg-apt-dark border border-apt-grey rounded-2xl ">
        <p className=" border-b border-apt-grey">Tokens </p>
        <div className=""></div>
      </div>
      <p className="">Nfts </p>
      <p className="">Names </p>
      {/* <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
      <button onClick={() => disconnect()} className="m-4 bg-slate-400">disconnect</button>
      <Image width={14} height={14} src="/icons/aptos_logo.svg" alt="" /> */}
    </div>
  )
}

export default Profolio
