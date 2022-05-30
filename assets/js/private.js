document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.querySelector('input[type="checkbox"]');
    if(JSON.parse(localStorage.getItem('darkmode')).darkMode) {
    checkbox.checked = true;
    dark();
  }
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      dark();
    } else {
      light();
    }
  });

  document.getElementById('search-loc').addEventListener('keypress', e => {
    if(e.key === 'Enter'){
      e.preventDefault();
      search();
    }
  });

});

function light () {
  var navbar = document.querySelector(".navbar");
  navbar.classList.add("navbar-light");
  navbar.classList.remove("navbar-dark");
  navbar.classList.remove("bg-dark");
  document.body.classList.remove("dark-mode");
  var plh = document.querySelectorAll(".placeholder");
  plh.forEach(element => element.style.color = "#E2E5F1");
  document.getElementsByClassName('table')[0].classList.remove('table-dark')
  darkModeActivation = {
    darkMode: false,
    date: new Date().getTime(),
  };
  localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation));
}

function dark () {
  document.querySelector('input[type="checkbox"]').checked = true;
  document.body.classList.add("dark-mode");
  var navbar = document.querySelector(".navbar");
  navbar.classList.remove("navbar-light");
  navbar.classList.add("navbar-dark");
  navbar.classList.add("bg-dark");
  var plh = document.querySelectorAll(".placeholder");
  plh.forEach(element => element.style.color = "#222529");
  document.getElementsByClassName('table')[0].classList.add('table-dark')
  darkModeActivation = {
    darkMode: true,
    date: new Date().getTime(),
  };
  localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation));
}

function search () {
  var loc = document.getElementById('search-loc');
  console.log(loc.value);
  window.open(`search_${loc.value}`, '_self')

}