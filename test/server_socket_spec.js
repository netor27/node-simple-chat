var ServerSocket = require("../models/server_socket");
var ServerSocketStub = require("./stubs/server_socket_stub");
var ConsoleStub = require("./stubs/console_stub");
var assert = require("assert");
var sinon = require("sinon");
var should = require("should");
var ClientManager = require("../models/clients_manager");

describe("The Chat Server", function () {
    describe("When a client connects", function () {

        var socketStub, consoleStub, manager, spyWrite, spyConsole, serverSocket;
        before(function () {
            socketStub = new ServerSocketStub();
            consoleStub = new ConsoleStub();
            manager = new ClientManager();
            spyWrite = sinon.spy(socketStub, "write");
            spyConsole = sinon.spy(consoleStub, "log");
            serverSocket = ServerSocket(socketStub, consoleStub, manager);
        });
        it("should send a welcome message at connection", function () {
            spyWrite.calledOnce.should.be.true();
            spyWrite.args[0][0].should.endWith("Welcome!, please send your name..");
        });

        it("should log a connection message at connection", function () {
            spyConsole.calledOnce.should.be.true();
            spyConsole.args[0][0].should.endWith("Client Connected!");
        });
    });

    describe("When a client disconnects", function () {

        var socketStub, consoleStub, manager, spyConsole, serverSocket;
        before(function () {
            socketStub = new ServerSocketStub();
            consoleStub = new ConsoleStub();
            manager = new ClientManager();
            spyConsole = sinon.spy(consoleStub, "log");
            serverSocket = null;
            serverSocket = ServerSocket(socketStub, consoleStub, manager);
        });

        it("should log a disconnection message at disconnection", function () {
            serverSocket.processEndConnection();
            spyConsole.calledTwice.should.be.true();
            spyConsole.args[1][0].should.endWith("Client disconnected");

        });
    });

    describe("When an socket event occurs", function () {
        var dataParam, errorParam, socketStub, consoleStub, manager, spyConsole, serverSocket;

        before(function () {
            dataParam = "TestMessage";
            errorParam = "TestErrorMessage";
            socketStub = new ServerSocketStub();
            consoleStub = new ConsoleStub();
            manager = new ClientManager();
            spyConsole = sinon.spy(consoleStub, "log");
            serverSocket = ServerSocket(socketStub, consoleStub, manager);
        });

        it("should process the data event", function () {
            var spyProcessData = sinon.spy(serverSocket, "processData");
            socketStub.emit("data", dataParam);
            spyProcessData.calledOnce.should.be.true();
            spyProcessData.args[0, 0][0].should.be.equal(dataParam);
        });
        it("should process the end event", function () {
            var spyprocessEnd = sinon.spy(serverSocket, "processEndConnection");
            socketStub.emit("end");
            spyprocessEnd.calledOnce.should.be.true();
        });
        it("should process the error event", function () {
            spyProcessError = sinon.spy(serverSocket, "processError");
            socketStub.emit("error", errorParam);
            spyProcessError.calledOnce.should.be.true();
            spyProcessError.args[0, 0][0].should.be.equal(errorParam);
        });
    });
});