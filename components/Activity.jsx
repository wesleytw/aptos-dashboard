import React, { useState } from 'react'
import { useWeb3Context } from '../src/contexts/WalletContext'
import { Trans } from '../components'
const Activity = () => {
  const { iswallet, isconnect, account, balance, name, transactions, receptions,getAllTransctions, connectWallet, disconnect, sendApt } = useWeb3Context()
  const [tabState, setTabState] = useState("Transactions")
  async function fe(){

    console.log("transactions", transactions,receptions
    ,await getAllTransctions(account)
    )
  }
fe()


  return (
    <div className=" text-3xl">
      <div className=" w-full p-4 bg-apt-dark border border-apt-grey rounded-lg ">
        <div className=" w-max flex rounded-lg bg-black border border-apt-grey ">
          <button className={" px-4 py-2 text-sm font-semibold text-center"
            + (tabState == "Transactions" ? ' text-white' : ' text-apt-light-grey hover:text-white border-0  ')}
            onClick={() => setTabState("Transactions")}>
            Transactions</button>
          <button className={" px-4 py-2 text-sm font-semibold text-center"
            + (tabState == "Receptions" ? ' text-white' : ' text-apt-light-grey hover:text-white border-0  ')}
            onClick={() => { setTabState("Receptions") }}>
            Receptions</button>
        </div>
        {tabState == "Transactions" &&
          <>
            {transactions?.length < 1 ? (
              <div className=" h-48 w-full p-16 text-2xl text-center text-apt-light-grey">
                No Activity
              </div>
            ) : (
              <div className=" mt-2 rounded-lg w-full border border-apt-grey overflow-hidden">
                {transactions?.map((trans, index) => (
                  <Trans key={index} onetrans={trans} isReceive={false} />
                ))}
              </div>
            )
            }
          </>
        }
        {tabState == "Receptions" &&
          <>
            {receptions?.length < 1 ? (
              <div className=" h-48 w-full p-16 text-2xl text-center text-apt-light-grey">
                No Activity
              </div>
            ) : (
              <div className=" mt-2 rounded-lg w-full border border-apt-grey">
                {receptions?.map((trans, index) => (
                  <Trans key={index} onetrans={trans} isReceive={true} />
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
