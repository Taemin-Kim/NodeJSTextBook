var sqlConfig = {
    userName: 'KTM_test', //username created from SQL Management Studio
    password: 'KTM_test',
    server: '127.0.0.1',    //the IP of the machine where SQL Server runs

    options: {
        instanceName: 'MSSQLSERVER',
        database: 'Test',  //the username above should have granted permissions in order to access this DB.
        debug: {
            packet: false,
            payload: false,
            token: false,
            data: false
        },
        //encrypt: true
    }

};