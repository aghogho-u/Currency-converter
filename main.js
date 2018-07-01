function getConversionRates() {
  let labelVal = document.getElementById("result");
  labelVal.innerHTML = "Current rate is: ";
  let currAmt = parseFloat(document.getElementById("amount").value);
  let currFrSelect = document.getElementById("currencyFrom").value;

  let currToSelect = document.getElementById("currencyTo").value;

  let currPair = `${currFrSelect}_${currToSelect}`;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${currPair}&compact=ultra`;

  function logResult(data) {
    let result = parseFloat(
      Math.round(data[currPair] * currAmt)
    ).toLocaleString();
    console.log(data); 
    labelVal.innerHTML += result;
  }

  function logError(error) {
    console.log("Fetching the currency pair was a problem: \n", error);
  }

  function validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  function readResponseAsJSON(response) {
    return response.json();
  }

  function fetchJSON(x) {
    fetch(x)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .catch(logError);
  }

  fetchJSON(url);
}



function testOnload() {
  let currencies = "https://free.currencyconverterapi.com/api/v5/currencies?";

  function fillSelect(data) {
    let myObject = data.results;
    // myArr = [];
    let select = document.getElementById("currencyFrom");
    let select2 = document.getElementById("currencyTo");
    for (let key in myObject) {
      // myArr.push(myObject[key].id);
      //}
      //console.log(myArr);
      //       for(index of myobject) {
      select.options[select.options.length] = new Option(myObject[key].id, key);
      select2.options[select2.options.length] = new Option(
        myObject[key].id,
        key
      );
    }
  }

  function logError(error) {
    console.log("Getting the list of currencies was a problem: \n", error);
  }

  function validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  function readResponseAsJSON(response) {
    return response.json();
  }

  function fetchJSON2(x) {
    fetch(x)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(fillSelect)
      .catch(logError);
  }

  fetchJSON2(currencies);
}
