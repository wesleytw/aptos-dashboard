import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className=" ml-60  bg-apt-dark h-[148px] sm:h-[81px] border-t border-apt-grey py-8 text-sm font-semibold text-white ">
    <div className="flex flex-col justify-between sm:flex-row px-10">
      <p className="text-invar-grey select-none">© aptothemoon 2022</p>
      <div className="flex flex-col-reverse sm:flex-row mt-4 sm:mt-0 justify-center">
        <div>
          <Link href="/terms">
            <p className="mb-8 sm:mb-auto sm:mr-6 hover:underline cursor-pointer">
              {`Terms & Conditions`}
            </p>
          </Link>
        </div>

        <div>
          <Link href="/privacy">
            <p className="mb-1 sm:mb-auto hover:underline cursor-pointer">
              Privacy Policy
            </p>
          </Link>
        </div>
      </div>
    </div>
  </footer>
  // <div className=" ml-60 w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
  //   <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
  //     <div className="flex flex-[0.5] justify-center items-center">
  //       <a className="btn btn-ghost no-animation hover:bg-[#fff0] normal-case text-[44px] font-PlasticBeach ">
  //         LILOS</a>
  //     </div>
  //     <div className="flex flex-1 justify-evenly items-center flex-wrap text-base text-center sm:mt-0 mt-5 w-full ">
  //       <a href="https://drive.google.com/file/d/1Ifv-WBZMqmjo6M1NBbZsmbX-damY7PXB/view?usp=sharing" target="_blank" rel="noopener noreferrer">
  //         Whitepaper</a>
  //       <p className="mx-2 cursor-pointer">About</p>
  //       <p className="mx-2 cursor-pointer">Tutorials</p>
  //     </div>
  //   </div>

  //   <div className="flex justify-center items-center flex-col mt-5">
  //     {/* <p className="text-black text-sm text-center font-medium mt-2" >
  //       lilonft@gmail.com</p> */}
  //     <a className='mt-5' target="_blank" rel="noopener noreferrer">
  //       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 293.775 293.671">
  //         <g id="etherscan-logo-circle" transform="translate(-219.378 -213.33)">
  //           <path id="Path_1" data-name="Path 1" d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152" fill="#fff" />
  //           <path id="Path_2" data-name="Path 2" d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793" transform="translate(35.564 80.269)" fill="#fff" />
  //         </g>
  //       </svg>
  //     </a>
  //   </div>

  //   <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

  //   <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
  //     <p className=" text-left text-xs">@lilosnft2022</p>
  //     <p className=" text-right text-xs">All rights reserved</p>
  //   </div>
  // </div>
  )
}

export default Footer