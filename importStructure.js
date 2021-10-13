function importStructure(context) {
    var dataSource = context.getDataSource();
    var realmID = dataSource.getSetting("realmID").getValue();
    var apiEndpoint = dataSource.getSetting("apiEndpoint").getValue();
    var requestURL = `${apiEndpoint}/v3/company/${realmID}/reports/AccountList?minorversion=62`;
    var method = 'GET';
    var body = '';
    var headers = {};
    var response = ai.https.authorizedRequest(requestURL, method, body, headers);

    var accountList = [];

    try {
        response;
    } catch(e) {
        ai.log.logError('Error', `Connection request failed +${e}`);
        throw "Connection Error";
    }
    
    // Get the Account List from QB
    if (response.getHttpCode() === 200) {
        responseBody = response.getBody();
        var accountsData = JSON.parse(responseBody).Rows.Row;

        for (i = 0; i < accountsData.length; i++) {
            accountList.push({
                id: accountsData[i].ColData[0].value,
                name: accountsData[i].ColData[1].value
            });
        }
        ai.log.logInfo('List of Accounts', JSON.stringify(accountList));
    } else {
        ai.log.logError('Error retreiving data from source');
        throw "Error";
    }
    
    // Construct a table for each account in the Account List
    var builder = context.getStructureBuilder();
    
    for (i = 0; i < accountList.length; i++) {
        table = builder.addTable(accountList[i].id);
        table.setDisplayName(accountList[i].name);
        
        createColumn(table  , "id"              , "ID"          , 1   , true , "string");
        createColumn(table  , "tx_date"         , "tx_date"     , 2   , true , "date");
        createColumn(table  , "amount"          , "amount"      , 3   , true , "number");
        createColumn(table  , "balance"         , "balance"     , 4   , true , "number");
        createColumn(table  , "tx_type"         , "tx_type"     , 5   , true , "string");
        createColumn(table  , "doc_num"         , "doc_num"     , 6   , true , "string");
        createColumn(table  , "name"            , "name"        , 7   , true , "string");
        createColumn(table  , "memo"            , "memo"        , 8   , true , "string");
        createColumn(table  , "split_acc"       , "split_acc"   , 9   , true , "string");
    }

    // var table = '';
    // var i = 0;
 
    // // Build Accounts Payable Table
    // table = builder.addTable('acctsPybl');
    // table.setDisplayName('AccountsPayable');    

    // ai.log.logInfo(`Creating table ${table.id}`);
    
    // i=0;
    // createColumn(table  , "id"              , "ID"          , i++   , true , "string");
    // createColumn(table  , "tx_date"         , "tx_date"     , i++   , true , "date");
    // createColumn(table  , "amount"          , "amount"      , i++   , true , "number");
    // createColumn(table  , "balance"         , "balance"     , i++   , true , "number");
    // createColumn(table  , "tx_type"         , "tx_type"     , i++   , true , "string");
    // createColumn(table  , "doc_num"         , "doc_num"     , i++   , true , "string");
    // createColumn(table  , "name"            , "name"        , i++   , true , "string");
    // createColumn(table  , "memo"            , "memo"        , i++   , true , "string");
    // createColumn(table  , "split_acc"       , "split_acc"   , i++   , true , "string");
    
    // ai.log.logInfo(`${table.id} table created successfully`);
    
    // createColumn Function
    function createColumn(table, columnId, columnDisplay, displayOrder, reqImport, dataType) {
        var column = table.addColumn(columnId);
        column.setDisplayName(columnDisplay);
        column.setDisplayOrder(displayOrder);
        column.setMandatoryForImports(reqImport);
        switch(dataType) {
            case "integer"  : column.setIntegerColumnType();    break;
            case "string"   : column.setTextColumnType();       break;
            case "date"     : column.setDateTimeColumnType();   break;
            case "boolean"  : column.setBooleanColumnType();    break;
            case "number"   : column.setFloatColumnType();      break;
            default : ai.log.logInfo('Invalid Column', 'Column ' + columnID); break;
        }
    }
}
