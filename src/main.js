/**
 * @file Main
 */

define(function (require) {

    function Context(params) {
        this._handlers = {};

        this._context = {};
        for ( var i in params) {
            this._context[i] = params[i];
        }
    }

    Context.prototype = {
        set: function(key, value) {
            var isChanged = false;
            if (
                this._context[key] === undefined
                || this._context[key] !== value
            ) {
                isChanged = true;
            }

            this._context[key] = value;

            // data changer
            if (this._handlers[key]) {

                if (this._handlers[key].type || isChanged) {
                    var func = this._handlers[key].handler || new Function();

                    func({
                        key: key,
                        value: value
                    });
                }
                
            }
        },

        get: function(key) {
            return this._context[key];
        },

        update: function(params) {
            for ( var i in params) {
                this.set(i, params[i]);
            }
        },

        onchange: function(key, handler, force) {
            this._handlers[key] = {
                type: force ? 1 : 0,
                handler: handler
            };
        }

    };

    
    function init() {
        require(['game/init'], function (game) {
            var _gameContext = new Context();
            game.init(_gameContext);
        });

        require(['etpl/main'], function (etpl) {
            // TODO
        });
    }

    return {
        init: init
    };
});