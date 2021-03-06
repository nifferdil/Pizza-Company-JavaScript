var smallPrice;
var mediumPrice;
var largePrice;
var extraToppingsPrice;

function Pizza(toppings, pizzaName, size) {
  this.toppings = toppings;
  this.pizzaName = pizzaName;
  this.size = size;
}

Pizza.prototype.thankYou = function() {
  return "Thank you for ordering with us!";
}

var appendPizza = function(pizza) {
  var text = "<li class='col-md-4'><div><center><h3>" + pizza.pizzaName + ": " + "</h3>";
  text += "<p>" + pizza.toppings + "</p>";
  text += "<button class='size btn btn-danger' value='" + "' data-toggle='modal' data-target='#frontModal'>" + "Choose Your Size" + "</button>";
  text += "</center></div></li>";
  $("ul#pizzaChoices").append(text);
};

var setPizzaPrices = function() {
  smallPrice = 11;
  mediumPrice = 15;
  largePrice = 18;
  extraToppingsPrice = 1;
};

var getTotal = function(quantity, price){
  return quantity * price;
};

var totalPrice = function(resultOne, resultTwo, resultThree, resultFour) {
  return resultOne + resultTwo + resultThree + resultFour;
};

$(document).ready(function() {
  var smallResult = 0;
  var mediumResult = 0;
  var largeResult = 0;
  var toppingsResult = 0;
  var totalPurchase = 0;
  $("#purchased").hide();

  var classic = new Pizza (["tomatoes", " onions"], "Classic", ["small", "medium", "large"]);
  var meat = new Pizza (["sausage", " mushrooms", " olives"], "Meat Lovers", ["small", "medium", "large"]);
  var veggie = new Pizza (["olives", " peppers", " onions", " mushrooms"], "Veggie", ["small", "medium", "large"]);
  var chickenPesto = new Pizza (["chicken", " pesto"], "Chicken Pesto", ["small", "medium", "large"]);
  var bbqChicken = new Pizza (["chicken", " red onions", " cilantro"], "BBQ Chicken", ["small", "medium", "large"]);
  var supreme = new Pizza (["pepperoni", " sausage", " olives", " peppers"], "Supreme",  ["small", "medium", "large"]);

  var pizzaChoices = [];
  pizzaChoices.push(classic);
  pizzaChoices.push(meat);
  pizzaChoices.push(veggie);
  pizzaChoices.push(chickenPesto);
  pizzaChoices.push(bbqChicken);
  pizzaChoices.push(supreme);

  for (var i in pizzaChoices){
    appendPizza(pizzaChoices[i]);
  }

  $('#toppings').change(function() {
    //$('.topping_price').empty();
    var sum = 0,
    price;
    $(this).find('option:selected').each(function() {
      if ($(this).attr('data-price')) {
        price = $(this).data('price');
        sum += price;

        toppingsResult = getTotal(sum, extraToppingsPrice);
        $(".topping_price").text("$ " + sum + ".00");
        totalPurchase = totalPrice(smallResult, mediumResult, largeResult, toppingsResult);
        $(".total_price").text(totalPurchase);
      }
    });
  });

  $(".size").click(function(){
    var sizeChoice = parseInt($(this).val());
    setPizzaPrices(sizeChoice);

    $(".small").text(smallPrice);
    $(".medium").text(mediumPrice);
    $(".large").text(largePrice);
    $(".topping").text(extraToppingsPrice);
  });

  $( ".small_pizza" ).keyup(function() {
    var numOfPizzas = ($("input.small_pizza").val());
    smallResult = getTotal(numOfPizzas, smallPrice);
    var smallResultText = "$ " + smallResult + ".00";

    $(".small_price").text(smallResultText);
    totalPurchase = totalPrice(smallResult, mediumResult, largeResult, toppingsResult);
    $(".total_price").text(totalPurchase);
  });

  $( ".medium_pizza" ).keyup(function() {
    var numOfPizzas = parseInt($("input.medium_pizza").val());
    mediumResult = getTotal(numOfPizzas, mediumPrice);
    var mediumResultText = "$ " + mediumResult + ".00";

    $(".medium_price").text(mediumResultText);
    totalPurchase = totalPrice(smallResult, mediumResult, largeResult, toppingsResult);
    $(".total_price").text(totalPurchase);
  });

  $( ".large_pizza" ).keyup(function() {
    var numOfPizzas = parseInt($("input.large_pizza").val());
    largeResult = getTotal(numOfPizzas, largePrice);
    var largeResultText = "$ " + largeResult + ".00";

    $(".large_price").text(largeResultText);
    totalPurchase = totalPrice(smallResult, mediumResult, largeResult, toppingsResult);
    $(".total_price").text(totalPurchase);
  });

  $("#purchase").click(function(){
    $("#buyPizza").hide();
    $("#purchased").show();
    $(".totalPurchase").text(totalPurchase);
  });

  $("#clear").click(function() {
    $(".small_price").empty();
    $(".medium_price").empty();
    $(".large_price").empty();
    $(".topping_price").empty();
    $(".totalPurchase").empty();
    $("#buyPizza").show();
    $("#purchased").hide();
    $("input.small_pizza").val("");
    $("input.medium_pizza").val("");
    $("input.large_pizza").val("");
    $("#toppings").val("");
    smallResult = 0;
    mediumResult = 0;
    largeResult = 0;
    toppingsResult = 0;
  });

  var thankYouMessage = new Pizza("cheese", "classic", "large");
  thankYouMessage = thankYouMessage.thankYou();
  $("#thanks").text(thankYouMessage);

}); // end of document
