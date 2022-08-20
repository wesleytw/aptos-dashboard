import React, { useState } from 'react'
import { useWeb3Context } from '../src/contexts/WalletContext'
import { Trans } from '../components'
const Activity = () => {
  const { iswallet, isconnect, account, balance, name, transactions, receptions, connectWallet, disconnect, sendApt } = useWeb3Context()
  const [tabState, setTabState] = useState("Transactions")
  console.log("transactions", transactions)

  return (
    <div className="px-20  text-3xl">
      {/* <div className=" rounded-lg ">
        <p className=" rounded-lg"></p>
      </div> */}
      <div className=" w-full p-4 bg-apt-dark border border-apt-grey rounded-lg ">
        <div className=" w-max flex rounded-lg bg-black border border-apt-grey ">
          <button className={" px-4 py-2 text-sm font-semibold text-center"
            + (tabState == "Transactions" ? ' text-white' : ' text-apt-light-grey hover:text-white border-0  ')}
            onClick={() => setTabState("Transactions")}>
            Transactions</button>
          <button className={" px-4 py-2 text-sm font-semibold text-center"
            + (tabState == "Reciptions" ? ' text-white' : ' text-apt-light-grey hover:text-white border-0  ')}
            onClick={() => { setTabState("Reciptions") }}>
            Reciptions</button>
        </div>
        {tabState == "Transactions" &&
          <>
            {transactions?.length < 1 ? (
              <div className="">

              </div>
            ) : (
              <div className=" mt-2 rounded-lg w-full border border-apt-grey">
                {transactions?.map((trans, index) => (
                  <Trans key={index} trans={trans} />
                ))}
              </div>
            )
            }
          </>
        }
      </div>
      <p className="">Nfts </p>
      <p className="">Names </p>
      {/* <button onClick={() => connectWallet()} className="m-4 bg-slate-400">connect wallet</button>
      <button onClick={() => disconnect()} className="m-4 bg-slate-400">disconnect</button>
      <Image width={14} height={14} src="/icons/aptos_logo.svg" alt="" /> */}
    </div>
  )
}

export default Activity