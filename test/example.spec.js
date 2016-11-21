const should = require('should');
const Rx = require('rx');

describe('writing a mocha test', function() {
  describe('uses "describe" to group tests', function() {
    it('and uses "it" to definte tests');
    it('and an "it" with no function provided is pending');
  });

  describe('and adding actual tests', function() {
    it('is as easy as adding a function', function() {
      ({number: 1}).should.eql({number: 1});
    })
  });

  describe('can be used for testing rxjs', function() {
    it('for example when subscribing to something', function(done) {
      const stream$ = new Rx.Subject();

      stream$.subscribe(next => {
        next.floppity.should.equal('poppity');
        done();
      });

      stream$.onNext({floppity: 'poppity'});
    });
  });
});