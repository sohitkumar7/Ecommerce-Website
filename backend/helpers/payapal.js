import paypal from "paypal-rest-sdk"
paypal.configure({
    mode:"sandbox",
    client_id: "AbM2P447p4X4KVLtpNwlw7KV2bAYhX3ri89J_wZaaVVbiNdJDn0Q4KuzC29y90tCRQ1Okh7cMzvRPPl5",
    client_secret: "EIzsd2gNOPWpg7na4pq2kQfuPFoH-g3enbuUaE-xTNdPhWPzmV5hyP2kj-y_cZxPrCbX7ZW8ccUHnR-O",
})

module.exports = paypal;