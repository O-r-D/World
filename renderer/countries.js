var url = "https://restcountries.eu/rest/v2/all"



var countries = JSON.parse(localStorage.getItem('countries'))
if (countries) {
  module.exports = countries
} else {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      countries = JSON.parse(xhttp.responseText)
      localStorage.setItem('countries', JSON.stringify(countries))
      module.exports = countries
    }
  }

  xhttp.open('GET', url, true);
  xhttp.send();
}
