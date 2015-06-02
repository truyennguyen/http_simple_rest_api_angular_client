"use strict";

var expect = require("chai").expect;
var hello = require("../../app/js/hello");

describe("hello module", function() {
	it("should return hello message", function() {
		expect(hello()).to.eql("welcome to the book store!");
	});
});