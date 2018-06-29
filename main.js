

//document.getElementById("result").innerHTML += 306.00
function getConversionRates() {
   
  let labelVal = document.getElementById("result").innerHTML;
 
  let currFrSelect = document.getElementById("currencyFrom").value;
  
  let currToSelect = document.getElementById("currencyTo").value;
 
  let currPair = currFrSelect + "_" + currToSelect;
  
  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
 
  fetch(url + currPair).then(calculateRate(data))
    
  function calculateRate(data){
   // alert(data)  ;
    try {
       let currFrAmt = parseFloat(document.getElementById("amount").value);
       labelVal +=(numeral(currFrAmt * data[currPair].val).format("0,0.00[0]"));

     } catch (e) {
      alert("There is an error somewhere.");
    }
  };

}


