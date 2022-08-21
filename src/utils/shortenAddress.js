export const shortenAddress = (address) => {
  if (!address) return "error"
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
}
export const encryptData = (item) => {
  // name /^data:\w+\/\w+;base64,/
  // let name
  // if ((item.inputName).length > 2) {
  //   name = `${(item.inputName).slice(0, 1)}***${(item.inputName).slice((item.inputName).length - 1)}`;
  // }

  function shorten(text, n) {
    return `${(text).slice(0, n)}***${(text).slice((text).length - n)}`
  }
  function shortenDate(text) {
    return `${(text).slice(0, 2)}**-${(text).slice(5, 6)}*-${(text).slice(8, 9)}*`
  }

  let newData = {
    selectCountryRegion: item.selectCountryRegion,
    inputName: shorten(item.inputName, 1),
    selectIDtype: item.selectIDtype,
    inputIDnumber: shorten(item.inputIDnumber, 1),
    selectDate: shortenDate(item.selectDate),
    inputEmail: shorten(item.inputEmail, 3),
    inputAddress: shorten(item.inputAddress, 6)
  }
  // console.log("item",newData)
  return newData
}