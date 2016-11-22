# An RxJS Kata

The checkout kata using RxJS.

# Checkout Kata

Implement the code for a supermarket checkout that calculates the total price of a number of items.

The code will be used by an electronic till that 
 * can only scan one item at a time. 
 * sends a total to display as the items are scanned
 * can mark a basket as sold (any new items scanned are in a new basket)

Goods are priced individually, however there are weekly special offers for when multiple items are bought. For example "A is 50 each" or "3 for 130".

Weekly offers change frequently. The initial prices and offers are as follows:

| SKU         |   Item Price        |   Special Offers |
| ----------- | ------------------- | ---------------- |
| A           |   50                |   3 for 120      |
| B           |   30                |   2 for 45       |
| C           |   60                |                  |
| D           |   99                | 

# Running the tests

Mocha is configured to look for tests in a `test` folder and its subfolders in any file whose name ends ".spec.js".

Run either `mocha` or `npm test`.

If you want mocha to watch for file changes you can run `mocha -w` or `npm test -- - w`

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. 