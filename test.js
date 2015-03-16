'use strict';

var test = require('tape');
var hook = require('./');

test('stdio', function (t) {
	t.plan(1);

	var unhook = hook.stdout(function (out) {
		unhook();
		t.equals(out, 'test\n');
	});

	console.log('test');
});

test('stdio unhook', function (t) {
	t.plan(1);

	var unhook = hook.stdout(function (out) {
		unhook();
		t.equals(out, 'test2\n');
	});

	var unhook2 = hook.stdout(function () {
		t.fail();
	});
	unhook2();

	console.log('test2');
});

test('sterr', function (t) {
	t.plan(1);

	var unhook = hook.stderr(function (out) {
		unhook();
		t.equals(out, 'test\n');
	});

	console.error('test');
});

test('sterr unhook', function (t) {
	t.plan(1);

	var unhook = hook.stderr(function (out) {
		unhook();
		t.equals(out, 'test2\n');
	});

	var unhook2 = hook.stderr(function () {
		t.fail();
	});
	unhook2();

	console.error('test2');
});
