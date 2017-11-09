var ServerSocket = require("../models/server_socket");
var ServerSocketStub = require("./stubs/server_socket_stub");
var ConsoleStub = require("./stubs/console_stub");
var assert = require("assert");
var sinon = require("sinon");
var should = require("should");

describe("The Chat Server", function () {
    describe("When a client connects", function () {
        var socket = new ServerSocketStub();
        var consoleStub = new ConsoleStub();
        var spyWrite = sinon.spy(socket, "write");
        var spyConsole = sinon.spy(consoleStub, "log");
        var serverSocket = null;

        before(function () {
            serverSocket = ServerSocket(socket, consoleStub);
        });
        it("should send a welcome message at connection", function () {
            spyWrite.calledOnce.should.be.true();
            spyWrite.args[0][0].should.endWith("Welcome!");
        });

        it("should log a connection message at connection", function () {
            spyConsole.calledOnce.should.be.true();
            spyConsole.args[0][0].should.endWith("Client Connected!");
        });
    });

    describe("When a client disconnects", function () {
        var socket = new ServerSocketStub();
        var consoleStub = new ConsoleStub();
        var spyConsole = sinon.spy(consoleStub, "log");
        var serverSocket = null;

        before(function () {
            serverSocket = ServerSocket(socket, consoleStub);
        });

        it("should log a disconnection message at disconnection", function () {
            serverSocket.processEndConnection();
            spyConsole.calledTwice.should.be.true();
            spyConsole.args[1][0].should.endWith("Client disconnected");

        });
    });

});