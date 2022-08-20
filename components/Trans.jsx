import React from 'react'

const Trans = ({trans}) => {
  return (
    <div className=" text-sm border-b p-4 border-apt-grey">
      {trans.type}{trans.version}{(new Date((trans.expiration_timestamp_secs) * 1000)).toString()}
    </div>
  )
}

export default Trans
