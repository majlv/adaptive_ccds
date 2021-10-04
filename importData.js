function importData(context) {
    var dataSource = context.getDataSource();
    var realmID = dataSource.getSetting("realmID").getValue();
    var apiEndpoint = dataSource.getSetting("apiEndpoint").getValue();
    var startDateString = dataSource.getSetting("Period Range").getValue().getFromPeriodStartDateTime().substring(0, 10);
    var endDateString = dataSource.getSetting("Period Range").getValue().getToPeriodEndDateTime().substring(0, 10);
    var method = 'GET';
    var body = '';
    var headers = { };
    
    var tableId = context.getRowset(['id']).getTableId();

    // var columnsMap = [];
    // var dataCell = [];
    
    // Accounts Payable
    var apTable = 'acctsPybl';
    var apAccountId = 33;
    var apRowset = ["tx_date", "amount", "balance", "tx_type", "doc_num", "name", "memo", "split_acc"];
    importData(apTable, apAccountId, apRowset);
    
    // Accounts Receivable
    var arTable = 'acctsRcvbl';
    var arAccountId = 84;
    var arRowset = ["tx_date", "amount", "balance", "tx_type", "doc_num", "name", "memo", "split_acc"];
    importData(arTable, arAccountId, arRowset);
    
    // Import Data Function
    function importData(table, acctId, colArray) {
        if (tableId == table) {
            var dataRowset = context.getRowset(colArray);
            var dataColumns = dataRowset.getColumns();
            
            // Get indices for each column for a column map
            
            
            requestURL = `${apiEndpoint}/v3/company/${realmID}/reports/GeneralLedger?start_date=${startDateString}&end_date=${endDateString}&accounting_method=Accrual&account=${acctId}&minorversion=62`;
            var response = ai.https.authorizedRequest(requestURL, method, body, headers);
            
            try {
                ai.log.logInfo("Trying to get data from source...", `Connecting to ${apiEndpoint}`);
                response;
            }
            catch (exception) {
                ai.log.logError('HTTPS connection request failed', ''+exception);
                throw "Connection Error";
            }
            
            if (response.getHttpCode() == '200') {
                ai.log.logVerbose('Connection successful. Retrieving data...');
                var responseBody = response.getBody();
                // Locate the embedded object within the JSON response containing the rows of data
                var data = JSON.parse(responseBody).Rows.Row[0].Rows.Row;
                
                ai.log.logInfo('Getting row count...', `${data.length} rows`);
                
                for (i = 0; i < data.length; i++) {
                    dataRowset.addRow(
                        [
                            new Date(data[i].ColData[0].value),
                            Number(data[i].ColData[6].value),
                            Number(data[i].ColData[7].value),
                            data[i].ColData[1].value,
                            data[i].ColData[2].value,
                            data[i].ColData[3].value,
                            data[i].ColData[4].value,
                            data[i].ColData[5].value
                        ]
                    );
                }
            } else {
                ai.log.logError('Error retrieving data from source.', +exception);
                throw "Error";
            }
        }
    }
}