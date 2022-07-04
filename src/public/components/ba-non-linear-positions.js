BetaJS.Dynamics.Dynamic.extend(null, {
    templateUrl: '/public/components/ba-non-linear-positions.html',

    attrs: {
        showNonLinear: false,
        nonLinearOptions: null,
    },

    events: {
        "change:showNonLinear": function (value) {
            if (value)
                this.set("nonLinearOptions", "35%[,250]");
            else
                this.set("nonLinearOptions", null);
        },

        "change:nonLinearOptions": function (value) {
            this.trigger("change", value);
        }
    },

    functions: {

        toggle: function () {
            this.set("showNonLinear", !this.get("showNonLinear"));
        }
    }

}).register("ba-non-linear-positions");
