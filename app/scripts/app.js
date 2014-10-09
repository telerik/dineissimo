/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    everliveImages.init("eyD4rLcMGB8J6ljO");

    win.app = (function () {

        // global error handling
        var showAlert = function (message, title, callback) {

            if (win.navigator.simulator) {
                win.alert(message);
            } else {
                navigator.notification.alert(message, callback, title, 'OK');
            }
        };

        var onDeviceReady = function () {
            win.addEventListener('erroring', function (e) {
                e.preventDefault();
                console.log("Error", e);
                var message = e.message + "' from " + e.filename + ":" + e.lineno;
                showAlert(message, 'Error occurred');
                return true;
            });
            win.app.storeStock.read();

            if (!win.navigator.simulator) {
                navigator.splashscreen.hide();
            }
        };

        //Initialize the KendoUI app
        var mobileApp = null;

        //console.log("win.navigator", window.navigator);
        //showAlert("We are running in simulator?:" + win.navigator.simulator);
        
        if (win.navigator.simulator) {
            mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/menu.html" });
        } else {
            mobileApp = new kendo.mobile.Application(document.body, { skin: "flat", initial: "views/intro.html" });
            //seem to have issues if this isn't set to false
            win.navigator.simulator = false;
        }

        // Create a single list of products, and use filters rather than having seperate ones for favorites, menu, and shopping cart
        var storeStock = new kendo.data.extensions.LocalStorageDataSource({
                itemBase: 'items-kendo',
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            title: { type: "string"},
                            description: { type: "string"},
                            price: { type: "number"},
                            imgSrc: { type: "string"},
                            favorited: { type: "boolean", defaultValue: false},
                            incart: { type: "boolean", defaultValue: false},
                            qty: { type: "number"},
                            itemPrice: { type: "number", defaultValue: 0}
                        }
                    }
                },
                aggregate: [
                    { field: "id", aggregate: "count" },
                    { field: "itemPrice", aggregate: "sum" }
                ]
            });

        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener("deviceready",  onDeviceReady);

        return {
            mobileApp: mobileApp,
            alert: showAlert,
            storeStock: storeStock,
            debug:  function () {
                //Helper function to run debug code on a device. 
            },
        };

    }());
}(window));