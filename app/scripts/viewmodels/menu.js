/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};

    win.app.Menu = kendo.observable({

        dataSource: win.app.storeStock,

        favoriteFilter: { field: "favorited", operator: "eq", value: true },
        popularList: null,
        favoritesEmpty: true,
        /*photoListVisible: false,
        favoriteListVisible: false,
        favoritePhotoListVisible: false,*/
        inListView: true,
        title: "Menu",
        

        setupImageHandlers: function(selector) {
            $(selector).each(function() {
                $(this).data("kendoMobileListView")
                    .bind("dataBound", everliveImages.responsiveAll);
            });
        },

        
        showMenuView: function () {
            console.log("start show");           
            win.app.Menu.dataSource.filter({});
            console.log("end show");
            setTimeout(everliveImages.responsiveAll);
        },

        menuShow: function (e) {
           console.log('show')
          
            $("#popular-list").kendoMobileListView({
               dataSource: win.app.Menu.dataSource,
               template: $('#menuTemplate').html(),
               //invisible: win.app.Menu.photoListVisible
            }).data("kendoMobileListView");

            $("#popular-photo-list").kendoMobileListView({
                dataSource: win.app.Menu.dataSource,
               template: $('#photoMenuTemplate').html(),
               //visible: win.app.Menu.photoListVisible
            }).data("kendoMobileListView");
            
            win.app.Menu.setupImageHandlers("#popular-list,#popular-photo-list");
           
              
        },

        menuHide: function () {
            console.log("destroying")
            var listView1 = $("#popular-list").data("kendoMobileListView");
            listView1.destroy();
            var listView2 = $("#popular-photo-list").data("kendoMobileListView");
            listView2.destroy();
        },

        showFavoriteView: function () {

            this.dataSource.filter(null);
            this.dataSource.filter(this.favoriteFilter);
            setTimeout(everliveImages.responsiveAll);
        },

        favoritesShow: function () {

            $("#favorite-list").kendoMobileListView({
                dataSource: win.app.Menu.dataSource,
                template: $('#menuTemplate').html(),
                //visible: win.app.Menu.dataSource.aggregates().id.count 
                //invisible: win.app.Menu.photoListVisible               
            }).data("kendoMobileListView"); 

            $("#favorite-photo-list").kendoMobileListView({
                dataSource: win.app.Menu.dataSource,
                template: $('#photoMenuTemplate').html(),
                //visible: win.app.Menu.photoListVisible                
            }).data("kendoMobileListView"); 

            $("#favorite-photo-list").hide();
            win.app.Menu.setupImageHandlers("#favorite-list, #favorite-photo-list");

        },

        favoritesHide: function(){
           console.log("destroying")
            var listView1 = $("#favorite-list").data("kendoMobileListView");
            listView1.destroy(); 
            var listView2 = $("#favorite-photo-list").data("kendoMobileListView");
            listView2.destroy(); 
        },

        showCategoryView: function () {

            
            this.dataSource.filter(null);
            this.dataSource.sort({ field: "price", dir: "asc"});
            setTimeout(everliveImages.responsiveAll);
        },

        categoriesShow: function () {
            $("#category-list").kendoMobileListView({
                dataSource: win.app.Menu.dataSource,
                template: $('#menuTemplate').html(),
                //invisible: win.app.Menu.photoListVisible                
            }).data("kendoMobileListView"); 

            $("#category-photo-list").kendoMobileListView({
                dataSource: win.app.Menu.dataSource,
                template: $('#photoMenuTemplate').html(),
                //visible: win.app.Menu.photoListVisible               
            }).data("kendoMobileListView"); 

            win.app.Menu.setupImageHandlers("#category-list, #category-photo-list");

        },

        categoriesHide: function(){
           console.log("destroying")
            var listView1 = $("#category-list").data("kendoMobileListView");
            listView1.destroy(); 
            var listView2 = $("#category-photo-list").data("kendoMobileListView");
            listView2.destroy(); 
        },

        changeSort: function (e) {
            this.dataSource.sort({ field: "price", dir: e.currentTarget.value });
        },

        

        addToFavorites: function (e) {
            console.log("adding");
            e.preventDefault();
            var fromDs = this.dataSource.get(e.data.id);
            if (!fromDs.favorited) {
                fromDs.set('favorited', true);
            }

            /*if (this.photoListVisible) {
                this.set("favoritePhotoListVisible", true);
            } else {
                this.set("favoriteListVisible", true);
            }*/

            this.dataSource.sync();
        },

        removeFromFavorites: function (e) {

            console.log("removing")

            e.preventDefault();
            var fromDs = this.dataSource.get(e.data.id);
            if (fromDs.favorited) {
                fromDs.set('favorited', false);
            }

            if (this.dataSource.aggregates().id === undefined) {
                this.set("favoritesEmpty", true);

                //TODO: this isn't working exactly correct.
                this.dataSource.filter(this.favoriteFilter);
            }

            //TODO: sync the 
        },

        addToCart: function (e) {
            e.preventDefault();
            var fromDs = win.app.Menu.dataSource.get(e.data.id);
            fromDs.set('incart', true);
            var newQ = fromDs.qty === undefined ? 1 : fromDs.qty + 1;
            fromDs.set('qty', newQ);
            fromDs.set('itemPrice', fromDs.qty * fromDs.price);
            this.dataSource.sync();
        },

        changeView : function (e) {
            var that = this;
            e.preventDefault();
            var icon = $('#view-changer .km-icon');
            if (icon.hasClass('km-th-large')) {
                icon.removeClass('km-th-large').addClass('km-list-bullet');
                //that.set("photoListVisible", true);
                $("#popular-photo-list").show();
                $("#popular-list").hide();
                $("#favorite-photo-list").show();
                $("#favorite-list").hide();
                $("#category-photo-list").show();
                $("#category-list").hide();
                /*if (!that.favoritesEmpty) {
                    that.set("favoriteListVisible", false);
                    that.set("favoritePhotoListVisible", true);
                }*/
            } else {
                icon.removeClass('km-list-bullet').addClass('km-th-large');
                //that.set("photoListVisible", false);
                $("#popular-photo-list").hide();
                $("#popular-list").show();
                $("#favorite-photo-list").hide();
                $("#favorite-list").show();
                $("#category-photo-list").hide();
                $("#category-list").show();
                /*if (!that.favoritesEmpty) {
                    that.set("favoritePhotoListVisible", false);
                    that.set("favoriteListVisible", true);
                }*/
            }
            everliveImages.responsiveAll();
        },

        changeFilter : function () {

            var chargeFilter = {
                logic: 'or',
                filters: []
            };
            if ($("#filter-barbecue").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "barbeque"}); 
            }
            if ($("#filter-drink").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "drinks"});
            }
            if ($("#filter-sandwich").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "sandwiches"});
            }
            if ($("#filter-dessert").is(":checked")) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "desserts"});
            }

            //check to see if they are all not checked and create a filter that will return nothing
            if (chargeFilter.filters.length === 0) {
                chargeFilter.filters.push({field: "type", operator: "eq", value: "unicorn"});
            }
            this.dataSource.filter(chargeFilter);
        }
    });
}(window));