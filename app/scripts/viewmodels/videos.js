/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Videos =  kendo.observable({

        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "data/videos.json",
                    dataType: "json"
                }
            }
        }),
        title: "Videos",
        playerWidth: document.documentElement.clientWidth,
    });
}(window));