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

        before(function () { 
            ServerSocket(socket, consoleStub);    
        });
        it("should send a welcome message", function(){
            spyWrite.calledOnce.should.be.true();
            spyWrite.args[0][0].should.endWith("Welcome!");
        });

        it("should log a connection message", function(){
            spyConsole.calledOnce.should.be.true();
            spyConsole.args[0][0].should.endWith("Client Connected!");
        });
    });

     describe("When a client disconnects", function () {
         it("should log a disconnection message");
     });

});