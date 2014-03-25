var formatter = require('../.');
describe('Text formatter', function () {

  var mockRequest;
  var mockResponse = {
    setHeader: function () {}
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
      var header;
      var value;
      var response = {
        setHeader: function (_header, _value) {
          header = _header;
          value = _value;
        }
      };
      formatter(mockRequest, response, body);
      expect(header).to.be.eql('Content-Length');
      expect(value).to.be.eql(0);
    });

    it('of a JSON body', function () {
      var body = {
        test: 1
      };
      var header;
      var value;
      var response = {
        setHeader: function (_header, _value) {
          header = _header;
          value = _value;
        }
      };
      formatter(mockRequest, response, body);
      expect(header).to.be.eql('Content-Length');
      expect(value).to.be.eql(10);
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