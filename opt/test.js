// Sinon.JS初期化
var sinon = require('sinon');
var assert = require('assert');

// jQuery初期化
var jsdom = require('jsdom/lib/old-api.js');
var window = jsdom.jsdom().defaultView;
var $ = require('jquery')(window);

/**
 * User APIのテスト
 */
describe('Test User API', function () {

    /**
     * $.getのテスト
     * ※callbackの完了を待つ
     */
    it("get /api/users/100", function (done) {
        // sinon.stab で$.getを置き換え
        sinon.stub($, 'get').callsFake(function(url, success, dataType) {
            success({
                id: 100,
                name: 'teruchi'
            });
        });

        // テスト
        $.get(
            '/api/users/100',
            function (data) {
                // Assertion
                assert.equal(100, data.id);
                assert.equal('teruchi', data.name);

                // スタブから元に戻す
                $.get.restore();

                // callback完了をmochaに通知
                done();
            },
            'json'
        );
    });

    /**
     * $.ajaxのテスト
     * ※callbackの完了を待つ
     */
    it("ajax /api/users/100", function (done) {
        // sinon.stab で$.ajaxのreturnのdoneを置き換え
        sinon.stub($, 'ajax').returns({
            done : function(callback) {
                callback({
                    id: 100,
                    name: 'teruchi'
                });
            }
        });

        // テスト
        $.ajax({
            method: 'GET',
            url: '/api/users/100',
            dataType: 'json'
        })
        .done(function(data) {
            // Assertion
            assert.equal(100, data.id);
            assert.equal('teruchi', data.name);

            // スタブから元に戻す
            $.ajax.restore();

            // callback完了をmochaに通知
            done();
        });
    });
});
