'use strict';

const errHand = require('../../lib/error-handler');
require('jest');

describe('error-handler', function() {
  this.validation = new Error('Validation error: Cannot create note, title or content missing');
  this.res = {status: function(stat){this.statusCode = stat; return this; }, send: function(msg){this.message  = msg; return this;}};

  this.enoent = new Error('enoent');
  this.pathError = new Error('path error');
  this.fail = new Error('fail');
  it('should respond with a status of 400', () => {
    let errRes = errHand(this.validation, this.res);
    expect(errRes.statusCode).toEqual(400);
  });
  it('should respond with a status of 404', () => {
    let errRes = errHand(this.enoent, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 404', () => {
    let errRes = errHand(this.pathError, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 500', () => {
    let errRes = errHand(this.fail, this.res);
    expect(errRes.statusCode).toEqual(500);
  });
});