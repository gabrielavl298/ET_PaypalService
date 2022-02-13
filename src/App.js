import "./App.css";
import React, {useState} from "react";
import ReactDOM from "react-dom";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function App() {
  const [price, setPrice] = useState("1")

  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          "amount": {
            "currency_code": "MXN",
            "value": "250",
            "breakdown": {
              "item_total": {  /* Required when including the `items` array */
                "currency_code": "MXN",
                "value": "250"
              }
            }
          },
          "items": [
            {
              "name": "Lentes", /* Shows within upper-right dropdown during payment approval */
              "description": "Lentes de sol para los gamers", /* Item details will also be in the completed paypal.com transaction view */
              "unit_amount": {
                "currency_code": "MXN",
                "value": "55"
              },
              "quantity": "2",
              "id": "sdlkfjasdlfgk"
            },
            {
              "name": "Condones", /* Shows within upper-right dropdown during payment approval */
              "description": "Condones para los gamers", /* Item details will also be in the completed paypal.com transaction view */
              "unit_amount": {
                "currency_code": "MXN",
                "value": "70"
              },
              "quantity": "2",
              "id": "cvhjhdkjfgh"
            },
          ]
        },
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
    let errObj = {
      err: err,
      status: "FAILED",
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  }
  return (
    <div className="App">
      <input type = "text" onChange={e => setPrice(e.target.value)} value = {price}/>
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