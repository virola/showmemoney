define(function () {

    var params = {

        // money
        fund: {

            // 初始资金
            base: 10 * 10000
        },

        corp: {

            // name
            name: 'X-corp'
        },

        date: {

            // 起始时间
            base: +(new Date)
        },


        // 等级、经验值
        level: {

            // 等级上限
            step: {
                1: 100,
                2: 300
            }
        }

    };

    var building = {
        type: {
            'base': {
                name: '工作室',
                cost: 10000,
                exp: 100,
                desc: '工作室会有一些描述'
            }
        }
    };

    var staff = {
        type: {
            'normal': {
                name: '普通员工',
                cost: 350, // 日薪
                exp: 50,   // 一次性经验
                desc: '就是普通的那种员工'
            },
            'hero': {
                name: '专业人士',
                cost: 800, // 日薪
                exp: 200,
                desc: '神一样的队友'
            }
        }
    };

    params.building = building;
    params.staff = staff;

    return params;
});