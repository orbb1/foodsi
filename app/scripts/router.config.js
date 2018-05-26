function routerInit() {
    var router = Router.getInstance();

    router
        .when({url: 'home', init: APP.modules.home.init, destroy: APP.modules.home.destroy})
        .when({url: 'charts', init: APP.modules.charts.init, destroy: APP.modules.charts.destroy})
        .otherwise('home');
}
routerInit();