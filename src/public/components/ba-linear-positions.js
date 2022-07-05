BetaJS.Dynamics.Dynamic.extend(null, {
    templateUrl: '/public/components/ba-linear-positions.html',

    attrs: {
        preRollCheck: false,
        postRollCheck: false,
        midRollCheck: false,
        midOptions: '50%',
        singularMidRoll: null,
        customMidRoll: null,
        allOptions: {
            pre: false, post: false, mid: null
        }
    },

    events: {
        "change:preRollCheck": function (value) {
            const allOptions = {...this.get('allOptions'), pre: value};
            this.set("allOptions", allOptions);
        },

        "change:postRollCheck": function (value) {
            const allOptions = {...this.get('allOptions'), post: value};
            this.set("allOptions", allOptions);
        },

        "change:midRollCheck": function (value) {
            this.set("midOptions", value ? '50%' : null);
            const allOptions = {...this.get('allOptions'), mid: this.get("midOptions")};
            this.set("allOptions", allOptions);
        },

        "change:midOptions": function (value) {
            const allOptions = {...this.get('allOptions'), mid: value};
            this.set("allOptions", allOptions);
        },

        "change:allOptions": function (value) {
            this.trigger("change", value);
        }
    },

    functions: {

        on_linear_option_checking: function (ev) {
            const {value} = ev[0].target;
            this.trigger("change", value);
        }

    }

}).register("ba-linear-positions");
