define('spec/SDataSingleResourceRequestTests', [
    'dojo/text!./TestEntryWithPrefix.xml',
    'dojo/text!./TestEntryMixedPrefix.xml',
    'dojo/text!./TestEntry.xml'
], function(
    xmlTestEntryWithPrefix,
    xmlTestEntryWithMixedPrefix,
    xmlTestEntry
) {
    describe('SDataSingleResourceRequest', function() {
        var service,
            xml = new XML.ObjTree(),
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

        it('can build url with simple selector', function() {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector('1');

            expect(request.build()).toEqual("http://localhost/sdata/aw/dynamic/-/employees(1)?_includeContent=false");
        });

        it('can build url with complex selector', function() {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector("id eq '1234'");

            expect(request.build()).toEqual("http://localhost/sdata/aw/dynamic/-/employees(id%20eq%20'1234')?_includeContent=false");
        });

        it('can read atom entry with prefixed properties', function() {

            withResponseContent(xmlTestEntryWithPrefix);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector('1');

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(entry) {
                expect(entry).toExist();
                expect(entry).toHaveProperty('NationalIdNumber');
                expect(entry).toHaveProperty('DirectReports');
                expect(entry).toHaveProperty('DirectReports.$resources');
                expect(entry).toHaveProperty('DirectReports.$resources.length', 2);
                expect(entry).toHaveProperty('DirectReports.$resources.0.NationalIdNumber', '14417808');
            })(success.calls.mostRecent().args[0]);
        });

        it('can read atom entry with mixed properties', function() {

            withResponseContent(xmlTestEntryWithMixedPrefix);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector('1');

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(entry) {
                expect(entry).toExist();
                expect(entry).toHaveProperty('NationalIdNumber');
                expect(entry).toHaveProperty('DirectReports');
                expect(entry).toHaveProperty('DirectReports.$resources');
                expect(entry).toHaveProperty('DirectReports.$resources.length', 2);
                expect(entry).toHaveProperty('DirectReports.$resources.0.NationalIdNumber', '14417808');
            })(success.calls.mostRecent().args[0]);
        });

        it('can read atom entry with non-prefixed properties', function() {

            withResponseContent(xmlTestEntry);

            var success = jasmine.createSpy(),
                failure = jasmine.createSpy();

            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector('1');

            request.read({
                success: success,
                failure: failure
            });

            expect(success).toHaveBeenCalled();
            expect(failure).not.toHaveBeenCalled();

            (function(entry) {
                expect(entry).toExist();
                expect(entry).toHaveProperty('NationalIdNumber');
                expect(entry).toHaveProperty('DirectReports');
                expect(entry).toHaveProperty('DirectReports.$resources');
                expect(entry).toHaveProperty('DirectReports.$resources.length', 2);
                expect(entry).toHaveProperty('DirectReports.$resources.0.NationalIdNumber', '14417808');
            })(success.calls.mostRecent().args[0]);
        });

        it('uses correct accept header for atom', function() {
            spyOn(Sage.SData.Client.Ajax, 'request');

            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector('1');

            request.read();

            (function(options) {
                expect(options).toHaveProperty('headers');
                expect(options).toHaveProperty('headers.Accept', 'application/atom+xml;type=entry,*/*');
            })(Sage.SData.Client.Ajax.request.calls.mostRecent().args[0]);
        });

        it('uses correct accept header for json', function() {
            spyOn(Sage.SData.Client.Ajax, 'request');

            var request = new Sage.SData.Client.SDataSingleResourceRequest(service)
                .setResourceKind('employees')
                .setResourceSelector('1');

            service.enableJson();

            request.read();

            (function(options) {
                expect(options).toHaveProperty('headers');
                expect(options).toHaveProperty('headers.Accept', 'application/json,*/*');
            })(Sage.SData.Client.Ajax.request.calls.mostRecent().args[0]);
        });
    });
});
