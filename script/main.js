 getConversionRates = () => {
  let labelVal = document.getElementById("result");
      labelVal.innerHTML = "Current rate is: ";
  let currAmt = parseFloat(document.getElementById("amount").value);
  let currFrSelect = document.getElementById("currencyFrom").value;

  let currToSelect = document.getElementById("currencyTo").value;

  let currPair = `${currFrSelect}_${currToSelect}`;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${currPair}&compact=ultra`;

  logResult= (data) => {
    let result = parseFloat(
      Math.round(data[currPair] * currAmt*100)/100
    ).toLocaleString();
    labelVal.innerHTML += result;
  }

  logError= (error) => console.log("Fetching the currency pair was a problem: \n", error);
  

  validateResponse = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  readResponseAsJSON = (response) =>  {return response.json();}
  

  fetchJSON= (x) => {
    fetch(x)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .catch(logError);
  }

  fetchJSON(url);
}



fetchOnload = () => {
  let currencies = "https://free.currencyconverterapi.com/api/v5/currencies?";

  fillSelect =(data)=> {
    let myObject = data.results;
    let select = document.getElementById("currencyFrom");
    let select2 = document.getElementById("currencyTo");
    for (let key in myObject) {
      select.options[select.options.length] = new Option(myObject[key].id, key);
      select2.options[select2.options.length] = new Option(myObject[key].id,key);
    }
  }

  logError=(error)=> console.log("Getting the list of currencies was a problem: \n", error);
  

  validateResponse=(response)=> {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  readResponseAsJSON=(response)=> {
    return response.json();
  }

  fetchJSON2=(x)=> {
    fetch(x)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(fillSelect)
      .catch(logError);
  }

  fetchJSON2(currencies);
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  

}


 

