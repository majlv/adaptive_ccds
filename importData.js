function importData(context) {
    var dataSource = context.getDataSource();
    var realmID = dataSource.getSetting("realmID").getValue();
    var apiEndpoint = dataSource.getSetting("apiEndpoint").getValue();
    var startDateString = dataSource.getSetting("Period Range").getValue().getFromPeriodStartDateTime().substring(0, 10);
    var endDateString = dataSource.getSetting("Period Range").getValue().getToPeriodEndDateTime().substring(0, 10);
    // var requestURL = `${apiEndpoint}/v3/company/${realmID}/reports/GeneralLedger?start_date=${startDateString}&end_date=${endDateString}&accounting_method=Accrual&account=33&minorversion=62`;
    var method = 'GET';
    var body = '';
    var headers = { };
    
    var tableId = context.getRowset(['id']).getTableId();
    ai.log.logInfo('Table', 'Table Name ' + tableId);

    var columnsMap = [];
    var dataCell = [];
    
    if (tableId == 'acctsPybl') {
        var actRowset = context.getRowset(["tx_date", "amount", "balance", "tx_type", "doc_num", "name", "memo", "split_acc"]);
        var apAmtColumns = actRowset.getColumns();
        
        var sourceAccountId = 33;
        requestURL = `${apiEndpoint}/v3/company/${realmID}/reports/GeneralLedger?start_date=${startDateString}&end_date=${endDateString}&accounting_method=Accrual&account=${sourceAccountId}&minorversion=62`;
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
            var importData = JSON.parse(responseBody).Rows.Row[0].Rows.Row;
            
            ai.log.logInfo('Getting row count...', `${importData.length} rows`);
            
            for (ap = 0; ap < importData.length; ap++) {
                actRowset.addRow(
                    [
                        new Date(importData[ap].ColData[0].value),
                        Number(importData[ap].ColData[6].value),
                        Number(importData[ap].ColData[7].value),
                        importData[ap].ColData[1].value,
                        importData[ap].ColData[2].value,
                        importData[ap].ColData[3].value,
                        importData[ap].ColData[4].value,
                        importData[ap].ColData[5].value
                    ]
                );
            }
        } else {
            ai.log.logError('Error retrieving data from source.', +exception);
            throw "Error";
        }
    }
}