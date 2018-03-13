describe('in Router', function() {
    var router,
        routes;

    var home = {
        url: 'home',
        init: function() { },
        default: true
    };
    var about = {
        url: 'about',
        init: function() { }
    };
    var contacts = {
        url: 'contacts',
        init: function() { }
    };

    var wrongRoute1 = {
        init: function() { }
    };

    beforeEach(function() {
        router = Router.getInstance();
        //routes = router.routes;
    });

    describe('when Router initialize', function() {
        var routerInstance2 = Router.getInstance();

        it('sould be Singleton', function() {
            expect(router === routerInstance2).toBeTruthy();
        });
    });

    describe('when "navigate" method called', function() {

        beforeEach(function() {
            router.routes.push(about, home);
            spyOn(home, 'init');
        });

        afterEach(function() {
            router.routes = [];
        });

        it('should call proper route init method', function() {
            router.navigate('home',  router.routes);
            expect(home.init).toHaveBeenCalled();
        });

        it('should call default route init method', function() {
            router.navigate('',  router.routes);
            expect(home.init).toHaveBeenCalled();
        });
    });

    describe('when "when" method called', function() {

        beforeEach(function() {
            router.routes = [];
        });

        afterEach(function() {
            router.routes = [];
        });

        it('should return router instanse for chainig', function() {
            expect(router.when()).toEqual(router);
        });
        
        it('sould add route config to list of configs', function() {
            router.when(contacts);
            expect(router.routes).toContain(contacts);
        });

        it('sould not add wrong route config to list of configs', function() {
            router.when(wrongRoute1);
            expect(routes).not.toContain(wrongRoute1);
        });
    });
    describe('when "otherwise" method called with url as parameter', function() {
        beforeEach(function() {
            router.routes.push(about, contacts);
        });

        afterEach(function() {
            router.routes = [];
        });

        it('should set add to route config with this url property default to equal true', function() {
            router.otherwise(about.url);
            expect(about.default).toBe(true);
        });
    });
});