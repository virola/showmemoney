define(function (require) {

    var conf = require('common/conf');
    var variable = require('common/variable');

    var DOMID = {
        btnCreate: 'button-build-create',
        listType: 'list-build-type'
    };

    // 持有上下文
    var _context;

    /**
     * 初始化
     * 
     * @param {Context|Object} context 游戏变量上下文
     */
    var init = function (context) {
        T.on(DOMID.btnCreate, 'click', function (e) {
            var type = T.g(DOMID.listType).value;

            addBuilding(type, context);
        });
    };


    function addBuilding(type, context) {
        var buiVar = variable.building.type[type];

        var params = {
            fund: context.get('fund') - buiVar.cost,
            exp: context.get('exp') + buiVar.exp,
            building: (context.get('building') || 0) + 1
        };

        params.maxheadcountsum = context.get('maxheadcountsum') || 0 
            + buiVar.maxheadcount;


        if (params.fund < 0) {
            errorLog('not enough money!!!');
            return false;
        }

        context.update(params);

        drawBuilding();

    }


    // 以下是画建筑的一些参数

    var BUI_CONF = {
        w: 50,
        h: 80
    };

    var count = {
        x: 0,
        y: 0
    };

    function getAxis() {
        return {
            x: (BUI_CONF.w + 10) * count.x + 10,
            y: (BUI_CONF.h + 10) * count.y + 10
        };
    }

    function drawBuilding() {
        // draw building
        

        var axis = getAxis();
        require('game/crafty')
            .addBuilding(axis.x, axis.y, BUI_CONF.w, BUI_CONF.h);

        count.x++;

        var axis = getAxis();
        if (axis.x + BUI_CONF.w > conf.display.width) {
            count.y++;
            count.x = 0;
        }
    }

    return {
        init: init
    };
});