import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsArrowDownLeftCircle, BsArrowDownCircle } from 'react-icons/bs';
import { TbParachute } from 'react-icons/tb';


const Trans = ({ onetrans, isReceive }) => {
  const [items, setitems] = useState({})
  const [isopen, setisopen] = useState(false)

  useEffect(() => {
    if (isReceive === true) {
      async function fetchEvent() {
        let item
        try {
          const fetchIt = await axios.get(
            `https://fullnode.devnet.aptoslabs.com/v1/transactions/by_version/${onetrans.version}`, {})
          item = fetchIt.data
        } catch (error) {
          console.log("fetch error", error)
        }
        setitems(item)
      }
      fetchEvent()
    } else {
      // onetrans.test = "huhuh"
      // console.log("sorrt",onetrans,
      //   onetrans.test)
      setitems(onetrans)
    }
  }, [])

  useEffect(() => {
    console.log("njk", items?.payload?.function, items)
  }, [items])


  return (
    <div className=" text-sm border-b border-apt-grey overflow-hidden ">
      <div className={" p-4 flex hover:bg-apt-grey cursor-pointer " + (isopen ? "text-apt-green " : "")} onClick={() => setisopen(!isopen)}>
        {/* <div className={" w-full overflow-hidden p-4 hover:bg-apt-grey cursor-pointer text-apt-green" } onClick={() => setisopen(!isopen)}> */}
        {isReceive ? (
          <>
            {items?.payload?.function == "0x1::aptos_coin::mint" ? (
              <div className=" flex">
                <TbParachute className="w-10 h-10 mr-4" />
                <div className="">
                  {/* {items?.type=="user_transaction"?"":""} */}
                  {items?.payload?.function}
                  {items?.version}
                  {(new Date((items?.expiration_timestamp_secs) * 1000)).toString()}
                  {/* {items?.expiration_timestamp_secs} */}
                  {/* <a href="huuus" className="">dsfsdg</a> */}
                </div>
              </div>
            ) : (
              <>
                {(items?.payload?.function == "0x1::account::transfer" || items?.payload?.function == "0x1::coin::transfer") ? (
                  <div className=" flex">
                    <BsArrowDownLeftCircle className="w-10 h-10 mr-4" />
                    <div className="">
                      {/* {items?.type=="user_transaction"?"":""} */}
                      {items?.payload?.function}
                      {items?.version}
                      {(new Date((items?.expiration_timestamp_secs) * 1000)).toString()}
                      {/* {items?.expiration_timestamp_secs} */}
                      {/* <a href="huuus" className="">dsfsdg</a> */}
                    </div>
                  </div>
                ) : (
                  <div className="">
                    {/* {items?.type=="user_transaction"?"":""} */}
                    {items?.payload?.function}
                    {items?.version}
                    {(new Date((items?.expiration_timestamp_secs) * 1000)).toString()}
                    {/* {items?.expiration_timestamp_secs} */}
                    {/* <a href="huuus" className="">dsfsdg</a> */}
                  </div>
                )}
              </>
            )}
          </>
          // not isReceive
        ) : (
          <>
            <div className=" flex">
              <BsArrowDownLeftCircle className="w-10 h-10 mr-4" />
              <div className="">
                {/* {items?.type=="user_transaction"?"":""} */}
                {items?.payload?.function}
                {items?.version}
                {(new Date((items?.expiration_timestamp_secs) * 1000)).toString()}
                {/* {items?.expiration_timestamp_secs} */}
                {/* <a href="huuus" className="">dsfsdg</a> */}
              </div>
            </div>
          </>
        )}

      </div>
      {
        isopen &&
        <div className=" w-full border-t border-apt-grey">
          <div className="">
            dsjaIO
            <a href="huuus" className="" target="_blank" rel="noopener noreferrer">dsfsdg</a>

          </div>
        </div>
      }
    </div >
  )
}

export default Trans



// {
//   items?.payload?.function == "0x1::aptos_coin::mint" ? (
//     <div className=" flex">
//       <TbParachute className="w-10 h-10 mr-4" />
//       <div className="">
//         {/* {items?.type=="user_transaction"?"":""} */}
//         {items?.payload?.function}
//         {items?.version}
//         {(new Date((items?.expiration_timestamp_secs) * 1000)).toString()}
//         {/* {items?.expiration_timestamp_secs} */}
//         {/* <a href="huuus" className="">dsfsdg</a> */}
//       </div>
//     </div>