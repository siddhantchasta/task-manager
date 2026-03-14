const CryptoJS = require("crypto-js")

exports.encrypt = (data) => {
 return CryptoJS.AES.encrypt(
  JSON.stringify(data),
  process.env.AES_SECRET
 ).toString()
}

exports.decrypt = (cipher) => {

 const bytes = CryptoJS.AES.decrypt(cipher, process.env.AES_SECRET)

 const decrypted = bytes.toString(CryptoJS.enc.Utf8)

 return JSON.parse(decrypted)
}