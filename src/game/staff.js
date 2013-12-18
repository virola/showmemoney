define(function (require) {

    var conf = require('common/conf');
    var variable = require('common/variable');
    var crafty = require('game/crafty');

    var DOMID = {
        btnCreate: 'button-staff-add',
        listType: 'list-staff-type',
        inputNum: 'input-staff-num'
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
            var num = +(T.g(DOMID.inputNum).value);

            if (!num) {
                alert('输入的人数不对好嘛...');
                return false;
            }
            addItem({
                type: T.g(DOMID.listType).value,
                num: num
            }, context);
        });
    };


    function addItem(args, context) {
        var changeValue = variable.staff.type[args.type];

        var params = {
            fund: context.get('fund') - changeValue.cost * args.num,
            exp: context.get('exp') + changeValue.exp * args.num,
            headcount: context.get('headcount') + args.num,
            headlevel: context.get('headlevel') || {}
        };

        // 员工级别数
        params.headlevel[args.type] = (params.headlevel[args.type] || 0) + 1;

        if (params.fund < 0) {
            errorLog('not enough money!!!');
            return false;
        }

        var maxheadcount = context.get('maxheadcountsum') || 0;

        if (params.headcount > maxheadcount) {
            errorLog('not enough BUILDING for so many people!!!');
            return false;
        }

        context.update(params);

        drawItem();
    }


    // 以下是画staff的一些参数

    var BUI_CONF = {
        w: 50,
        h: 80
    };

    var count = {
        x: 0,
        y: 0,
        y2: 0
    };

    function getAxis() {
        return {
            x: (BUI_CONF.w + 10) * count.x + 10,
            y: (BUI_CONF.h + 10) * count.y + 10 + count.y2
        };
    }

    function drawItem() {
        // draw staff
        var axis = getAxis();

        crafty.addFlower(axis.x, axis.y);

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