describe('In Main', function() {
    describe('When module initialize', function() {
        beforeEach(function() {
            spyOn(APP, 'log');
        });
        it('log function should be called', function() {
            APP.init();
            expect(APP.log).toHaveBeenCalled();
        });
    });
});