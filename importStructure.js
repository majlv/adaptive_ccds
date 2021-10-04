function importStructure(context) {
    var builder = context.getStructureBuilder();
    var table = '';
    var i = 0;
 
    // Build Accounts Payable Table
    table = builder.addTable('acctsPybl');
    table.setDisplayName('AccountsPayable');    

    ai.log.logInfo(`Creating table ${table.id}`);
    
    i=0;
    createColumn(table  , "id"              , "ID"          , i++   , true , "string");
    createColumn(table  , "tx_date"         , "tx_date"     , i++   , true , "date");
    createColumn(table  , "amount"          , "amount"      , i++   , true , "number");
    createColumn(table  , "balance"         , "balance"     , i++   , true , "number");
    createColumn(table  , "tx_type"         , "tx_type"     , i++   , true , "string");
    createColumn(table  , "doc_num"         , "doc_num"     , i++   , true , "string");
    createColumn(table  , "name"            , "name"        , i++   , true , "string");
    createColumn(table  , "memo"            , "memo"        , i++   , true , "string");
    createColumn(table  , "split_acc"       , "split_acc"   , i++   , true , "string");
    
    ai.log.logInfo(`${table.id} table created successfully`);
    
    // Build Accounts Payable Table
    table = builder.addTable('acctsRcvbl');
    table.setDisplayName('AccountsReceivable');    

    ai.log.logInfo(`Creating table ${table.id}`);
    
    i=0;
    createColumn(table  , "id"              , "ID"          , i++   , true , "string");
    createColumn(table  , "tx_date"         , "tx_date"     , i++   , true , "date");
    createColumn(table  , "amount"          , "amount"      , i++   , true , "number");
    createColumn(table  , "balance"         , "balance"     , i++   , true , "number");
    createColumn(table  , "tx_type"         , "tx_type"     , i++   , true , "string");
    createColumn(table  , "doc_num"         , "doc_num"     , i++   , true , "string");
    createColumn(table  , "name"            , "name"        , i++   , true , "string");
    createColumn(table  , "memo"            , "memo"        , i++   , true , "string");
    createColumn(table  , "split_acc"       , "split_acc"   , i++   , true , "string");
    
    ai.log.logInfo(`${table.id} table created successfully`);
    
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
