document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.querySelector('input[type="checkbox"]');
    if(JSON.parse(localStorage.getItem('darkmode')).darkMode) {
    checkbox.checked = true;
    dark();
  }
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      dark();
      console.log('Dark mode on');
    } else {
      light();
      console.log('Dark mode off');
    }
  });
  thankYou();

  document.getElementById('search-loc').addEventListener('keypress', e => {
    if(e.key === 'Enter'){
      e.preventDefault();
      search();
    }
  });

  var modal = document.getElementById("popup");
  var openLogin = document.getElementById("openLogin");
  var span = document.getElementsByClassName("close")[0];
  var registerBtn = document.getElementsByClassName("registerBtn");
  var loginBtn = document.getElementById("loginBtn");
  var login = document.getElementById("login");
  var register = document.getElementById("register");
  var carInd = document.getElementsByClassName("carousel-indicators")[0];
  openLogin.onclick = async function() {
    c = await getCookie();
    if (c) {
      window.open(`private_${c}`, '_self');
    } else {
      modal.style.display = "block";
      carInd.style.visibility = "hidden";
    }
  }
  span.onclick = function() {
      modal.style.display = "none";
      carInd.style.visibility = "visible";
  }
  registerBtn[0].onclick = function () {
    login.style.display = "none";
    register.style.display = "inline-block";
  }
  registerBtn[1].onclick = function () {
    login.style.display = "none";
    register.style.display = "inline-block";
    modal.style.display = "block";
    carInd.style.visibility = "hidden";
  }
  loginBtn.onclick = function () {
    login.style.display = "inline-block";
    register.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      carInd.style.visibility = "visible";
    }
    document.getElementById('error').style.display = 'none';
  }

  getError();

});

function light () {
  var navbar = document.querySelector(".navbar");
  navbar.classList.add("navbar-light");
  navbar.classList.remove("navbar-dark");
  navbar.classList.remove("bg-dark");
  document.body.classList.remove("dark-mode");
  var plh = document.querySelectorAll(".placeholder");
  plh.forEach(element => element.style.color = "#E2E5F1");
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
  darkModeActivation = {
    darkMode: true,
    date: new Date().getTime(),
  };
  localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation));
}

function thankYou () {
  document.getElementById('sub-button').addEventListener('click', function () {
    document.getElementById('content').style.display = 'none';
    document.getElementById('rth').style.display = 'inline-block';
    document.getElementsByTagName('h1')[0].innerText = 'Grazie per il tuo contributo!';
    
  });  
};

function search () {
  var loc = document.getElementById('search-loc');
  console.log(loc.value);
  window.open(`search_${loc.value}`, '_self')

}

async function getError() {
    var errorBanner = document.getElementById('error');
    var response = await fetch('http://127.0.0.1:3000/get_errors');
    var jsonObj = await response.json();
    if (jsonObj.errorOccured) {
      errorBanner.style.display = 'inline-block';
      errorBanner.innerText = jsonObj.errorMessage;
    }
  };

  async function getCookie() {
    var response = await fetch('http://127.0.0.1:3000/cookies');
    jsonObj = await response.json();
    console.log(await jsonObj);
      return await jsonObj;
  }
