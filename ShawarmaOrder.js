const Order = require('./Order');

const OrderState = Object.freeze({
  WELCOMING: Symbol('welcoming'),
  ITEM: Symbol('items'),
  SIZE: Symbol('size'),
  TOPPINGS: Symbol('toppings'),
  REORDER: Symbol('reorder'),
  ICECREAM: Symbol('icecream'),
});

module.exports = class ShwarmaOrder extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSize = null;
    this.item1Size = null;
    this.item2Size = null;
    this.item1topping = null;
    this.item2topping = null;
    this.item3Size = null;
    this.sIcecream = null;

    this.sitem1 = null;
    this.sitem2 = null;
    this.sitem3 = null;

    this.SmallPrice = 5;
    this.MediumPrice = 10;
    this.LargePrice = 20;
    this.toppingPrice = 5;
    this.IcecreamPrice = 7;
    this.amount = 0;
    this.itemname;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.ITEM;
        aReturn.push('Welcome to Oshan Fast Food Service.');
        aReturn.push('List of Item to Order\n 1. Noddles\n 2. Kababs\n (Type 1/2)');
        break;

      case OrderState.ITEM:
        this.stateCur = OrderState.SIZE;

        if (sInput == `1`) {
          this.itemname = 'Noddles';
        } else if (sInput == `2`) {
          this.itemname = 'Kababs';
        } else {
          aReturn.push(
            'Please select valid options\n List of Item to Order\n 1. Noddles\n 2. Kababs\n (Type 1/2)'
          );
          this.stateCur = OrderState.ITEM;
          break;
        }
        if (this.sitem1 == null) {
          this.sitem1 = this.itemname;
        } else if (this.sitem2 == null) {
          this.sitem2 = this.itemname;
        }
        aReturn.push('What size would you like?\n1. Small \n 2. Medium\n 3. Large\n (Type 1/2/3)');
        break;

      case OrderState.SIZE:
        if (sInput == `1`) {
          this.sSize = 'Small';
          this.amount += this.SmallPrice;
        } else if (sInput == `2`) {
          this.sSize = 'Medium';
          this.amount += this.MediumPrice;
        } else if (sInput == `3`) {
          this.sSize = 'Large';
          this.amount += this.LargePrice;
        } else {
          aReturn.push(
            'Please select valid options\n What size would you like?\n1. Small \n 2. Medium\n 3. Large\n (Type 1/2/3)'
          );
          this.stateCur = OrderState.SIZE;
          break;
        }

        if (this.item1Size == null) {
          this.item1Size = this.sSize;
        } else if (this.item2Size == null) {
          this.item2Size = this.sSize;
        } else if (this.item3Size == null) {
          this.item3Size = this.sSize;
        }
        this.stateCur = OrderState.TOPPINGS;
        // this.sSize = sInput;
        aReturn.push('What toppings would you like to add?\n1. Onion\n 2. Carrot\n (Type 1/2)');
        this.amount += this.toppingPrice;
        break;

      case OrderState.TOPPINGS:
        this.stateCur = OrderState.REORDER;
        if (sInput == `1`) {
          if (this.item1topping == null) {
            this.item1topping = 'Onions';
          } else if (this.item2topping == null) {
            this.item2topping = 'Onions';
          }
        } else if (sInput == `2`) {
          if (this.item1topping == null) {
            this.item1topping = 'Carrot';
          } else if (this.item2topping == null) {
            this.item2topping = 'Carrot';
          }
        } else {
          aReturn.push(
            'Please select valid options\n What toppings would you like to add?\n1. Onion\n 2. Carrot\n (Type 1/2)'
          );
          this.stateCur = OrderState.TOPPINGS;
          break;
        }

        aReturn.push('Would you like Add another item\n?(Type: Yes/No)');
        break;

      case OrderState.REORDER:
        if (sInput.toLowerCase() == 'yes') {
          if (this.item2 == null) {
            this.stateCur = OrderState.ITEM;
            aReturn.push('List of Item to Order');
            aReturn.push('1. Noddles\n 2. Kababs\n (Type 1/2)');
          } else {
            this.stateCur = OrderState.ICECREAM;
            aReturn.push(
              'What flavor icecream you would like to have?\n1. Vanilla\n 2. ButterScotch\n (Type 1/2)'
            );
          }
        } else if (sInput.toLowerCase() == 'no') {
          aReturn.push(
            'What flavor icecream you would like to have?\n1. Vanilla\n 2. ButterScotch\n (Type 1/2)'
          );
          this.stateCur = OrderState.ICECREAM;
        } else {
          aReturn.push(
            'Please select valid options\n Would you like Add another item\n?(Type: Yes/No)'
          );
          this.stateCur = OrderState.REORDER;
          break;
        }
        break;
      case OrderState.ICECREAM:
        this.stateCur = OrderState.PAYMENT;
        this.nOrder = 15;
        if (sInput == `1`) {
          this.sIcecream = 'Vanilla';
          this.amount += this.IcecreamPrice;
        } else if (sInput == `2`) {
          this.sIcecream = 'ButterScotch';
          this.amount += this.IcecreamPrice;
        } else {
          aReturn.push(
            'Please select valid options\n What flavor icecream you would like to have?\n1. Vanilla\n 2. ButterScotch\n (Type 1/2)'
          );
          this.stateCur = OrderState.ICECREAM;
          break;
        }
        aReturn.push('Thank-you for your order of');
        if (this.sitem2 != null) {
          aReturn.push(
            `${this.item1Size} ${this.sitem1} with ${this.item1topping}\n${this.item2Size} ${this.sitem2} with ${this.item2topping}`
          );
        } else {
          aReturn.push(`${this.item1Size} ${this.sitem1} with ${this.item1topping}`);
        }

        if (this.sIcecream) {
          aReturn.push(`Icecream flavour: ${this.sIcecream}`);
          aReturn.push(`Total Bill: $${this.amount}`);
        }
        aReturn.push(`Please pay for your order here`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        break;
      case OrderState.PAYMENT:
        console.log(sInput);
        this.isDone(true);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(
          `Your order will be delivered at ${d.toTimeString()} at ${
            sInput.purchase_units[0].shipping.address.address_line_1
          }, ${sInput.purchase_units[0].shipping.address.admin_area_2}, ${
            sInput.purchase_units[0].shipping.address.admin_area_1
          }, ${sInput.purchase_units[0].shipping.address.postal_code}, ${
            sInput.purchase_units[0].shipping.address.country_code
          } `
        );
        break;
    }
    return aReturn;
  }
  renderForm(sTitle = '-1', sAmount = '-1') {
    // your client id should be kept private
    if (sTitle != '-1') {
      this.sItem = sTitle;
    }
    if (sAmount != '-1') {
      this.nOrder = sAmount;
    }
    const sClientID =
      process.env.SB_CLIENT_ID ||
      'put your client id here for testing ... Make sure that you delete it before committing';
    return `
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your order of $${this.amount}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.amount}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `;
  }
};
