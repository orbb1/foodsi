describe('in HttpService', function() {
    var httpService;
    beforeEach(function() {
        httpService = APP.services.HttpService.getInstance();
    });
    afterEach(function() {
        httpService = null;
    });
    describe('when HttpService initialize', function() {
        var httpService2 = APP.services.HttpService.getInstance();

        it('sould be Singleton', function() {
            expect(httpService === httpService2).toBeTruthy();
        });
    });
});