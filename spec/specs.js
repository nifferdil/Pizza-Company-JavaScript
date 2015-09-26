describe('Pizza', function() {
  it("creates a new pizza with name, size and toppings", function() {
    var testPizza = new Pizza("cheese", "classic", "large");
    expect(testPizza.toppings).to.equal("cheese");
    expect(testPizza.pizzaName).to.equal("classic");
    expect(testPizza.size).to.equal("large");
  });
});

describe('thankYou', function() {
  it("creates a customer message for a new pizza order", function() {
    var testPizza = new Pizza("cheese", "classic", "large");
    testPizza = testPizza.thankYou();
    expect(testPizza).to.equal("Thank you for ordering with us!");
  });
});
