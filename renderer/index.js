var url = "https://restcountries.eu/rest/v2/all"
var map
var countries = JSON.parse(localStorage.getItem('countries'))


if (countries) {
  getCountries(countries)
} else {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var countries = JSON.parse(xhttp.responseText)

      getCountries(countries)
      localStorage.setItem('countries', JSON.stringify(countries))
    }
  }

  xhttp.open('GET', url, true);
  xhttp.send();
}



function getCountries(countries){

  var ul = document.getElementById('countries')

  for (var i = 0; i < countries.length; i++) {

    if (countries[i].name === "Israel")
      continue

    var li = document.createElement("LI")
    var img = document.createElement("IMG")
    var a = document.createElement("A")
    var textNode = document.createTextNode(countries[i].name)

    img.setAttribute("src", countries[i].flag)
    ul.appendChild(li)
    li.appendChild(a)
    a.appendChild(img)
    a.appendChild(textNode);
    a.setAttribute("title", countries[i].name)


    a.addEventListener("click", (country => function(e) { CountryClicked(e, country) })(countries[i]), false)

  }
}

function CountryClicked(e, country) {

  // Add class: selected to the clicked <a> tag
  selectedItem = document.getElementsByClassName('selected')[0]
  if (selectedItem)
    selectedItem.classList.remove('selected')
  e.target.classList.add('selected')

  // Pass the values of the chosen country to the appropraite tags
  var flag = document.getElementById("flag-container")
  var name = document.getElementById("name-container")
  var capital = document.getElementById("capital")
  var population = document.getElementById("population")
  var area = document.getElementById("area")
  var region = document.getElementById("region")
  var subregion = document.getElementById("subregion")
  var languages = document.getElementById("languages")
  var regionalBlocs = document.getElementById("regional-blocs")
  var currencies = document.getElementById("currencies")


  flag.setAttribute("src", country.flag)
  name.innerText = `${country.name} - ${country.alpha2Code}`

  capital.innerText = `${country.capital}`
  population.innerText = `${country.population.toLocaleString()}`
  area.innerText = `${country.area.toLocaleString()}`
  region.innerText = `${country.region}`
  subregion.innerText = `${country.subregion}`
  currencies.innerText = ``
  languages.innerText = ``
  regionalBlocs.innerText = ``

  for (var i = 0; i < country.currencies.length; i++) {
    currency = country.currencies[i]
    div = document.createElement('div')
    div.innerText = `${currency.name} (${currency.code}/${currency.symbol})`
    div.style.margin = `0 5%`
    currencies.appendChild(div)
  }

  for (var i = 0; i < country.languages.length; i++) {
    language = country.languages[i]
    div = document.createElement('div')
    div.innerText = `${language.name} (${language.nativeName})`
    div.style.margin = `0 5%`
    languages.appendChild(div)
  }

  for (var i = 0; i < country.regionalBlocs.length; i++) {
    regionalBloc = country.regionalBlocs[i]
    div = document.createElement('div')
    div.innerText = `${regionalBloc.name} (${regionalBloc.acronym})`
    div.style.margin = `0 5%`
    regionalBlocs.appendChild(div)
  }


  map.setCenter(new google.maps.LatLng(country.latlng[0], country.latlng[1]))


}


initMap = () => {
  var mapProperties = {
    zoom: 4.5
  }

  map = new google.maps.Map(document.getElementById("googleMaps"), mapProperties)
}
