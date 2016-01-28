var wirkn_api;
var analytics_api_key;

if (process.env.MODE == 'dev') {
    wirkn_api = 'http://devapi2-wirkn.rhcloud.com/v2/';
    analytics_api_key = 'AzsPpHt79pDJWf2n5TNHli06IfImCtXd';
}
else {
    wirkn_api = 'http://prod-wirkn.rhcloud.com/v2/';
    analytics_api_key = 'kLrqxi1R0zbiB1KKbJk3jukkrsalVYhH';
}

module.exports = {
    wirkn_api: wirkn_api,
    analytics_api_key: analytics_api_key
};
