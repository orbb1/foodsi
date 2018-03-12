describe('in Router', function() {
    var router = Router.getInstance();
    var routes = router.routes;

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
    
    routes.push(about);
    routes.push(home);

    describe('when Router initialize', function() {
        var routerInstance2 = Router.getInstance();

        it('sould be Singleton', function() {
            expect(router === routerInstance2).toBeTruthy();
        });
    });

    describe('when "navigate" method called', function() {
        beforeEach(function() {
            spyOn(home, 'init');
        });

        it('should call proper route init method', function() {
            router.navigate('home', routes)
            expect(home.init).toHaveBeenCalled();
        });

        it('should call default route init method', function() {
            router.navigate('', routes)
            expect(home.init).toHaveBeenCalled();
        })
    });

    describe('when "when" method called', function() {
        it('should return router instanse for chainig', function() {
            expect(router.when(contacts)).toEqual(router);
        });
        
        it('sould add route config to list of configs', function() {
            router.when(contacts);
            expect(routes).toContain(contacts);
        });

        it('sould not add wrong route config to list of configs', function() {
            router.when(wrongRoute1);
            expect(routes).not.toContain(wrongRoute1);
        });
    });
})