define(function (require) {

    var conf = require('common/conf');
    var variable = require('common/variable');

    var DOMID = {
        btnNext: 'button-nextday'
    };

    var init = function (context) {
        T.on(DOMID.btnCreate, 'click', function (e) {

            nextDay(context);
        });
    };

    function nextDay(context) {
        // TODO
    }

    return {
        init: init
    };
    
});