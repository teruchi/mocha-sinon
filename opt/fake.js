// Sinon.JS初期化
var sinon = require('sinon');
var assert = require('assert');

// windowオブジェクト生成
var jsdom = require('jsdom/lib/old-api.js');
global.window = jsdom.jsdom().defaultView;

// jQuery初期化
var $ = require('jquery');


/**
 * User APIのテスト
 */
describe('Test User API', function () {

    var server;
    var spy;

    /**
     * before test
     */
    before(() => {
        // sinon Fake Server生成
        server = sinon.fakeServer.create();

        // XMLHttpRequest置き換え
        global.window.XMLHttpRequest = server.xhr;

        // Sinon Spy初期化
        spy = sinon.spy();
    });

    /**
     * after test
     */
    after(() => {
        server.restore();
    });

    /**
     * $.getのテスト
     */
    it("get /api/users/100", () => {
        // Initialize
        var response = {
            id: 100,
            name: "teruchi"
        };

        // Test
        $.getJSON('/api/users/100', spy);


        server.respond(
            'GET',
            '/api/users/100',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(response)
            ]
        );

        // Assertions
        assert(spy.calledOnce);

        assert(spy.calledWith(response));
    });
});

