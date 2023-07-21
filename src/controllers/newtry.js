const request = require('request');
var sha512 = require('js-sha512');

exports.newtrry = async (req, res) => {
    const formData = {
        "amount":{
            "currency":"NGN",
            "total":400000
        },
        "callbackUrl":"https://your-call-back-url.com",
        "country":"NG",
        "payMethod":"OpayWalletNgQR",
        "product":{"name":"name"},
        "reference":"04123392"
      };
      
      var privateKey = "OPAYPUB16882847107190.19459935528313543"
    //   OPAYPUB16882847107190.19459935528313543
    // OPAYPRV16882847107190.5900677561128587
      
      var hash = sha512.hmac.create(privateKey);
      hash.update(JSON.stringify(formData));
      hmacsignature = hash.hex();
      console.log(hmacsignature)
      request({
          url: 'https://testapi.opaycheckout.com/api/v3/bills/betting-providers',
          method: 'POST',
          headers: {
            'MerchantId': '256623070150857',
            'Authorization': 'Bearer '+hmacsignature
          },
          json: true,
          body: formData
        }, function (error, response, body) {
          console.log('body: ')
          console.log(body)
          console.log(error)
        }
      )
      
}