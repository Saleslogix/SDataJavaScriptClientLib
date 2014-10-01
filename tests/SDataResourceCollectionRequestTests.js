define('spec/SDataResourceCollectionRequestTests', [
    'dojo/text!./TestFeed.xml',
    'dojo/text!./TestFeedExplicit.xml',
    'dojo/text!./TestFeedWithPrefix.xml',
    'dojo/text!./TestFeed.json'
], function(
    xmlTestFeed,
    xmlTestFeedExplicit,
    xmlTestFeedPrefix,
    jsonTestFeed
) {
    describe('SDataResourceCollectionRequest', function() {
        var service,
            withResponseContent = function(text) {
                spyOn(Sage.SData.Client.Ajax, 'request').and.callFake(function(options) {
                    options.success.call(options.scope || this, {
                        responseText: text
                    });
                });
            };

        beforeEach(function() {
            service = new Sage.SData.Client.SDataService({
                serverName: 'localhost',
                virtualDirectory: 'sdata',
                applicationName: 'aw',
                contractName: 'dynamic'
            });
        });

        it('can build url with paging', function() {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees')
                .setStartIndex(1)
                .setCount(100);

            expect(request.build()).toEqual("http://localhost/sdata/aw/dynamic/-/employees?startIndex=1&count=100");
        });

        it('can build url with query', function() {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees')
                .setQueryArg('where', 'gender eq m');

            expect(request.build()).toEqual("http://localhost/sdata/aw/dynamic/-/employees?where=gender%20eq%20m");
        });

        it('can read atom feed with non-prefixed properties', function() {

            withResponseContent(xmlTestFeed);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees');

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(feed) {
                expect(feed).toExist();
                expect(feed).toHaveProperty('$totalResults', 2);
                expect(feed).toHaveProperty('$resources');
                expect(feed).toHaveProperty('$resources.length', 2);
                expect(feed).toHaveProperty('$resources.0.ContactId', '1209');
            })(success.calls.mostRecent().args[0]);
        });

        it('can read explicitly namespaced atom feed', function() {

            withResponseContent(xmlTestFeedExplicit);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees');

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(feed) {
                expect(feed).toExist();
                expect(feed).toHaveProperty('$totalResults', 2);
                expect(feed).toHaveProperty('$resources');
                expect(feed).toHaveProperty('$resources.length', 2);
                expect(feed).toHaveProperty('$resources.0.ContactId', '1209');
            })(success.calls.mostRecent().args[0]);
        });

        it('can read atom feed with prefixed properties', function() {

            withResponseContent(xmlTestFeedPrefix);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees');

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(feed) {
                expect(feed).toExist();
                expect(feed).toHaveProperty('$resources');
                expect(feed).toHaveProperty('$resources.length', 2);
                expect(feed).toHaveProperty('$resources.0.ContactId', '1209');
            })(success.calls.mostRecent().args[0]);
        });

        it('can read json feed', function() {

            withResponseContent(jsonTestFeed);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees');

            service.enableJson();

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(feed) {
                expect(feed).toExist();
                expect(feed).toHaveProperty('$resources');
                expect(feed).toHaveProperty('$resources.length', 2);
                expect(feed).toHaveProperty('$resources.0.ContactId', '1209');
            })(success.calls.mostRecent().args[0]);
        });

        it('uses correct accept header for atom', function() {
            spyOn(Sage.SData.Client.Ajax, 'request');

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees');

            request.read();

            (function(options) {
                expect(options).toHaveProperty('headers');
                expect(options).toHaveProperty('headers.Accept', 'application/atom+xml;type=feed,*/*');
            })(Sage.SData.Client.Ajax.request.calls.mostRecent().args[0]);
        });

        it('uses correct accept header for json', function() {
            spyOn(Sage.SData.Client.Ajax, 'request');

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('employees');

            service.enableJson();

            request.read();

            (function(options) {
                expect(options).toHaveProperty('headers');
                expect(options).toHaveProperty('headers.Accept', 'application/json,*/*');
            })(Sage.SData.Client.Ajax.request.calls.mostRecent().args[0]);
        });
    });
});
