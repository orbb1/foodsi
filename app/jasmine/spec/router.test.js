describe('in Router', function() {
    var router,
        routes;

    var home = {
        url: 'home',
        init: function() { },
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
    });
    afterEach(function() {
        router = null;
    });

    describe('when Router initialize', function() {
        var routerInstance2 = Router.getInstance();

        it('sould be Singleton', function() {
            expect(router === routerInstance2).toBeTruthy();
        });
    });

    describe('when "navigate" method called', function() {

        afterEach(function() {
            router.routes = [];
        });

        describe('and route is on routes list', function() {
            beforeEach(function() {
                router.when(about);
                router.when(home);
                spyOn(about, 'init');
            });
            it('should call proper route init method', function() {
                router.navigate('about',  router.routes);
                expect(about.init).toHaveBeenCalled();
            });
        })

        describe('and route is not on routes list', function() {
            beforeEach(function() {
                router.when(home);
                router.otherwise('home');
                spyOn(home, 'init');
            });
            it('should call default route init method', function() {
                router.navigate('',  router.routes);
                expect(home.init).toHaveBeenCalled();
            });
        });

        describe('and route is same as active route', function() {
            beforeEach(function() {
                router.when(home);
                spyOn(home, 'init');
            });
            it('should not call any route config init method', function() {
                router.navigate('home',  router.routes);
                expect(home.init).not.toHaveBeenCalled();
            });
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
            expect(router.routes).not.toContain(wrongRoute1);
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