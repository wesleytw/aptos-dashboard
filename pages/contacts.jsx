import React, { useEffect, useState } from 'react'
import { createUser, getUser } from '../src/utils/fetchFirebase'
import { useWeb3Context } from '../src/contexts/WalletContext'
import Blockies from 'react-blockies';
import Image from 'next/image'
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Profolio, Activity, Contactinfo } from '../components'
import { shortenAddress } from '../src/utils/shortenAddress'
// /^0x[a-fA-F0-9]{40}$/
const App = () => {
  const { iswallet, isconnect, account, balance, name, connectWallet, disconnect, sendApt, sign } = useWeb3Context()
  // const [tabState, setTabState] = useState("activity")
  const [inputs, setInputs] = useState({});
  const [submitState, setSubmitState] = useState("")
  const [contacts, setcontacts] = useState()
  const [isAddr, setisAddr] = useState(true)


  const handleChange = (event) => {
    // if (submitState != "") return
    const name = event.target.name;
    const value = event.target.value;
    if (name == "inputAddr") {
      var format = /^0x[a-fA-F0-9]{64}$/;
      console.log("tes", format.test(value), value)
      if (format.test(value) == true) {
        setisAddr(true)
      } else {
        setisAddr(false)
      }
    }
    setInputs(values => ({ ...values, [name]: value, ["account"]: account, ["time"]: new Date(Date.now()) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState("submitting")
    console.log("submitting...", inputs, submitState,account)
    try {
      await createUser(account, inputs)
      setSubmitState("")
      async function fetchUser() {
        const u = await getUser(account)
        console.log("u", u)
        setcontacts(u)
      }
      fetchUser()
    } catch (error) {
      console.log(error, account)
      setSubmitState("")
    }
  }

  useEffect(() => {
    if (account === undefined) return
    async function fetchUser() {
      const u = await getUser(account)
      // console.log("u", u)
      setcontacts(u)
    }
    fetchUser()
  }, [account])

  let btnSubmit
  if ((submitState == "submitting")) {
    btnSubmit = <button
      className=" loading btn btn-sm btn-secondary hover:bg-secondary rounded normal-case text-base font-semibold border-none">
      Adding</button>
  } else {
    btnSubmit = <input
      type="submit" value="Add"
      className={`btn btn-sm btn-secondary inline-block rounded normal-case text-base font-semibold border-none`}
    />
  }

  return (
    <div className=' ml-60 pt-[60px] min-h-screen font-maru font-bold text-base'>
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
      <div className=" relative bg-apt-dark px-20 py-6 pt-8 border-b border-apt-grey">
        <Blockies
          seed={account}
          size={8}
          scale={12}
          color="#2ed8a7"
          bgColor="#F0AB0A"
          spotColor="#0057ff"
          className="identicon ml-2 rounded-2xl absolute -top-20 left-16 border-4 border-apt-dark"
        />
        <div className=" flex items-baseline justify-between">
          <p className=" text-3xl mr-16">Contacts</p>
          <p className=" text-xs">Build connection with your friends on <span className=" text-apt-green">Aptos</span>.</p>
        </div>
      </div>
      <div className=" w-full p-8 ">
        <div className=" rounded-lg p-4 darkglass border border-apt-grey">
          <form name="addContact" onSubmit={handleSubmit} className=" mb-4 w-full py-4 px-8 flex justify-between rounded-lg bg-black border border-apt-grey overflow-hidden">
            <div className=" flex">
              <label className=" block mr-9">
                <p className=" mb-1 text-xs text-apt-light-grey">Nickname</p>
                <input name="inputName" type="text" onChange={handleChange} value={inputs.inputName || ""} required placeholder="alice"
                  className="mt-1 block w-36 h-8 px-3 py-2 bg-apt-dark border border-apt-grey rounded-md text-sm shadow-sm placeholder-slate-500
                focus:outline-none focus:border-apt-green "
                />
              </label>
              <label className=" block">
                <p className=" mb-1 text-xs text-apt-light-grey flex">
                  Address{!isAddr && <p className=" ml-2 text-pink-600 text-2xs">
                    Invalid address format </p>}
                </p>
                <input name="inputAddr" type="text" onChange={handleChange} value={inputs.inputAddr || ""} required placeholder="0x52a593ba5f63609874c39f0008f082d48f788d05592c414d52366b84e5957f2b"
                  className={` peer mt-1 block w-96 h-8 px-3 py-2 bg-apt-dark border border-apt-grey rounded-md text-sm shadow-sm placeholder-slate-500
                focus:outline-none focus:border-apt-green ${isAddr ? "" : " border-pink-600"}`}
                />
              </label>
            </div>
            <label className=" block">
              <p className=" mb-1 text-xs text-transparent">Submit</p>
              {(account && isAddr) ? (btnSubmit) :
                <div className={`btn btn-sm btn-secondary rounded normal-case text-base font-semibold border-none bg-opacity-50 hover:bg-opacity-60 cursor-not-allowed no-animation`}>
                  Add</div>}
            </label>
          </form>
          <div className=" rounded-lg px-4 pb-0 bg-apt-dark border border-apt-grey">
            {(!contacts || contacts.length == 0) && <div className=' text-2xl text-center my-16'>No Contact</div>}
            {contacts?.map((contact, index) => (
              <Contactinfo key={index} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}

export default App

