const socket = io();
// Show events from a socket message
const tracksLogger = document.getElementById('tracks-logger');
if (tracksLogger) {
    socket.on("tracking", (msg) => {
        const pElement = document.createElement('p');
        const textNode = document.createTextNode(msg.log);
        pElement.append(textNode);
        tracksLogger.append(pElement);
    });
}

const eventLogger = document.getElementById('events-logger');
if (eventLogger) {

}


const playerDemoContainer = document.getElementById('player-demo-container');
if (playerDemoContainer && window.__localData) {

    // We're getting and set data in the header
    const { exampleTypeOptions, imaEvents } = window.__localData;

    const dynamic = new BetaJS.Dynamics.Dynamic({
        element: playerDemoContainer,

        attrs: {
            xmlView: null,
            poster: null,
            playerVisible: false,
            text: "Some text",
            data: window.__localData,
            selectRadioType: null,
            selectedExampleTemplate: null,
            exampleTypeOptions,
            exampleTemplateOptions: [],
            adTagUrl: null,
            nonLinearAdTagUrl: null,
            linearSettings: '',
            nonLinearSettings: null,
            imaEvents,
        },

        collections: {
            notifications: [],
        },

        events: {
            "change:selectedExampleTemplate": function(value) {
                this.set("xmlView", "");
                this.get("notifications").clear();
                if (!value) return;
                switch (this.get("selectRadioType")) {
                    case 'localExamples':
                        BetaJS.Ajax.Support.execute({
                            method: "POST",
                            uri: '/vast-generator',
                            data: {
                                exampleName: value
                            }
                        }).success((resp) => {
                            const { errors, data, url } = resp;
                            if (errors.length > 0) {
                                this._setNotification(errors.map(err => err.message)[0]);
                            } else {
                                this.set("adTagUrl", location.protocol + '//' + location.host + url);
                                this.set("xmlView", data);
                                // this._setNotification('New template was generated on URL: ' + url, 'success');
                            }
                        }).error((err) => {
                            this._setNotification('Error: ' + JSON.stringify(err), 'danger');
                        });
                        break;
                    case 'doubleClickExamples':
                        this.set("adTagUrl", value);
                        // this._setNotification('Ads Tag URL: ' + value, "info");
                        break;
                    default:
                        this._setNotification('Coming SOON :)', 'success', 3);
                        break;
                }
            }
        },

        create: function () {

            this._clear_notification_by_id = (id) => {
                this.get("notifications").iterate((_notification) => {
                    if (_notification.get("id") === +id) {
                        this.get("notifications").remove(_notification);
                    }
                }, this)
            };

            this._setNotification = (message, type, disableSeconds) => {
                type = type || 'danger';
                disableSeconds = disableSeconds || 0;
                const id = (Date.now() - Math.random() * 10000) * 10000;
                this.get("notifications").add({
                    id, type, message
                });

                if (disableSeconds > 0 && id) {
                    BetaJS.Async.eventually(() => {
                        this._clear_notification_by_id(id);
                    }, this, disableSeconds * 1000);
                }
            };
        },

        object_functions: ["example_type_changed"],

        functions: {

            example_type_changed: function (value) {
                this.set("selectRadioType", value);
                const data = this.get("data");
                if (data[value] && typeof data[value] !== "undefined") {
                    this.set("exampleTemplateOptions", data[value]);
                } else {
                    this.set("exampleTemplateOptions", [{value: 1, label: 'JUST SELECT'}]);
                }
            },

            show_ad_player: function () {

                this.set("playerVisible", true);

                const _ = this;
                setTimeout(() => {
                    _.set("poster", "/public/media/sample-cover.png");
                }, 1000);

                this._ima = new BetaJS.MediaComponents.Ads.IMAProvider({
                    adTagUrl: this.get("adTagUrl"),
                    nonLinearAdTagUrl: this.get("nonLinearAdTagUrl")
                    // preAdTagUrl: 'https://localhost:5050/static/demos/vast-samples/VAST_3_0/Video_Clicks_and_click_tracking-Inline-test.xml',
                    // postAdTagUrl: 'https://localhost:5050/static/demos/vast-samples/VAST_3_0/Video_Clicks_and_click_tracking-Inline-test.xml',
                    // midAdTagUrl: 'https://localhost:5050/static/demos/vast-samples/VAST_3_0/Video_Clicks_and_click_tracking-Inline-test.xml',
                });

                this._ima.register("ima");

                this._adPlayer = new BetaJS.MediaComponents.VideoPlayer.Dynamics.Player({
                    element: document.getElementById('player'),
                    attrs: {
                        source: '/public/media/sample-video.mp4',
                        poster: '/public/media/sample-cover.png',
                        theme: 'modern',
                        adprovider: 'ima',
                        linear: this.get("linearSettings"),
                        'non-linear': this.get("nonLinearSettings")
                    }
                });

                this._adPlayer.activate();

                // ad-loaded, ad-adProgress, ad-impression, ad-complete
                BetaJS.Objs.iter(imaEvents, (_type) => {
                    this._adPlayer.on(_type, () => {
                        const pElement = document.createElement('p');
                        const textNode = document.createTextNode(`Event dispatched: ${_type}`);
                        pElement.append(textNode);
                        eventLogger.append(pElement);
                    }, this);
                }, this);
            },

            close_notification: function (ev) {
                const { target } = ev[0];
                const id = target.dataset.notification;
                if (id) {
                    this._clear_notification_by_id(id);
                } else {
                    this.get("notifications").clear();
                }
            },

            set_as_non_linear: function () {
                this.set("nonLinearAdTagUrl", this.get("adTagUrl"));
                this.set("adTagUrl", null);
            },

            remove_ad_tag_url: function () {
                this.set("adTagUrl", null);
            },

            remove_non_linear: function () {
                this.set("nonLinearAdTagUrl", null);
            },

            linear_settings_changed: function (settings) {
                this.set("linearSettings", '');
                BetaJS.Objs.iter(settings, (value, key) => {
                    let str = '';
                    if (value) {
                        str = `${key}`;
                        if (typeof value !== 'boolean') str += `[${value}]`;
                        if (this.get("linearSettings")) {
                            str = `, ${str}`;
                        }
                    }
                    this.set("linearSettings", this.get("linearSettings") + str);
                }, this);
            },

            non_linear_settings_changed: function (settings) {
                this.set("nonLinearSettings", settings);
            },

            clear_notifications: function () {
                this.get("notifications").clear();
            },
        }
    });

    dynamic.activate();
}
