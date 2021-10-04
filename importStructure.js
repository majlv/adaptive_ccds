function importStructure(context) {
    var builder = context.getStructureBuilder();
 
    var table = builder.addTable('acctsPybl');
    table.setDisplayName('AccountsPayable');    

    ai.log.logInfo(`Creating table ${table.id}`);
    
    var i=0;
    createColumn(table  , "id"              , "ID"          , i++   , true , "string");
    createColumn(table  , "tx_date"         , "tx_date"     , i++   , true , "date");
    createColumn(table  , "amount"          , "amount"      , i++   , true , "number");
    createColumn(table  , "balance"         , "balance"     , i++   , true , "number");
    createColumn(table  , "tx_type"         , "tx_type"     , i++   , true , "string");
    createColumn(table  , "doc_num"         , "doc_num"     , i++   , true , "string");
    createColumn(table  , "name"            , "name"        , i++   , true , "string");
    createColumn(table  , "memo"            , "memo"        , i++   , true , "string");
    createColumn(table  , "split_acc"       , "split_acc"   , i++   , true , "string");
    
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
    ai.log.logInfo(`${table.id} table created successfully`);
}