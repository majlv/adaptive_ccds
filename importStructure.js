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
    
    // Get the Account List from Quickbooks
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
        var table = builder.addTable(accountList[i].id);
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
    
    // Construct a summary transactions table for all accounts
    var summaryTable = builder.addTable('adaptive_sum_txns');
    summaryTable.setDisplayName('Adaptive Summary Transactions');
    createColumn(summaryTable  , "id"              , "ID"          , 1   , true , "string");
    createColumn(summaryTable  , "tx_date"         , "tx_date"     , 2   , true , "date");
    createColumn(summaryTable  , "amount"          , "amount"      , 3   , true , "number");
    createColumn(summaryTable  , "balance"         , "balance"     , 4   , true , "number");
    createColumn(summaryTable  , "tx_type"         , "tx_type"     , 5   , true , "string");
    createColumn(summaryTable  , "doc_num"         , "doc_num"     , 6   , true , "string");
    createColumn(summaryTable  , "name"            , "name"        , 7   , true , "string");
    createColumn(summaryTable  , "memo"            , "memo"        , 8   , true , "string");
    createColumn(summaryTable  , "split_acc"       , "split_acc"   , 9   , true , "string");
    
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
