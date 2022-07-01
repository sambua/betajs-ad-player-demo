BetaJS.Dynamics.Dynamic.extend(null, {
    templateUrl: '/public/components/ba-radio-example-type.html',


    functions: {

        on_example_type_changed: function (ev) {
            const {value} = ev[0].target;
            this.trigger("change", value);
        }

    }

}).register("ba-radio-example-type");
