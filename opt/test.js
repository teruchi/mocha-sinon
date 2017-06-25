var sinon = require('sinon');
var assert = require('assert');
var jsdom = require('jsdom/lib/old-api.js');

var window = jsdom.jsdom().defaultView;
var $ = require('jquery')(window);

describe('Test User API', function () {
    it("get /api/users/100", function (done) {
        sinon.stub($, 'get').callsFake(function(url, success, dataType) {
            success({
                id: 100,
                name: 'teruchi'
            });
        });

        $.get(
            '/api/users/100',
            function (data) {
                assert.equal(100, data.id);
                assert.equal('teruchi', data.name);

                $.get.restore();
                done();
            },
            'json'
        );
    });

    it("ajax /api/users/100", function (done) {
        sinon.stub($, 'ajax').returns({
            done : function(callback) {
                callback({
                    id: 100,
                    name: 'teruchi'
                });
            }
        });

        $.ajax({
            method: 'GET',
            url: '/api/users/100',
            dataType: 'json'
        })
        .done(function(data) {
            assert.equal(100, data.id);
            assert.equal('teruchi', data.name);

            $.ajax.restore();
            done();
        });
    });
});
