import React from 'react'
import Image from 'next/image'
import { disableScroll, enableScroll } from '../src/utils/disableScroll'

const Modalinstall = () => {
  return (
    <>
      <input type="checkbox" id="installmartian" className="modal-toggle " />
      <label htmlFor="installmartian" onClick={() => enableScroll()} className="fixed modal cursor-pointer white-glassmorphism">
        <label className="modal-box relative w-[380px] max-w-5xl p-0 bg-accent border border-neutral rounded-lg overflow-hidden shadow-2xl shadow-[#000000ce]" htmlFor="">
          <label htmlFor="installmartian" onClick={() => enableScroll()} className="btn btn-xs btn-circle btn-primary border-none text-white text-2xs overflow-hidden opacity-50 hover:opacity-100 absolute right-4 top-4 ">
            ✕</label>
          <div className=" p-4 h-full overflow-hidden px-16 shadow-lg">
            <p className=" text-lg text-center text-[#a3a3a3]">Install Wallet</p>
            <p className=" my-9 text-center">It seems like you have not installed Aptos wallet extension.</p>
            <p className=" mb-2 text-2xs text-center text-apt-light-grey">Supported wallets</p>
            <a className=" mb-4 px-4 py-2 flex justify-center items-center rounded bg-black cursor-pointer"
              href='https://martianwallet.xyz/' target="_blank" rel="noopener noreferrer">
              <Image width={20} height={20} src="/icons/martian.svg" alt="" />
              <p className="ml-2 font-mono text-base ">Matian Wallet<span className="items-start ml-1 badge badge-warning badge-sm">beta</span></p>
            </a>
            <a className=" mb-4 px-4 py-2 flex justify-center items-center rounded bg-black cursor-pointer"
              href='https://github.com/aptos-labs/aptos-core/releases/' target="_blank" rel="noopener noreferrer">
              {/* <Image width={20} height={20} src="/icons/martian.svg" alt="" /> */}
              <p className="ml-2 font-mono text-base ">Official Petra Wallet</p>
            </a>
          </div>
        </label>
      </label>
    </>
  )
}

export default Modalinstall
