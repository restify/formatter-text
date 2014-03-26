var formatter = require('../.');
describe('Text formatter', function () {

  var mockRequest;
  var mockResponse = {
    setHeader: function () {}
  };

  var mockResponseWithFunction = function(obj) {
    return {
      setHeader: function (key, value) {
        obj.key = key;
        obj.value = value;
      }
    };
  };

  it('serializes a JSON object type of body', function (){
    var body = {};
    expect(formatter(mockRequest, mockResponse, body)).to.be.eql('{}');
  });

  it('does not modify text type of body', function (){
    var body = 'test';
    expect(formatter(mockRequest, mockResponse, body)).to.be.eql('test');
  });

  describe('sets the content-length header', function() {
    it('to zero', function () {
      var body = '';
      var header = {};
      var response = mockResponseWithFunction(header);
      formatter(mockRequest, response, body);
      expect(header.key).to.be.eql('Content-Length');
      expect(header.value).to.be.eql(0);
    });

    it('of a JSON body', function () {
      var body = {
        test: 1
      };
      var header = {};
      var response = mockResponseWithFunction(header);
      formatter(mockRequest, response, body);
      expect(header.key).to.be.eql('Content-Length');
      expect(header.value).to.be.eql(10);
    });
  });

  describe('encounters an error', function(){

    it('in the body', function (){
      var body = new Error('error');
      expect(formatter(mockRequest, mockResponse, body)).to.be.eql('error');
    });

    it('sets the header to 500', function (){
      var body = new Error('error');
      var res = {
        setHeader: function() {},
        statusCode: 200
      }
      formatter(mockRequest, res, body);
      expect(res.statusCode).to.be.eql(500);
    });
  });



});