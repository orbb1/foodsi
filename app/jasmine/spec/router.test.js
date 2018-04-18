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
        url: 'wrongUrl',
        init: 'wrongInit'
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
            router.routes = {};
        });

        describe('and route is on routes list', function() {
            beforeEach(function() {
                router.when(about);
                router.when(home);
                spyOn(router.routes.about, 'init');
            });
            it('should call proper route init method', function() {
                router.navigate('about',  router.routes);
                expect(router.routes.about.init).toHaveBeenCalled();
            });
        });

        describe('and route is not on routes list', function() {
            beforeEach(function() {
                home.default = true;
                router.routes.home = home;
                spyOn(router.routes.home, 'init');
            });
            afterEach(function() {
                home.default = false;
            });
            it('should call default route init method', function() {
                console.log(router.routes.home);
                router.navigate('',  router.routes);
                expect(router.routes.home.init).toHaveBeenCalled();
            });
        });

        describe('and route is same as active route', function() {
            beforeEach(function() {
                router.routes.home = home;
                router.navigate('home',  router.routes);
                spyOn(router.routes.home, 'init');
            });
            it('should not call any route config init method', function() {
                router.navigate('home',  router.routes);
                expect(router.routes.home.init).not.toHaveBeenCalled();
            });
        });

        
    });

    describe('when "when" method called', function() {

        beforeEach(function() {
            router.routes = {};
        });

        afterEach(function() {
            router.routes = {};
        });

        it('should return router instanse for chainig', function() {
            expect(router.when()).toEqual(router);
        });
        
        it('sould add route config to list of configs', function() {
            router.when(contacts);
            expect(router.routes[contacts.url]).toEqual(contacts);
        });

        it('sould not add wrong route config to list of configs', function() {
            router.when(wrongRoute1);
            var routeNames = Object.keys(router.routes)
            expect(routeNames).not.toContain(wrongRoute1.url);
        });
    });
    describe('when "otherwise" method called with url as parameter', function() {
        beforeEach(function() {
            router.routes[about.url] = about;
            router.routes[contacts.url] = contacts;
        });

        afterEach(function() {
            router.routes = {};
        });

        it('should set add to route config with this url property default to equal true', function() {
            router.otherwise(about.url);
            expect(router.routes.about.default).toBe(true);
        });
    });
});