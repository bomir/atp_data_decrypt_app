//soluzione da: https://stackoverflow.com/questions/73735401/scraping-an-atptour-com-api-returns-what-looks-like-encrypted-data
//vedi eventualmente anche
//https://foro.elhacker.net/criptografia/descifrar_ficheros_aes_con_clave_y_codigo-t516328.0.html;msg2265775


var express = require('express');
var router = express.Router();


const CryptoJS = require("crypto-js"); // If Nodejs

const data = {"lastModified":1663265556422,"response":"hlXzkPyyhwUYql2Nwl/3AAcRSsZHKf5LyqsAHqSWjP+ZHzfdmQ7bG2cOrf3YxwcZFIlsJNLJOSL/dSj/fFtjWHkeQd21inSUPOkbu2hSD2xMxEkyss8rOIVJAx6NmY9sap852VtmTc2CT4TdXXRduEK4fXASReIX3Eb9V+TMs24t5ow6w8aau+GWZLP9b32ALs4IZeea+dE3YcKtYrZOu/bV7ZLSawlontkgGN9s4QSjUhv43ifxkS6oDHGFkh+4pjjqfLDa2c0fA28otRZUF4uz+UvYAW2b9hZxBVJQU0E45Bf/myuQjZ14KtQr0NdxAMq53PZlki2hRVtnCDErA2e26cK9/bkC6Pz/J0N7rosTYw6TtDRGPYeqM3z645Uew3f3vEcSQLkWWxi1txQPxTbn1MT4HzRtnAbGJOF+GeaAKbwtSt2B86iHjkyEJ+ssmIMsARRjUmhdFmsMF6vuqA5pSgxvYTacg/yzZvy6HVhZBqTpPcaRJGt41efib3zQg8u++yKXdz8MnHicuz32w/osWzcMsC3Cwm5/a1tJZ48xFJdu8YgUsFS6ioNaO9V6vWz8imQZiPEZxd1FLfRynjS8LpvY3+83M2h+A0oExmcd4UaEMCqkklM1A7ssOXeDTqKS8UiZVM3zH6lzNI42QOZE+WYcPvwNzVLanJpZcKqlLupGfOiHuUclEwKrBL8h3wHtU6UmU+VoPJQM82b4pv5vJY/qlUgjLnaWk18A5UV9MF2b81iI3T8i4U8KGeovMhVLdq7YRZFdBG9djQgPRzwfofB/LRz5+aTwKwiTTsmvy4DMP/2iCB7Eiqr7OaKtuaj1n6vt2MdIstqTz/nDEkjLcdrspajdqHnTfUYLEVJvns6KPIKQaQ61I71G7vkEG4MtZ3PRgGy7/zR/B2qAzhaJmHYMZtOfE2OPcPXi3wi9tTYObYaGzpQIqkFGUtpa862bq8qMSXVUpfb8dvDTOyuvURD9FmSHeDHiO6DYhqxqQrfw1aRHK0vu6QcSsGF31vYnrRGR48nZgouqyzUv90Nc9hvyXBcEaYZpCG2qbAArBseD+RRtXeWV1yvV+C7oy68JOxgLJaL1AsLPX81WV9maPy2Ns3IJ64iNvKMebWFtETNtDPIs5amm+wFjERiQ85DK70wucEd3lWWQr7UddSO8U72whJXGbtsC2onskI75uLF3n7XX4goaHrj0IVB3kVqc4O1zMXWvCzype2EerR2E9K/qoBWh5PQRc4bPhrNdoYGSAh18AKtzVOqPgNgzXnW591r4pWMrWW8Tww89sayPZUnxOwDIaf6kFP74+34K+ZWKGVJA9YBPpKfGAfMgOYalnB7YMA4Tn4Hmt4OQtPeArwgR4DBW+HiQ+aFNK04="};

//In short: they are just using the lastModified field from the query as a key to encrypt the data with AES128
function decode(data) {
  var e = formatDate(new Date(data.lastModified))
    , n = CryptoJS.enc.Utf8.parse(e)
    , r = CryptoJS.enc.Utf8.parse(e.toUpperCase())
    , i = CryptoJS.AES.decrypt(data.response, n, {
      iv: r,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return JSON.parse(i.toString(CryptoJS.enc.Utf8))
};

function formatDate(t) {
  var e = (new Date).getTimezoneOffset(), n = new Date(t.getTime() + 60 * e * 1e3).getDate(), r = parseInt((n < 10 ? "0" + n : n).toString().split("").reverse().join("")), i = t.getFullYear(), a = parseInt(i.toString().split("").reverse().join("")), o = parseInt(t.getTime().toString(), 16).toString(36) + ((i + a) * (n + r)).toString(24), s = o.length;
  if (s < 14)
    for (var c = 0; c < 14 - s; c++)
      o += "0";


  else
    s > 14 && (o = o.substr(0, 14));
  return "#" + o + "$";
}

//console.log(decode(data));


/* GET home page. */
router.get('/', function(req, res, next) {
  var result = "welcome to decrypt! use POST not GET..."
  res.send(result);
});



/* POST data. */
router.post('/data/', function(req, res, next) {
  //res.render('decrypt', { title: 'Let"s Decrypt...' }); //serve view decrypt....
  var result = decode(req.body);
  res.send(result);
});

module.exports = router;
