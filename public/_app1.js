$(document).ready(function() {
    function handleResponse(res) {
      if (typeof res != 'undefined' && typeof res.paymentMethod != 'undefined' && typeof res.paymentMethod.paymentTransaction != 'undefined' && typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' && res.paymentMethod.paymentTransaction.statusCode == '0300') {
        // success block
      } else if (typeof res != 'undefined' && typeof res.paymentMethod != 'undefined' && typeof res.paymentMethod.paymentTransaction != 'undefined' && typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' && res.paymentMethod.paymentTransaction.statusCode == '0398') {
        // initiated block
      } else {
        // error block
      }
    };

  $(document).off('click', '#btnSubmit').on('click', '#btnSubmit', function(e) {
    e.preventDefault();

  var configJson = {
    'tarCall': false,
  'features': {
    'showPGResponseMsg': true,
  'enableAbortResponse': true,
  'enableExpressPay': true,
  'enableNewWindowFlow': true    //for hybrid applications please disable this by passing false
            },
  'consumerData': {
    'deviceId': 'WEBSH2',	//possible values 'WEBSH1' or 'WEBSH2'
  'token': '78eadbfef41a65095a07c1c4279e82cc10793dafe01f1d2901011e1a4bd1b4883010b70b91ba4b58201c67ae2b7e8c38600dd480ce99cdc908d16cf6d394cc95',
  'returnUrl': 'https://www.tekprocess.co.in/MerchantIntegrationClient/MerchantResponsePage.jsp',    //merchant response page URL
  'responseHandler': handleResponse,
  'paymentMode': 'all',
  'merchantLogoUrl': 'https://www.paynimo.com/CompanyDocs/company-logo-vertical-light.png',  //provided merchant logo will be displayed
  'merchantId': 'L3348',
  'currency': 'INR',
  'consumerId': 'c964634',
  'consumerMobileNo': '9876543210',
  'consumerEmailId': 'test@test.com',
  'txnId': '1655996396332',   //Unique merchant transaction ID
  'items': [{
    'itemId': 'test',
  'amount': '10',
  'comAmt': '0'
                }],
  'customStyle': {
    'PRIMARY_COLOR_CODE': '#45beaa',   //merchant primary color code
  'SECONDARY_COLOR_CODE': '#FFFFFF',   //provide merchant's suitable color code
  'BUTTON_COLOR_CODE_1': '#2d8c8c',   //merchant's button background color code
  'BUTTON_COLOR_CODE_2': '#FFFFFF'   //provide merchant's suitable color code for button text
                }
            }
        };

  $.pnCheckout(configJson);
  if(configJson.features.enableNewWindowFlow){
    pnCheckoutShared.openNewWindow();
        }
    });
});