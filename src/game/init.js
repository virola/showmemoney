define(function (require) {

    function init(context) {
        initBaseContextChanger(context);

        var params = require('common/variable');
        initNumbers(params, context);

        var conf = require('common/conf');
        initCrafty(conf, context);

        require(['./building'], function (building) {
            building.init(context);
        });

        require(['./staff'], function (staff) {
            staff.init(context);
        });
    }

    var q = T.dom.query;

    var doms = {
        fund: q('#info-fund>span')[0],
        level: q('#info-level>span')[0],
        exp: q('#info-exp>span')[0],
        corpname: q('#info-corpname>span')[0],
        headcount: q('#info-headcount>span')[0],
        date: q('#info-date>span')[0]
    };

    function initNumbers(options, context) {
        var params = {
            fund: options.fund.base,
            corpname: options.corp.name,
            headcount: 0,
            datetime: options.date.base,
            exp: 0,
            level: 1
        };

        for ( var i in params) {
            context.set(i, params[i]);
        }
    }

    function initCrafty(conf, context) {
        require(['./crafty'], function (crafty) {
            context.set('crafty', Crafty);
            crafty.init();
            
        })
    }

    function initBaseContextChanger(context) {
        context.onchange('fund', function (args) {
            doms.fund.innerHTML = args.value;
        });

        context.onchange('exp', function (args) {
            doms.exp.innerHTML = args.value;
        });

        context.onchange('level', function (args) {
            doms.level.innerHTML = args.value;
        });

        context.onchange('corpname', function (args) {
            doms.corpname.innerHTML = args.value;
        });

        context.onchange('headcount', function (args) {
            doms.headcount.innerHTML = args.value;
        });

        context.onchange('datetime', function (args) {
            doms.date.innerHTML = T.date.format(
                new Date(args.value), 
                'yyyy年MM月dd日'
            );
        });
    }

    return {
        init: init
    };
});