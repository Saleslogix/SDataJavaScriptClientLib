﻿/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../iui/iui-sage.js"/>
/// <reference path="../Simplate.js"/>
/// <reference path="Application.js"/>

Ext.namespace('Sage.Platform.Mobile');

Sage.Platform.Mobile.View = Ext.extend(Ext.util.Observable, { 
    viewTemplate: new Simplate([
        '<ul id="{%= id %}" title="{%= title %}" {% if (selected) { %} selected="true" {% } %}>',            
        '</ul>'
    ]),    
    constructor: function(o) {
        Sage.Platform.Mobile.View.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'view',
            title: '',
            canSearch: false
        });        

        this.loaded = false;
    },
    render: function() {
        this.el = Ext.DomHelper.append(
            Ext.getBody(), 
            this.viewTemplate.apply(this), 
            true
        );
    },
    init: function() {
        this.render();
        this.el
            .on('load', function(evt, el, o) {
                if (this.loaded == false) 
                {
                    this.load(); 
                    this.loaded = true;
                }   
            }, this);        
    },
    setTitle: function(title) {
        this.el.dom.setAttribute('title', title);
    },
    load: function() {
    },
    show: function() {
        iui.showPage(this.el.dom);
    },
    beforeTransitionTo: function() {
    },
    beforeTransitionAway: function() {        
    },
    transitionTo: function() {                
    },
    transitionAway: function() {                    
    },
    getService: function() {
        /// <returns type="Sage.SData.Client.SDataService" />
        return App.getService();
    }  
});