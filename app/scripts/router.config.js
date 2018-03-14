function init() {
    var router = Router.getInstance();

    router
        .when({url: 'home', init: APP.modules.home.init})
        .otherwise('home');
};
init();