function scrollAppear() {
  var appearItem = document.querySelector('.first');
  var itemPosition = appearItem.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.5;

  var appearItem2 = document.querySelector('.second');
  var itemPosition2 = appearItem2.getBoundingClientRect().top;
  var screenPosition2 = window.innerHeight / 1.5;

  var appearItem3 = document.querySelector('.third');
  var itemPosition3 = appearItem3.getBoundingClientRect().top;
  var screenPosition3 = window.innerHeight / 1.5;
  
  var itemPosition4 = document.querySelector('footer').getBoundingClientRect().top;
  var screenPosition4 = window.innerHeight;

  if (itemPosition < screenPosition) {
    appearItem.classList.remove('disappear');
    appearItem.classList.add('appear');
  } else if (itemPosition > screenPosition) {
    appearItem.classList.remove('appear');
    appearItem.classList.add('disappear');
  }

  if (itemPosition2 < screenPosition2) {
    appearItem2.classList.remove('disappear');
    appearItem2.classList.add('appear');
  } else if (itemPosition2 > screenPosition2) {
    appearItem2.classList.remove('appear');
    appearItem2.classList.add('disappear');
  }

  if (itemPosition3 < screenPosition3) {
    appearItem3.classList.remove('disappear');
    appearItem3.classList.add('appear');
  } else if (itemPosition3 > screenPosition3) {
    appearItem3.classList.remove('appear');
    appearItem3.classList.add('disappear');
  }

  if (itemPosition4 < screenPosition4) {
    document.querySelector('#intern-cta').classList.add('disappear');
    document.querySelector('#intern-cta').classList.remove('appear');
  } else if (itemPosition4 > screenPosition4) {
    document.querySelector('#intern-cta').classList.add('appear');
    document.querySelector('#intern-cta').classList.remove('disappear');
  }
}

function toggle() {
  var menu = document.getElementById('navs');

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};

var ham = document.querySelector('.ham');

ham.addEventListener('click', toggle);
window.addEventListener('scroll', scrollAppear);