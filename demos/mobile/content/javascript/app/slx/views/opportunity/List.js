﻿/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

Mobile.SalesLogix.Opportunity.List = Ext.extend(Sage.Platform.Mobile.List, {   
    itemTemplate: new Simplate([
        '<li>',
        '<a href="#opportunity_detail" target="_detail" m:key="{%= $key %}" m:url="{%= $url %}">',
        '<h3>{%= __v["Description"] %}</h3>',
        '<h4>{%= __v["Account"]["AccountName"] %}</h4>',
        '</a>',
        '</li>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'opportunity_list',
            title: 'Opportunities',
            pageSize: 10,
            icon: 'content/images/app/slx/Opportunity_List_24x24.gif'
        });
    },   
    formatSearchQuery: function(query) {
        return String.format('(Description like "%{0}%")', query);
        // todo: unable to currently work, NH is unable to resolve Account property.
        //return String.format('(Description like "%{0}%" or Account.AccountName like "%{0}%")', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Opportunity.List.superclass.createRequest.call(this);

        request           
            .setResourceKind('opportunities')
            .setQueryArgs({
                'include': 'Account',
                'orderby': 'Description',
                'select': 'Description,Account/AccountName'                             
            });

        return request;
    }
});