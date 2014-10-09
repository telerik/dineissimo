/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Claim = kendo.observable({
        showThanks: function (e) {
            var view = e.view;
            //Navigate to the thanks page
            console.log('we have the view', view);
        },
        title: "Claim your prize",
        onSim: win.navigator.simulator
    });
}(window));