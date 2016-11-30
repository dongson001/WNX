export default function parameter(obj) {
  let param = ''
  for(let item in obj) {
    if(obj.hasOwnProperty(item)) {
      param = param + item + '=' + obj[item] + '&'
    }
  }
  return param
}
