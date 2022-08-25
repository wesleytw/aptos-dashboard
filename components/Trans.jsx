import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { BsArrowDownLeftCircle, BsArrowDownRightCircle, BsArrowDownCircle, BsArrowRight, BsArrowUpRightCircle } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';
import { TbParachute } from 'react-icons/tb';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { shortenAddress } from '../src/utils/shortenAddress'
import { on } from 'stream';


const Trans = ({ onetrans, account }) => {
  // const [onetrans, setitems] = useState({})
  const [isopen, setisopen] = useState(false)
  const [copy, setCopy] = useState(false)
  function handleCopy(obj) {
    setCopy(obj)
    setTimeout(() => {
      setCopy("")
    }, 2000);
  }
  return (
    <div className=" text-sm border-b border-apt-grey overflow-hidden ">
      {/* <div className={" w-full overflow-hidden p-4 hover:bg-apt-grey cursor-pointer text-apt-green" } onClick={() => setisopen(!isopen)}> */}
      <div className={" px-4 py-4 flex hover:bg-apt-grey cursor-pointer " + (isopen ? "bg-apt-grey " : "")} onClick={() => setisopen(!isopen)}>
        {(onetrans?.payload?.function == "0x1::aptos_coin::mint" && onetrans?.payload?.arguments[0] == account) ? (
          <div className=" flex justify-start items-center w-full ">
            <div className=" flex justify-start items-center ">
              <TbParachute className=" mr-4 w-6 h-6" />
              <p className=" mr-8 text-xs badge badge-info">Airdrop</p>
              <div className=" mr-8">
                <p className=" text-2xs text-apt-light-grey">From</p>
                {shortenAddress(onetrans.sender)}
              </div>
            </div>
            <div className=" flex justify-start items-center ">
              <FiArrowRight className=" w-7 h-7 text-apt-light-grey" />
              <div className=" mx-8 ">
                <p className=" text-2xs text-apt-light-grey">Amount</p>
                <div className=" flex items-center">
                  {onetrans?.payload?.arguments[1]}
                  <div className=" ml-1 mt-[1px] w-[10px]">
                    <Image width={10} height={10} src="/icons/aptos_logo.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-start items-center ">
              <div className=" pl-8 text-2xs">
                <p className=" pb-[1px] text-2xs text-apt-light-grey">Timestamp</p>
                {(new Date((onetrans?.timestamp) / 1000)).toString()}
              </div>
            </div>
            <>
              <a href={`https://explorer.devnet.aptos.dev/txn/${onetrans?.version}`} target="_blank" rel="noopener noreferrer"
                className=" ml-4 rounded-lg text-baseline justify-center items-center hover:bg-apt-grey">
                <HiOutlineExternalLink />
              </a>
            </>
            {/* <div className=" flex justify-start items-center ">
              <div className=" pl-8 text-2xs">
                <p className=" text-2xs text-apt-light-grey">Gas</p>
                {onetrans?.gas_used}
              </div>
            </div> */}
          </div>
        ) : (
          <>
            {((onetrans?.payload?.function == "0x1::account::transfer" || onetrans?.payload?.function == "0x1::coin::transfer") && onetrans?.payload?.arguments[0] == account) ? (
              <div className=" flex justify-start items-center w-full ">
                <div className=" flex justify-start items-center ">
                  <BsArrowDownRightCircle className=" mr-4 w-6 h-6" />
                  <p className=" mr-8 text-xs badge badge-secondary">Receive</p>
                  <div className=" mr-8">
                    <p className=" text-2xs text-apt-light-grey">From</p>
                    {shortenAddress(onetrans.sender)}
                  </div>
                </div>
                <div className=" flex justify-start items-center ">
                  <FiArrowRight className=" w-7 h-7 text-apt-light-grey" />
                  <div className=" mx-8 ">
                    <p className=" text-2xs text-apt-light-grey">Amount</p>
                    <div className=" flex items-center">
                      {onetrans?.payload?.arguments[1]}
                      <div className=" ml-1 mt-[1px] w-[10px]">
                        <Image width={10} height={10} src="/icons/aptos_logo.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-start items-center ">
                  <div className=" pl-8 text-2xs">
                    <p className=" pb-[1px] text-2xs text-apt-light-grey">Timestamp</p>
                    {(new Date((onetrans?.timestamp) / 1000)).toString()}
                  </div>
                </div>
                <a href={`https://explorer.devnet.aptos.dev/txn/${onetrans?.version}`} target="_blank" rel="noopener noreferrer"
                  className=" ml-4 rounded-lg text-baseline justify-center items-center hover:bg-apt-grey">
                  <HiOutlineExternalLink />
                </a>
              </div>
            ) : (
              <>
                {(onetrans?.sender == account) ? (
                  <div className=" flex justify-start items-center w-full ">
                    <div className=" flex justify-start items-center ">
                      <BsArrowUpRightCircle className=" mr-4 w-6 h-6" />
                      <p className=" mr-8 text-xs badge w-[70.3px]">Send</p>
                      <div className=" mr-8">
                        <p className=" text-2xs text-apt-light-grey">To</p>
                        {shortenAddress(onetrans?.payload?.arguments[0])}
                      </div>
                    </div>
                    <div className=" flex justify-start items-center ">
                      <FiArrowRight className=" w-7 h-7 text-apt-light-grey" />
                      <div className=" mx-8 ">
                        <p className=" text-2xs text-apt-light-grey">Amount</p>
                        <div className=" flex items-center">
                          {onetrans?.payload?.arguments[1]}
                          <div className=" ml-1 mt-[1px] w-[10px]">
                            <Image width={10} height={10} src="/icons/aptos_logo.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-start items-center ">
                      <div className=" pl-8 text-2xs">
                        <p className=" pb-[1px] text-2xs text-apt-light-grey">Timestamp</p>
                        {(new Date((onetrans?.timestamp) / 1000)).toString()}
                      </div>
                    </div>
                    <a href={`https://explorer.devnet.aptos.dev/txn/${onetrans?.version}`} target="_blank" rel="noopener noreferrer"
                      className=" ml-4 rounded-lg text-baseline justify-center items-center hover:bg-apt-grey">
                      <HiOutlineExternalLink />
                    </a>
                  </div>
                ) : (
                  <div className=" flex justify-start items-center w-full ">
                    <div className=" flex justify-start items-center ">
                      <BsArrowUpRightCircle className=" mr-4 w-6 h-6" />
                      <p className=" mr-8 text-xs badge w-[70.3px]">Send un</p>
                      <div className=" mr-8">
                        <p className=" text-2xs text-apt-light-grey">To</p>
                        {shortenAddress(onetrans?.payload?.arguments[1])}
                      </div>
                    </div>
                    <div className=" flex justify-start items-center ">
                      <FiArrowRight className=" w-7 h-7 text-apt-light-grey" />
                      <div className=" mx-8 ">
                        <p className=" text-2xs text-apt-light-grey">Amount</p>
                        <div className=" flex items-center">
                          {onetrans?.payload?.arguments[1]}
                          <div className=" ml-1 mt-[1px] w-[10px]">
                            <Image width={10} height={10} src="/icons/aptos_logo.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-start items-center ">
                      <div className=" pl-8 text-2xs">
                        <p className=" pb-[1px] text-2xs text-apt-light-grey">Timestamp</p>
                        {(new Date((onetrans?.timestamp) / 1000)).toString()}
                      </div>
                    </div>
                    <a href={`https://explorer.devnet.aptos.dev/txn/${onetrans?.version}`} target="_blank" rel="noopener noreferrer"
                      className=" ml-4 rounded-lg text-baseline justify-center items-center hover:bg-apt-grey">
                      <HiOutlineExternalLink />
                    </a>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      {isopen &&
        <div className=" w-full px-8 py-6 border-t border-apt-grey">
          <div className=" grid grid-cols-4 gap-8">
            <div className="break-all">
              <p className=" text-2xs text-apt-light-grey ">From/To</p>
              {(onetrans.sender == account) ? (onetrans?.payload?.arguments[0]) : (onetrans.sender)}
            </div>
            {/* <a href="huuus" className="" target="_blank" rel="noopener noreferrer">dsfsdg</a> */}
            <div className=" ">
              <p className=" text-2xs text-apt-light-grey">Status</p>
              {onetrans?.vm_status}
            </div>
            <div className=" break-all">
              <p className=" text-2xs text-apt-light-grey">Payload function</p>
              {onetrans?.payload?.function}
            </div>
            <div className=" break-all">
              <p className=" text-2xs text-apt-light-grey">Payload type argument</p>
              {onetrans?.payload?.type_arguments[0]}
            </div>
            <div className=" ">
              <p className=" text-2xs text-apt-light-grey">Gas used</p>
              {onetrans?.gas_used}
            </div>
            <div className=" ">
              <p className=" text-2xs text-apt-light-grey">Gas unit price</p>
              {onetrans?.gas_unit_price}
            </div>
            <div className=" ">
              <p className=" text-2xs text-apt-light-grey">Version</p>
              {onetrans?.version}
            </div>
            <div className=" ">
              <p className=" text-2xs text-apt-light-grey">Sequence number</p>
              {onetrans?.sequence_number}
            </div>
            <div className=" flex justify-start items-center ">
              <div className=" text-2xs">
                <p className=" pb-[1px] text-2xs text-apt-light-grey">Timestamp</p>
                {(new Date((onetrans?.timestamp) / 1000)).toString()}
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default Trans






// {
//   onetrans?.payload?.function == "0x1::aptos_coin::mint" ? (
//     <div className=" flex">
//       <TbParachute className="w-10 h-10 mr-4" />
//       <div className="">
//         {/* {onetrans?.type=="user_transaction"?"":""} */}
//         {onetrans?.payload?.function}
//         {onetrans?.version}
//         {(new Date((onetrans?.expiration_timestamp_secs) * 1000)).toString()}
//         {/* {onetrans?.expiration_timestamp_secs} */}
//         {/* <a href="huuus" className="">dsfsdg</a> */}
//       </div>
//     </div>