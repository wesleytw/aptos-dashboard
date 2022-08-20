import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useWeb3Context } from '../src/contexts/WalletContext'
import { disableScroll, enableScroll } from '../src/utils/disableScroll'
import { shortenAddress } from '../src/utils/shortenAddress'
import Blockies from 'react-blockies';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill, BsPersonFill } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';

const Navbar = () => {
  const router = useRouter()

  const { iswallet, isconnect, account, balance, name, connectWallet, disconnect, sendApt } = useWeb3Context()

  useEffect(() => {
    console.log("nav", isconnect, name, balance, router.pathname)
  }, [isconnect])
  console.log("nav1111")
  return (
    <div className=" z-50 font-maru font-bold text-base">
      <nav className="fixed z-50 flex justify-between items-center h-[60px] w-full px-4 darkglass border-b border-apt-grey ">
        <div className=" ml-5 flex justify-start items-center">
          <Image width={14} height={14} src="/icons/aptos_logo.svg" alt="" />
          <h1 className=" ml-1 text-lg"><span className="text-apt-green">apto</span>themoon</h1>
        </div>
        {!iswallet ? (
          <>
            <label htmlFor="installmartian" onClick={() => disableScroll()} className=" btn btn-xs btn-secondary normal-case border-none text-white">
              Install Wallet
          </label>
            <input type="checkbox" id="installmartian" className="modal-toggle " />
            <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
              <label className="modal-box relative w-[320px] max-w-5xl p-0 bg-accent border border-neutral rounded-lg overflow-hidden shadow-2xl shadow-[#000000ce]" htmlFor="">
                {/* <label htmlFor="installmartian" onClick={() => enableScroll()} className="btn btn-xs btn-circle btn-primary border-none text-white text-2xs overflow-hidden hover:bg-secondary absolute right-3 top-3 "> */}
                <label htmlFor="installmartian" onClick={() => enableScroll()} className="btn btn-xs btn-circle btn-primary border-none text-white text-2xs overflow-hidden opacity-50 hover:opacity-100 absolute right-3 top-3 ">
                  ✕</label>
                <div className="p-3 h-full overflow-hidden px-16  shadow-lg">
                  <p className=" text-lg text-center text-[#a3a3a3]">Install Wallet</p>
                  <p className=" my-12 text-center">It seems like you have not installed Aptos wallet extension.</p>
                  <p className=" mb-2 text-2xs text-center text-apt-light-grey">Supported wallet</p>
                  <a className="mb-4 px-4 py-2 flex justify-start items-center rounded bg-black cursor-pointer"
                    href='https://martianwallet.xyz/' target="_blank" rel="noopener noreferrer">
                    <Image width={20} height={20} src="/icons/martian.svg" alt="" />
                    <p className="ml-2 font-mono text-base">Matian Wallet</p>
                  </a>
                </div>
              </label>
            </label>
          </>
        ) : (
          <>
            {!isconnect ? (
              <button onClick={() => connectWallet()} className=" btn btn-xs btn-secondary normal-case border-none text-black ">
                Connect Wallet</button>
            ) : (
              <button onClick={() => connectWallet()} className="p-[2px] bg-black flex justify-start items-center rounded-lg border-none text-black text-2xs">
                <Blockies
                  seed={account}
                  size={5}
                  scale={3}
                  color="#2ed8a7"
                  bgColor="#F0AB0A"
                  spotColor="#0057ff"
                  className=" ml-2 rounded-full"
                />
                <p className="mx-1">{name ? name : shortenAddress(account)}</p>
                {name}
                <button onClick={() => connectWallet()} className=" btn btn-xs btn-secondary normal-case border-none text-black ">
                  Connect Wallet</button>
              </button>
            )
            }
          </>
        )}
        <div className="p-[2px] bg-black flex justify-start items-center rounded-lg border-none text-black text-sm">
          <p className=" mx-2  normal-case border-none text-white ">
            345 apt</p>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-sm">
              <Blockies
                seed={account}
                size={10}
                scale={2}
                color="#2ed8a7"
                bgColor="#F0AB0A"
                spotColor="#0057ff"
                className="identicon mr-2 rounded-full"
              />
              {/* <p className="mx-1">{name ? name : shortenAddress(account)}</p> */}
              <p className="text-apt-green normal-case">0xackljsclsa</p>
            </label>
            <ul tabIndex="0" className=" mt-2 dropdown-content menu p-2 shadow bg-black text-white rounded-lg w-40">
              <li><a href={`https://explorer.devnet.aptos.dev/account/${account}`} target="_blank" rel="noopener noreferrer"
                className="p-1 text-center justify-center hover:bg-apt-grey">
                <p className="flex items-center">explorer <HiOutlineExternalLink /></p></a></li>
              <li><button className="p-1 text-center justify-center hover:bg-apt-grey"
                onClick={() => disconnect()}>
                disconnect</button></li>
            </ul>
          </div>
        </div>
        {/* {(iswallet && !isconnect) &&
        <button button onClick={() => connectWallet()} className=" btn btn-xs normal-case border-none text-apt-dark bg-apt-green hover:shadow hover:shadow-[#88f6d7] hover:bg-apt-green ">
          Connect Wallet</button>
      } */}
        {/* <button button onClick={() => connectWallet()} className=" btn btn-xs btn-secondary normal-case border-none text-white hover:shadow hover:shadow-[#88f6d7]  ">
          Connect Wallet</button> */}

        {/* <>
        <input type="checkbox" id="my-modal-4" className="modal-toggle " />
        <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
          <label className="modal-box relative h-5/6 w-11/12 max-w-5xl p-0 bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl shadow-[#000000ce]" htmlFor="">
            <label htmlFor="my-modal-4" className="btn btn-sm btn-primary btn-circle border-none text-white overflow-hidden hover:bg-secondary absolute right-4 top-4 ">
              ✕</label>
            <div className="flex h-full justify-center items-center overflow-hidden px-16 bg-[#e9dfdf8e]  shadow-lg">

            </div>
          </label>
        </label>
      </> */}
      </nav >

      <nav className="fixed pt-[76px] h-screen w-60 border-r border-apt-grey bg-apt-dark
        p-4">
        <Link href='/'>
          <div className=" w-full btn btn-primary text-base justify-start hover:bg-apt-grey normal-case text-white">
            <AiFillHome className={`w-5 h-5 mr-3 ${(router.pathname == "/") ? "text-apt-green" : "text-white"}`} />
            Home
          </div>
        </Link>
        <Link href='/profile'>
          <div className=" w-full btn btn-primary text-base justify-start hover:bg-apt-grey normal-case text-white">
            <BsPersonFill className={`w-5 h-5 mr-3 ${(router.pathname == "/profile") ? "text-apt-green" : "text-white"}`} />
            Profile
          </div>
        </Link>
        <Link href='/contacts'>
          <div className=" w-full btn btn-primary text-base justify-start hover:bg-apt-grey normal-case text-white">
            <BsFillPeopleFill className={`w-5 h-5 mr-3 ${(router.pathname == "/contacts") ? "text-apt-green" : "text-white"}`} />
            Contacts
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar