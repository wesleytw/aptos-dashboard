import React from 'react'
import { useWeb3Context } from '../src/contexts/WalletContext'
import Image from 'next/image'

const Profolio = () => {
  const { iswallet, isconnect, account, balance, tokens, name, transactions, receptions, allTransactions, getAllTransctions, connectWallet, disconnect, sendApt } = useWeb3Context()
  console.log(tokens)
  return (
    <div className=" pt-0 text-3xl">
      <div className=" w-full p-4 bg-apt-dark border border-apt-grey rounded-lg ">
        <p className=" pb-4 border-b border-apt-grey">Tokens </p>
        {(tokens?.length < 1 || !tokens) &&
          <div className=" h-48 w-full p-16 text-2xl text-center text-apt-light-grey">
            No Token Found
          </div>
        }
        {tokens?.map((token, index) => (
          <div className=" h-48 w-full p-16 text-2xl text-center text-apt-light-grey">
            <p className="">{token.data.token_data_id.collection}</p>
            <p className="">{token.data.token_data_id.name}</p>
            {/* <Image width={30} height={30} src={`https://i.imgur.com/P2wG6LO.png`} alt="" /> */}
            <img className=" w-10 h-10" src={`https://www.aptosnames.com/api/img/${token.data.token_data_id.name}`} alt="" />

          </div>
        ))}
        <div className=""></div>
      </div>
      {/* <p className="">Nfts </p>
      <p className="">Names </p> */}
      {/* <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
      <button onClick={() => disconnect()} className="m-4 bg-slate-400">disconnect</button>
      <Image width={14} height={14} src="/icons/aptos_logo.svg" alt="" /> */}
    </div>
  )
}

export default Profolio
