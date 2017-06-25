// Sinon.JS初期化
var sinon = require('sinon');
var assert = require('assert');

// jQuery初期化
var jsdom = require('jsdom/lib/old-api.js');
global.window = jsdom.jsdom().defaultView;

var $ = require('jquery');


/**
 * User APIのテスト
 */
describe('Test User API', function () {

    var server;
    var spy;

    before(() => {
        server = sinon.fakeServer.create();

        global.XMLHttpRequest = global.window.XMLHttpRequest = server.xhr;

        var onCreate = global.window.XMLHttpRequest.onCreate;

        global.window.XMLHttpRequest.onCreate = function(xhr) {
            xhr.setRequestHeader = sinon.stub();
            xhr.getAllResponseHeaders = sinon.stub();

            onCreate(xhr);
        };

        spy = sinon.spy();
    });

    after(() => {
        server.restore();
    });

    /**
     * $.getのテスト
     */
    it("get /api/users/100", function() {
        $.getJSON('/api/users/100', spy);

        //server.respond('{id:100, name:"teruchi"}');
        server.respond(
            'GET',
            '/api/users/100',
            [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify({id:100, name:"teruchi"})
            ]
        );

        assert(spy.called);

        assert(spy.calledWith({id:100, name:"teruchi"}));
    });
});
