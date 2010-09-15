JEST.testCase('creation');
JEST.before(function() {
});
JEST.it('can create service', function() {
    var service = new Sage.SData.Client.SDataService();

    ASSERT.exists(service);
});
JEST.testCase('requests');
JEST.before(function() {
    this.service = new Sage.SData.Client.SDataService({
        serverName: 'slxbrowser.sagesaleslogixcloud.com',
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: 80,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false,
        userName: 'lee',
        password: ''
    });
});
JEST.it('can read from system request', function() {
    var request = new Sage.SData.Client.SDataSystemRequest(this.service);

    ASSERT.exists(request);

    request.read({
        async: false,
        success: function() {
        },
        failure: function() {
            ASSERT.fail('fail', 'success', 'failure returned', 'fail');
        }
    });
});
JEST.run();