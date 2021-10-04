function importStructure(context) {
    var builder = context.getStructureBuilder();
 
    ai.log.logInfo('Creating table...');
    var table = builder.addTable('Accounts Payable (A/P)');
    table.setDisplayName('Accounts Payable');    
 
    ai.log.logInfo('Adding columns...');
    var recordColumn = null;
    
    recordColumn = table.addColumn('tx_date');
    recordColumn.setDisplayName('tx_date');
    recordColumn.setDisplayOrder('0');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('dateTime');
    recordColumn.setDateTimeColumnType();
    
    recordColumn = table.addColumn('amount');
    recordColumn.setDisplayName('amount');
    recordColumn.setDisplayOrder('1');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('float');
    recordColumn.setFloatColumnType();
    
    recordColumn = table.addColumn('balance');
    recordColumn.setDisplayName('balance');
    recordColumn.setDisplayOrder('2');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('float');
    recordColumn.setFloatColumnType();
    
    recordColumn = table.addColumn('tx_type');
    recordColumn.setDisplayName('tx_type');
    recordColumn.setDisplayOrder('3');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('text');
    recordColumn.setTextColumnType(60);
    
    recordColumn = table.addColumn('doc_num');
    recordColumn.setDisplayName('doc_num');
    recordColumn.setDisplayOrder('4');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('text');
    recordColumn.setTextColumnType(60);
    
    recordColumn = table.addColumn('name');
    recordColumn.setDisplayName('name');
    recordColumn.setDisplayOrder('5');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('text');
    recordColumn.setTextColumnType(60);
    
    recordColumn = table.addColumn('memo');
    recordColumn.setDisplayName('memo');
    recordColumn.setDisplayOrder('6');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('text');
    recordColumn.setTextColumnType(120);
    
    recordColumn = table.addColumn('split_acc');
    recordColumn.setDisplayName('split_acc');
    recordColumn.setDisplayOrder('7');
    recordColumn.setIncludeByDefault(true); 
    recordColumn.setRemoteColumnType('text');
    recordColumn.setTextColumnType(60);
    
    ai.log.logInfo('Table created successfully');
}