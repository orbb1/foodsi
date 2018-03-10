describe('in Router', function() {
    var router = Router.getInstance();
    var routeConfig = {
        url: 'home',
        init: function() { },
        default: true
    }
    var routes = [
        {
            url: 'about',
            init: function() { }
        }
    ]

    routes.push(routeConfig);

    describe('when Router initialize', function() {
        var routerInstance2 = Router.getInstance();

        it('sould be Singleton', function() {
            expect(router === routerInstance2).toBeTruthy();
        });
    });

    describe('when navigate method called', function() {
        beforeEach(function() {
            spyOn(routeConfig, 'init');
        });

        it('should call proper route init method', function() {
            router.navigate('home', routes)
            expect(routeConfig.init).toHaveBeenCalled();
        });

        it('should call default route init method', function() {
            router.navigate('', routes)
            expect(routeConfig.init).toHaveBeenCalled();
        })
    });
})