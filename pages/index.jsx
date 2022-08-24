import React, { useEffect, useState } from 'react'
import { AptosClient, TokenClient } from "aptos";
// import aptosWeb3 from '@martiandao/aptos-web3.js';
import aptosWeb3, { WalletClient } from '@martiandao/aptos-web3-bip44.js';
import { disableScroll, enableScroll } from '../src/utils/disableScroll'
import Marquee from "react-fast-marquee";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Typewriter from 'typewriter-effect';
import { useWeb3Context } from '../src/contexts/WalletContext'

const App = () => {
  const [receive, setreceive] = useState()
  // const walletClient = new aptosWeb3.WalletClient();
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay({ delay: 3000, stopOnInteraction: false })])
  const { iswallet, isconnect, account, balance, name, connectWallet, disconnect, sendApt } = useWeb3Context()

  return (
    <div className=' ml-60 font-maru font-bold text-base'>
      <div className=" h-screen overflow-hidden bg-gradient-to-b from-black via-black" ref={emblaRef}>
        {/* <div className=" h-[60px] bg-apt-dark"></div> */}

        <div className=" w-full h-full flex">
          {/* <br/><br/><br/> */}
          <div className=" w-screen min-w-full px-16 py-16 mt-[60px] mb-0 text-white ">
            <div className=" relative w-full h-full flex flex-col justify-center items-baseline">
              <p className=" -mt-16 text-3xl">Explore Aptos From </p>
              <p className=" mt-5 mb-16 text-6xl z-10"><span className=" text-apt-green">apto</span>themoon</p>
              <div className=" text-xl bg-black px-1 py-3 pb-6">
                <Typewriter options={{
                  delay: 30,
                  loop: true
                }}
                  onInit={(typewriter) => {
                    typewriter.typeString('Manage tokens, NFTs, names')
                      .pauseFor(1500)
                      .deleteAll()
                      .typeString('View Your On-Chain Activities')
                      .pauseFor(1500)
                      .deleteAll()
                      .typeString('Build Connections with Friends')
                      .pauseFor(1500)
                      .deleteAll()
                      .start();
                  }}
                />
                <div className=" mb-5"></div>
                {!iswallet ? (
                  <label htmlFor="installmartian" onClick={() => disableScroll()} className=" btn btn-sm btn-secondary normal-case border-none text-apt-dark">
                    Install Wallet
                  </label>
                ) : (
                  <>
                    {!isconnect ? (
                      <button onClick={() => connectWallet()} className=" btn btn-sm btn-secondary normal-case border-none text-apt-dark ">
                        Connect Wallet</button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
              {/* <div className=" w-full flex justify-end bg-gradient-to-b from-black"> */}
              <img src="/icons/bg_moon.png" alt="" className=" absolute top-1 right-0 brightness-[0.3] filter blur" />
              {/* </div> */}

            </div>
          </div>
          {/* <div className=" w-screen min-w-full px-16 py-8 mt-[60px] mb-0 text-white  bg-gree border border-cyan-500">
            <div className=" bg-black w-full h-full rounded-3xl"></div>
          </div> */}
          {/* <div className=" w-screen min-w-full px-16 py-8 mt-[60px] mb-0 text-white  bg-gree border border-cyan-500">
            <div className=" bg-black w-full h-full rounded-3xl"></div>
          </div> */}

          {/* <div className=" h-[60px] bg-apt-dark"></div> */}
          {/* <div className=" bg-white rounded-3xl h-full w-full">khglk</div> */}
        </div>

      </div>
      <div className=" p-8  bg-gradient-to-t from-black via-apt-dark w-full overflow-hidden ">
        <div className=" w-96">
          {/* <Marquee direction="right" pauseOnHover={true} gradientColor={[14, 18, 21]}>
            I can be a Rea
          </Marquee> */}
        </div>
        {/* <div className=" "> */}
        {/* <div className=" bg-red-600 w-[600px] h-96 overflow-hidden rounded-3xl " ref={emblaRef}>
          <div className=" flex bg-slate-600">
            <div className=" px-40 py-36 m-16 text-white h-full min-w-fit bg-green-400 border border-cyan-500">Slide 1</div>
            <div className=" px-40 py-36 m-16 text-white h-full min-w-fit bg-green-400 border border-cyan-500">Slide 2</div>
            <div className=" px-40 py-36 m-16 text-white h-full min-w-fit bg-green-400 border border-cyan-500">Slide 3</div>
            <div className=" px-40 py-36 m-16 text-white h-full min-w-fit bg-green-400 border border-cyan-500">Slide 3</div>
          </div>
        </div> */}
        {/* </div> */}
        {/* <EmblaCarousel slides={slides} /> */}

        <div>
        </div>
      </div>
    </div>
  )

}

export default App



