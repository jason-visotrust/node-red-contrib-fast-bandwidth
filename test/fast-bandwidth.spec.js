const { describe, it } = require('mocha')
const helper = require("node-red-node-test-helper");
const fastNode = require("../src/fast-bandwidth.js");

describe('fast-bandwidth Node', function () {

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: "n1", type: "fast-bandwidth", name: "test name" }];
        helper.load(fastNode, flow, function () {
            var n1 = helper.getNode("n1");
            n1.should.have.property('name', 'test name');
            done();
        });
    });

    it('should get bandwidth measurement in payload', function (done) {
        var flow = [{ id: "n1", type: "fast-bandwidth", name: "test name", measureUpload: false, wires:[["n2"]] },
            { id: "n2", type: "helper" }];
        helper.load(fastNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");
            n2.on("input", function (msg) {
                msg.should.have.property('payload');
                console.log(msg);
                done();
            });
            n1.receive({ payload: "Ping" });
        });
    });
});
