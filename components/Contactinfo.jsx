import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { shortenAddress } from '../src/utils/shortenAddress'
import { useWeb3Context } from '../src/contexts/WalletContext'
import Blockies from 'react-blockies';

const Contactinfo = ({ contact }) => {
  const [copy, setCopy] = useState(false)
  const [inputs, setInputs] = useState({});
  const [submitState, setSubmitState] = useState("")
  const { iswallet, isconnect, account, balance, name, connectWallet, disconnect, sendApt, sign } = useWeb3Context()


  const handleChange = (event) => {
    // if (submitState != "") return
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState("submitting")
    console.log("submitting...", submitState,contact.inputAddr, inputs.amount)
    try {
      sendApt(contact.inputAddr, inputs.amount)
      // sendApt("0xe2b35ff19490e7d1e745f499d954b185411575620ac7fbe17c94d122330d84d5","23")
      setSubmitState("")
    } catch (error) {
      console.log(error, account)
      setSubmitState("")
    }
  }

  function handleCopy(obj) {
    setCopy(obj)
    setTimeout(() => {
      setCopy("")
    }, 2000);
  }

  let btnSubmit
  if ((submitState == "submitting")) {
    btnSubmit = <button
      className=" loading btn btn-xs btn-neutral rounded normal-case font-semibold border-none">
      Sending</button>
  } else {
    btnSubmit = <input
      type="submit" value="Send"
      className={`btn btn-xs btn-neutral rounded normal-case font-semibold border-none`}
    />
  }
  // console.log("contact", contact)
  return (
    <div className="pb-0 pt-4 mx-4">
      <div className=" flex justify-between border-b border-apt-grey">
        <div className=" flex justify-start">
        <Blockies
          seed={contact.inputAddr}
          size={8}
          scale={5}
          color="#2ed8a7"
          bgColor="#F0AB0A"
          spotColor="#0057ff"
          className="identicon rounded-full h-full w-full mt-1"
        />
          <label className=" block ml-5 mr-2">
            <p className=" mb-1 text-xs text-apt-light-grey">Nickname</p>
            <div className=" block w-32 bg-apt-dark text-base ">
              {contact.inputName}</div>
          </label>
          <label className=" block mr-1">
            <div className=" flex">
              <p className=" mb-1 text-xs text-apt-light-grey">Address</p>
            </div>
            <div className=" block w-28 bg-apt-dark text-base ">
              {shortenAddress(contact.inputAddr)}</div>
          </label>
          <div className=" relative flex flex-col justify-end">
            {copy == "inputAddr" ? (
              <>
                <img className=" mb-4 h-3 w-3 cursor-pointer" src='/icons/ic_copied.svg' />
                <div className=" absolute right-[-24px] -top-0 text-xs font-normal rounded bg-black bg-opacity-70 px-[6px] py-1 shadow">
                  Copied!</div>
              </>
            ) : (
              <img className=" mb-4 h-4 w-4 cursor-pointer" src='/icons/ic_copied.svg' onClick={(e) => { navigator.clipboard.writeText(contact.inputAddr); handleCopy("inputAddr") }} />
            )}
          </div>
        </div>
        <form name="send" onSubmit={handleSubmit} className=" flex mb-3">
          <label className=" block mr-12">
            <p className=" mb-1 text-xs text-apt-light-grey">Amount</p>
            <div className=" bg-black border border-apt-grey flex items-center px-2 rounded-md ">
              <input name="amount" type="number" onChange={handleChange} value={inputs.amount || ""} required min="0"
                className=" mb-1 block w-20 h-5 px-2 bg-black text-sm shadow-sm placeholder-slate-500
                focus:outline-none focus:border-apt-green "
              />
              <Image width={10} height={10} src="/icons/aptos_logo.svg" alt="" />
            </div>
          </label>
          <label className=" block">
            <p className=" mb-0 text-xs text-transparent">Submit</p>
            {btnSubmit}
          </label>
        </form>
      </div>

    </div>
  )
}

export default Contactinfo