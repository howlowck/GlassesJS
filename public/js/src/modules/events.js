define([], function ()
    {
        var Events = {
            _events: {},
            on : function (name, callback, ctx) {
                var events = this._events[name] || (this._events[name] = []);
                events.push({callback: callback, context: ctx || this});
                return this;
            },
            trigger: function (eventName, payload, ctx) {
                console.log('triggered ' + eventName);
                var events = this._events[eventName],
                    i = 0,
                    length = events ? events.length : 0;
                while (i < length) {
                    events[i].callback.call(events[i].context, payload);
                    i++;
                }
                return;
            }
        };

        return Events;
    }
);