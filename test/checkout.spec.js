'use strict';

const Rx = require('rx')
const should = require('should')


const prices = {
    'A': 50,
    'B': 30
}

const discounts = {
  'A': {count: 3, discount: -30}
}

const scannedItems = {};

const scannerMother = () => {
    var thescanner = new Rx.Subject();

    const pricer$ = thescanner.scan((t, x) => t + prices[x], 0);

    const discounter$ = thescanner.scan((si, x) => si[x] = (si[x] || 0) + 1, {})
                                  .map(si => {
                                    for(var i in si) {
                                      return discounts[i].count >= si[i] ? discounts[i].discount : 0;
                                    };
                                  });

    return {
        scan: x => {
            thescanner.onNext(x);
        },
        total$: Rx.Observable.merge(pricer$, discounter$),
        checkout: () => { thescanner.onCompleted(); }
    }
}

describe("the supermarket checkout", function() {
    let till;
    beforeEach(function() {
        till = scannerMother();
    })

    it("can scan one a", function(done) {
        till.total$
            .subscribe(x => {
                x.should.eql(50)
                done();
            });

        till.scan('A');
        till.checkout();
    });

    it("can scan two a", function(done) {
        let xs = [];
        till.total$
            .subscribe(
                total => {
                    xs.push(total)
                },
                () => {},
                () => {
                    xs.should.eql([50, 100])
                    done();
                });

        till.scan('A');
        till.scan('A');
        till.checkout();
    });

    it("can scan one B", function(done) {

        let xs = [];
        till.total$
            .subscribe(
                total => {
                    xs.push(total)
                },
                () => {},
                () => {
                    xs.should.eql([30])
                    done();
                });

        till.scan('B');
        till.checkout();
    });

    it("can scan two Bs", function(done) {
        let xs = [];
        till.total$
            .subscribe(
                total => {
                    xs.push(total)
                },
                () => {},
                () => {
                    xs.should.eql([30, 60])
                    done();
                });

        till.scan('B');
        till.scan('B');
        till.checkout();
    })

    it('can sell 3 As for 120', function() {
        let xs = [];
        till.total$
            .subscribe(
                total => {
                    xs.push(total)
                },
                () => {},
                () => {
                    xs.should.eql([50, 100, 120])
                    done();
                });

        till.scan('A');
        till.scan('A');
        till.scan('A');
        till.checkout();
    })
});
