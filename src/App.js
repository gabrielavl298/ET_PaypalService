import "./App.css";
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function App() {
  const [order, setOrder] = useState({})

  /* 
      {
          "amount": {
            "currency_code": "MXN",
            "value": "250",
            "breakdown": {
              "item_total": {  //Required when including the `items` array 
              "currency_code": "MXN",
              "value": "250"
            }
          }
        },
        "items": [
          {
            "name": "Lentes", // Shows within upper-right dropdown during payment approval 
            "description": "Lentes de sol para los gamers", // Item details will also be in the completed paypal.com transaction view 
            "unit_amount": {
              "currency_code": "MXN",
              "value": "55"
            },
            "quantity": "2",
            "id": "sdlkfjasdlfgk"
          },
          {
            "name": "Condones", // Shows within upper-right dropdown during payment approval 
            "description": "Condones para los gamers", // Item details will also be in the completed paypal.com transaction view 
            "unit_amount": {
              "currency_code": "MXN",
              "value": "70"
            },
            "quantity": "2",
            "id": "cvhjhdkjfgh"
          },
        ]
      },
  */

      useEffect(() => {

        return () => {
          
        }
      }, [])

  function _createOrder(data, actions) {

    let orderData = document.getElementById('items').value;
    orderData = JSON.parse(orderData);

    return actions.order.create({
      purchase_units: [
        orderData
      ],
    });
  }
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log("order", order);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
  }
  function _onError(err) {
    console.log("err", err);
    console.log("order failed", order);
    let errObj = {
      err: err,
      status: "FAILED",
      order: order
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  }
  return (
    <div className="App">
      <div id="items" value=""></div>
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
        onApprove={(data, actions) => _onApprove(data, actions)}
        onCancel={() => _onError("CANCELED")}
        onError={(err) => _onError("ERROR")}
        
      />
    </div>
  );
}
export default App;