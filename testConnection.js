function testConnection(context) {
    // Get an authorization code from the Intiut OAuth 2.0 Server.
    // Data Source parameters are used to build the Authorization Request URL.
    // A request will be sent to this URL. If the Intuit OAuth Server accepts, a response
    // will be sent that contains an authoriation code, which can be exchanged for a token.
    var dataSource = context.getDataSource();
    var providerOAuthGateway = dataSource.getSetting("providerOAuthGateway").getValue();
    var clientID = dataSource.getSetting("clientID").getValue();
    var responseType = dataSource.getSetting("responseType").getValue();
    var scope = dataSource.getSetting("scope").getValue();
    var consumerRedirectURI = dataSource.getSetting("consumerRedirectURI").getValue();
    var state = dataSource.getSetting("state").getValue();
    var authRequestURL = `${providerOAuthGateway}?client_id=${clientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${consumerRedirectURI}&state=${state}`;
    var method = 'POST';
    var body = null;
    var headers = {};
    
    var response = ai.https.authorizedRequest(authRequestURL, method, body, headers);
    try {
        response;
    }
    catch (exception) {
        ai.log.logError('Test Connection HTTPS Request failed', ''+exception);
        return false;
    }
    
    if (response.getHttpCode() == '200') {
        var resBody = JSON.stringify(response.getBody());
        var resHeader = JSON.stringify(response.getHeaders());
        var resHttpCode = JSON.stringify(response.getHttpCode());
        var headerData = JSON.parse(JSON.stringify(response.getHeaders()));
        ai.log.logInfo(headerData["Cache-Control"],JSON.stringify(Object.keys(headerData)));
        ai.log.logInfo(response.getHttpCode(),JSON.stringify(Object.keys(response)));
        // ******* parsing logic here *******
    	return true;
    } else {
	    return false;
    }
}