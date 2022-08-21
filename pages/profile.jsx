import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../src/contexts/WalletContext'
import Blockies from 'react-blockies';
import Image from 'next/image'
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Profolio, Activity } from '../components'
import { shortenAddress } from '../src/utils/shortenAddress'


const App = () => {
  const { iswallet, isconnect, account, balance, name, connectWallet, disconnect, sendApt, sign } = useWeb3Context()

  const address = "0x2d34a73c9b6e9ed5733e3a7ecf80a51a0d7dd8eabb0342b441d0d9916ead87fc";
  //0x1e916f3391575b2ae1b968141aa4b35720a0bcc2840120d742e5ba37446f09b3
  const [copy, setCopy] = useState(false)
  const [tabState, setTabState] = useState("activity")

  function handleCopy(obj) {
    setCopy(obj)
    setTimeout(() => {
      setCopy("")
    }, 2000);
  }

  useEffect(() => {

  }, [])


  return (
    <div className=' ml-60 pt-[60px] h-[1800px] font-maru font-bold text-base'>
      <div className=" h-32 bg-gradient-to-t from-black via-apt-dark w-full bg-apt-dark overflow-hidden ">
        <Blockies
          seed={account}
          size={50}
          scale={20}
          color="#2ed8a7"
          bgColor="#F0AB0A"
          spotColor="#0057ff"
          className="identicon -ml-28 -mt-28 rounded-full filter blur-xl "
        />
      </div>
      <div className=" relative bg-apt-dark px-20 pt-8 border-b border-apt-grey">
        <div className=" flex justify-between">
          <div className=" flex w-max min-w-max">
            <div className=" w-min flex justify-between items-center">
              <p className=" text-3xl">{account ? shortenAddress(account) : ""}</p>
              {copy == "account" ? (
                <>
                  <img className="ml-2 h-4 w-4 cursor-pointer" src='/icons/ic_copied.svg' />
                  <div className=" absolute left-[225px] top-3 text-xs font-normal rounded bg-black bg-opacity-70 px-[6px] py-1 shadow">
                    Copied!</div>
                </>
              ) : (
                <img className="ml-2 h-4 w-4 cursor-pointer" src='/icons/ic_copy.svg' onClick={(e) => { navigator.clipboard.writeText(account); handleCopy("account") }} />
              )}
            </div>
            <div className=" relative ml-12 mt-2 w-max flex justify-between items-baseline ">
              {name ? (
                <>
                  <p className=" text-xl">wes.apt</p>
                  {copy == "name" ? (
                    <>
                      <img className="ml-2 h-4 w-4 cursor-pointer" src='/icons/ic_copied.svg' />
                      <div className=" absolute left-[70px] -top-5 text-xs font-normal rounded bg-black bg-opacity-70 px-[6px] py-1 shadow">
                        Copied!</div>
                    </>
                  ) : (
                    <img className="ml-2 h-4 w-4 cursor-pointer" src='/icons/ic_copy.svg' onClick={(e) => { navigator.clipboard.writeText(name); handleCopy("name") }} />
                  )}
                </>
              ) : (
                <a className=" pt-[10px] w-max text-xs min-h-8 text-apt-light-grey flex justify-start items-baseline hover:underline "
                  href='https://www.aptosnames.com/' target="_blank" rel="noopener noreferrer">
                  <p className="">get a .apt name </p>
                  <HiOutlineExternalLink className="pt-[2px]" />
                </a>
              )
              }
            </div>
          </div>
          <a href={`https://explorer.devnet.aptos.dev/account/${account}`} target="_blank" rel="noopener noreferrer">
            <button
              className=" rounded-lg px-2 py-1 text-baseline justify-center items-center hover:bg-apt-grey">
              <p className="flex items-center">View on Explorer <HiOutlineExternalLink />
              </p>
            </button>
          </a>
        </div>
        <Blockies
          seed={account}
          size={8}
          scale={12}
          color="#2ed8a7"
          bgColor="#F0AB0A"
          spotColor="#0057ff"
          className="identicon ml-2 rounded-2xl absolute -top-20 left-16 border-4 border-apt-dark"
        />
        <div className="flex">
          <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[65px] text-sm font-semibold text-center"
            + (tabState == "Profolio" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-apt-light-grey hover:text-white border-0  ')}
            onClick={() => setTabState("Profolio")}>
            Profolio</button>
          <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[63px] text-sm font-semibold text-center"
            + (tabState == "activity" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-apt-light-grey hover:text-white border-0  ')}
            onClick={() => { setTabState("activity") }}>
            Activity</button>
        </div>
      </div>
      <div className="p-10 overflow-hidden  ">
        {tabState == "Profolio" && <Profolio />}
        {tabState == "activity" && <Activity />}
      </div>

    </div>
  )

}

export default App

