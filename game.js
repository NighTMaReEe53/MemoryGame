/////////////////////////////////////////////////////////////////////////////////////
// Selector

let theGameContainer = document.querySelector(".game-block");

let theChildren = [...theGameContainer.children];

// getKey's

let theKeysLength = [...Array(theChildren.length).keys()];

let theTimer = document.querySelector(".count");

// Set Option

let theDuration = 1000;

let theInterval;

document.querySelector(".start").addEventListener("click", () => {
  let theMsg = prompt("What Is Your Name !?");
  if (theMsg === "" || theMsg === null) {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = theMsg;
  }
  document.querySelector(".lightbox").remove();
  document.body.style.overflow = "auto";
  document.getElementById("game").play();
  countDown(60);
});

shuffle(theKeysLength);

theChildren.forEach((child, indx) => {
  child.style.order = theKeysLength[indx];
  child.addEventListener("click", () => {
    isFliped(child);
  });
});

function isFliped(element) {
  element.classList.add("show");
  let Filter = theChildren.filter((item) => item.classList.contains("show"));
  if (Filter.length === 2) {
    stopClicked();
    handleClasses(Filter[0], Filter[1]);
  }
  let filterItem = theChildren.filter((child) =>
    child.classList.contains("isFliped")
  );
  if (filterItem.length === 20) {
    document.getElementById("cong").play();
    document.querySelector(".over").classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(theInterval);
  }
}

function stopClicked() {
  theGameContainer.classList.add("no-clicked");
  setTimeout(() => {
    theGameContainer.classList.remove("no-clicked");
  }, theDuration);
}

function handleClasses(elementOne, elementTwo) {
  let theTry = document.querySelector(".tries span");
  if (elementOne.dataset.languages === elementTwo.dataset.languages) {
    elementOne.classList.remove("show");
    elementTwo.classList.remove("show");
    document.getElementById("sucess").play();
    elementOne.classList.add("isFliped");
    elementTwo.classList.add("isFliped");
  } else {
    theTry.innerHTML = parseInt(theTry.innerHTML) + 1;
    document.getElementById("failed").play();
    setTimeout(() => {
      elementOne.classList.remove("show");
      elementTwo.classList.remove("show");
    }, theDuration);
  }
}

// Shuffle

function shuffle(array) {
  let current = array.length,
    temp,
    randomNumber;
  while (current > 0) {
    randomNumber = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[randomNumber];
    array[randomNumber] = temp;
  }
  return array;
}

function countDown(duration) {
  let minute, second;
  theInterval = setInterval(() => {
    minute = parseInt(duration / 60);
    second = parseInt(duration % 60);
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    theTimer.innerHTML = `${minute} : ${second}`;
    if (--duration < 0) {
      let theConfirm = confirm("You Are Lose Please Try Again");
      if (theConfirm) {
        window.location.reload();
      } else {
        theGameContainer.classList.add("no-clicked");
        theChildren.forEach((child) => {
          child.classList.add("isFliped");
        });
      }
      clearInterval(theInterval);
    }
  }, theDuration);
}
