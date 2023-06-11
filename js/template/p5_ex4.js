var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var lastAudio = 0;
var slider = document.getElementById("myRange");
var levels = ` 
<img data-time="15" class="imgle" src="./assets/images/Ui Assets/level_1.png" alt="">
<img data-time="10" class="imgle" src="./assets/images/Ui Assets/level_2.png" alt="">
<img data-time="8" class="imgle" src="./assets/images/Ui Assets/level_3.png" alt="">
`;
var relBtn = ` <img
src="assets/images/reload.png"
class="img-responsive overlay-relBtn"
/>`;
var home = ` <img
src="assets/images/home.png"
class="img-responsive overlay-homeBtn"
/>`;

const player = document.querySelector(".question .start");
let count;
const controlArrows = [...$(".controls.d-grid").children()];

var totalItems = $(".pageContainer .item").length;
var currentIndex = $("div.active").index() + 1;
let move;
let index;
let rightAnswer;
let numOfDivs = $(".finish").children().length;
let widthOfDivs = Math.ceil($(".finish").width());
let divWidth = widthOfDivs / numOfDivs;

let divTop =
  document.querySelector(".finish").getBoundingClientRect().top -
  document.querySelector(".finish").getBoundingClientRect().height;
let divBottom =
  document.querySelector(".finish").getBoundingClientRect().top -
  player.getBoundingClientRect().height;
console.log(divBottom);
let ArrayOfDivs = [...$(".finish").children()];
ArrayOfDivs.map((rightAns) => {
  if ($(rightAns).attr("data-Answer") === "correct") {
    index = ArrayOfDivs.indexOf(rightAns) + 1;
    rightAnswer = rightAns;
  }
});

let rightAnsR = $(rightAnswer).offset().left + divWidth - 90;
let rightAnsL = $(rightAnswer).offset().left;
let clear;
let intervalId;
let intervalIdUp;
let intervalIdDown;
let intervalIdLeft;
let intervalIdRight;
console.log(player.offsetTop);
// Arrow Functions //
function arrowUpFn() {
  if (player.offsetTop >= divTop) {
    console.log(move);
    player.style.top = player.offsetTop - move + "px";
    clear = setInterval(() => {
      checkHeroMove();
    }, 100);
  }
}
function arrowDownFn() {
  if (player.offsetTop <= 575) {
    player.style.top = player.offsetTop + move + "px";
  }
}
function arrowLeftFn() {
  if (player.offsetLeft >= 81) {
    player.style.left = player.offsetLeft - move + "px";
  }
}
function arrowRightFn() {
  if (player.offsetLeft <= 1041) {
    player.style.left = player.offsetLeft + move + "px";
  }
}
////////////////////////////////////////////////////////////

// Adding Arrow Events //
function addEvents() {
  $(controlArrows).each(function () {
    let arrow = $(this).attr("data-id");
    switch (arrow) {
      case "up":
        $(this).on("click", arrowUpFn);
        $(this).on("mousedown touchstart", function () {
          intervalIdUp = setInterval(function () {
            arrowUpFn();
          }, 350);
        });
        $(this).on("mouseup touchend", function () {
          clearInterval(intervalIdUp);
        });
        break;
      case "down":
        $(this).on("click", arrowDownFn);
        $(this).on("mousedown touchstart", function () {
          intervalIdDown = setInterval(function () {
            arrowDownFn();
          }, 350);
        });
        $(this).on("mouseup touchend", function () {
          clearInterval(intervalIdDown);
        });
        break;
      case "right":
        $(this).on("click", arrowRightFn);
        $(this).on("mousedown touchstart", function () {
          intervalIdRight = setInterval(function () {
            arrowRightFn();
          }, 350);
        });
        $(this).on("mouseup touchend", function () {
          clearInterval(intervalIdRight);
        });

        break;
      case "left":
        $(this).on("click", arrowLeftFn);
        $(this).on("mousedown touchstart", function () {
          intervalIdLeft = setInterval(function () {
            arrowLeftFn();
          }, 350);
        });
        $(this).on("mouseup touchend", function () {
          clearInterval(intervalIdLeft);
        });
        break;
      default:
        break;
    }
  });
}
addEvents();
//////////////////////////////////////////////////////////

// To Clear Time Intervals for Arrows //
function clearTimeIntervals() {
  clearInterval(intervalIdUp);
  clearInterval(intervalIdDown);
  clearInterval(intervalIdLeft);
  clearInterval(intervalIdRight);
}
function clearInt(isOn) {
  $(controlArrows).each(function () {
    $(this).off();
  });
  clearTimeIntervals();
}
//////////////////////////////////////////////////////////

// Controling Counter //
function countNotZero(count) {
  $(".start").css("top", "576px");
  $(".start").css("left", "595px");
  $(".start").addClass("blink_me");
  window.removeEventListener("keydown", eventFn);
  $(".reloadBtnAll").css("pointer-events", "none");
  // arrows(2);
  clearInt();

  clearTimeIntervals();
  setTimeout(() => {
    $(".start").removeClass("blink_me");
    window.addEventListener("keydown", eventFn);
    addEvents();
    $(".reloadBtnAll").css("pointer-events", "all");
  }, 1000);
  document.querySelector(".counter").innerHTML = count;
}

function countZero(count) {
  [...document.querySelectorAll(".cars")].map((car) =>
    $(car).addClass("paused")
  );
  $(".start").css("top", `576px`);
  $(".start").css("left", "595px");
  window.removeEventListener("keydown", eventFn);
  document.querySelector(".counter").innerHTML = `${count}`;

  $(".overlay_start ").addClass("overlay_lose");
  $(".win-lose").css("display", "flex");
  $(".overlay_start ").fadeIn();
  $(".levels").css("display", "none");
  reloadKeyBtn();
  homeKeyBtn();
  clearInt();
}
//////////////////////////////////////////////////////////

// ReloadKeyBtn and HomeKeyBtn Functions //
function reloadKeyBtn() {
  $(".win-lose").html(relBtn);
  $(".overlay-relBtn").on("click", () => {
    fnReloadAll();
    startGame();
  });
}
function homeKeyBtn() {
  $(".win-lose").append(home);
  $(".overlay-homeBtn").on("click", () => {
    $(".startBtn").removeClass("dis");
    $(".overlay_start ").removeClass("overlay_lose");
    $(".overlay_start ").removeClass("overlay_win");
    $(".win-lose").css("display", "none");
    $(".startBtn").fadeIn();
    if (!$(".startBtn").hasClass("dis")) {
      $(".reloadBtnAll").addClass("disabled2");
    }
    $(".startBtn").on("click", () => {
      $(this).addClass("dis");
      if ($(".startBtn").hasClass("dis")) {
        $(".levels").html(levels);
        $(".levels").css("display", "flex");
        fnReloadAll();
      }
    });
  });
}
//////////////////////////////////////////////////////

// Event Function for Keys //
function eventFn({ key }) {
  // // console.log(move);
  let clear;
  if (key == "ArrowUp" && player.offsetTop >= divTop) {
    player.style.top = player.offsetTop - move + "px";
    clear = setInterval(() => {
      checkHeroMove(clear);
    }, 100);
  } else if (key == "ArrowDown" && player.offsetTop <= 575) {
    player.style.top = player.offsetTop + move + "px";
  } else if (key == "ArrowLeft" && player.offsetLeft >= 81) {
    player.style.left = player.offsetLeft - move + "px";
  } else if (key == "ArrowRight" && player.offsetLeft <= 1041) {
    player.style.left = player.offsetLeft + move + "px";

    clearInterval(clear);
  } else {
  }
}
////////////////////////////////////////////////////////// //

// Collision Functions //
const checkHeroMove = (clear) => {
  let playerPosX = player.getBoundingClientRect().left;
  let playerPosY = player.getBoundingClientRect().top;
  const playerX = playerPosX;
  const playerY = playerPosY;

  let catchTarget = undefined;
  const heroWidth = player?.getBoundingClientRect().width;
  const heroheight = player?.getBoundingClientRect().height;
  if (player.offsetTop < divBottom) {
    if (
      player.offsetTop <= divBottom &&
      player.offsetTop >= divTop &&
      player.offsetLeft >= rightAnsL &&
      player.offsetLeft <= rightAnsR
    ) {
      window.removeEventListener("keydown", eventFn);
      clearInt();
      clearTimeIntervals();
      clearInterval(clear);
      [...document.querySelectorAll(".cars")].map((car) =>
        $(car).addClass("paused")
      );
      $(".overlay_start ").addClass("overlay_win");
      $(".win-lose").css("display", "flex");
      $(".overlay_start ").fadeIn();
      $(".levels").css("display", "none");
      reloadKeyBtn();
      homeKeyBtn();
    } else {
      let count = document.querySelector(".counter").innerHTML;
      count--;
      if (count > 0) {
        countNotZero(count);
      } else if (count === 0) {
        countZero(count);
        clearTimeIntervals();
      }
    }
  }
  document.querySelectorAll(".cars").forEach((car) => {
    const { x, y, width, height, left, right } = car.getBoundingClientRect();

    if (
      playerX < x + width &&
      playerX + heroWidth > x &&
      playerY < y + height &&
      heroheight + playerY > y
    ) {
      catchTarget = true;

      fun({ car, playerX, width });
      return;
    }
  });

  return catchTarget;
};

function fun(param) {
  count = document.querySelector(".counter").innerHTML;
  count--;
  if (count > 0) {
    countNotZero(count);
  } else if (count === 0) {
    countZero(count);
    clearTimeIntervals();
  }
}
////////////////////////////////////////////////////////////

// Main Function //
function fnTemplate2_v1(_div) {
  var slide = $(_div);

  $audio1[0].pause();
  $audio1[0].currentTime = 0;
  slider.value = 0;
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();

  setAudio($(slide).attr("data-audioSrc"));
  //fnStartAudio('play');

  /*------------------Audio Syncing---------------*/
  var audioTime = [0.1, 1.5];
  $audio1[0].addEventListener("timeupdate", function () {
    var currTime = $audio1[0].currentTime;
    var audioDuration = $audio1[0].duration;
    // if(currTime >= audioTime[0] && currTime < audioTime[1]){
    // 	$('.callout_2 img').attr('src','assets/images/p5ex4/ye.jpg');
    // 	$('.callout_1 img').attr('src','assets/images/p5ex4/ye.jpg');
    // }else if(currTime >= audioTime[1]  && currTime < audioDuration){
    // 	$('.callout_1 img').attr('src','assets/images/p5ex4/ye.jpg');
    // 	$('.callout_2 img').attr('src','assets/images/p5ex4/ye.jpg');
    // }else{
    // 	$('.callout_1 img').attr('src','assets/images/p5ex4/ye.jpg');
    // 	$('.callout_2 img').attr('src','assets/images/p5ex4/ye.jpg');
    // }
  });
  $(".startBtn").on("click", () => {
    document.getElementById("monkeyVideo").play();
  });
  startGame();
}
//////////////////////////////////////////////////////////

// Clicking on Play Button
function startGame() {
  if (!$(".startBtn").hasClass("dis")) {
    $(".reloadBtnAll").addClass("disabled2");
  }
  $(".overlay_start img").on("click", function () {
    $(".reloadBtnAll").removeClass("disabled2");
    $(".startBtn").addClass("dis");
    $(this).parent().fadeOut();
    $(".overlay_start").addClass("overlay_levels");
    $(".levels").html(levels);
    $(".levels").find("img").click(levelsEvent);
  });
}

// clicking on Levels Buttons:
function levelsEvent() {
  const startEvents = () => {
    window.addEventListener("keydown", eventFn);
    setTimeout(() => {
      $(".overlay_start").removeClass("overlay_levels");
    }, 500);
    $(".croc").removeClass("paused");
  };
  const time = $(this).attr("data-time");
  $(this).parent().parent().fadeOut();

  if (time === "15") {
    move = 20;
    startEvents();
  } else if (time === "10") {
    move = 40;
    startEvents();
  } else if (time === "8") {
    console.log(move);
    move = 60;
    startEvents();
  }

  $(".cars").css("animation-duration", `${time}s`).removeClass("paused");
  // $(".overlay").addClass("hide_overlay");
}

function fnReloadAll() {
  console.log($(this));

  if ($(".start").hasClass("blink_me")) {
    $(".start").removeClass("blink_me");
  }
  console.log(move);
  // move = 0;
  $("#myCarousel").carousel(0);
  $(".callout").off("click");
  stopAudio();
  //art
  $(".start").css("top", "576px");
  $(".start").css("left", "595px");
  document.querySelector(".counter").innerHTML = 3;
  [...document.querySelectorAll(".cars")].map((car) => {
    // // console.log(car);
    $(car).removeClass("paused");
  });
  $(".croc").removeClass("paused");
  window.removeEventListener("keydown", eventFn);
  move = 0;
  clearInt();
  addEvents();
  clearInterval(clear);
  $(".cars").addClass("paused");
  $(".croc").addClass("paused");
  fadeInAgain();
  $(".overlay_start").addClass("overlay_levels");
  $(".overlay_start").removeClass("overlay_lose");
  $(".overlay_start").removeClass("overlay_win");
  $(".win-lose").css("display", "none");
  fnTemplate2_v1($("div.active"));
}
function fadeInAgain() {
  $(".overlay_start").fadeIn();
  if ($(".startBtn").hasClass("dis")) {
    $(".levels").html(levels);
    $(".levels").css("display", "flex");
    $(".levels").find("img").click(levelsEvent);
  }
}
function fnReloadScreen() {
  // $('.callout_1 img').attr('src','assets/images/p5ex4/ye.jpg');
  // $('.callout_2 img').attr('src','assets/images/p5ex4/ye.jpg');
  $(".callout").off("click");
  stopAudio();
  fnTemplate2_v1($("div.active"));
}

function setAudio(_src) {
  if (_src == "") {
    $(".controlsDiv").addClass("hide");
  } else {
    $(".controlsDiv").removeClass("hide");
  }
  $audio1[0].setAttribute("src", _src);
  $audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
  if ($(obj).hasClass("hide")) {
    return false;
  }
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  var titleAudioPath = $(obj).attr("data-audioSrc");
  //// // console.log("fnTitleAudioClick 	" +titleAudioPath	);
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  $audio2[0].play();
  isMusic1Playing = false;
  isMusic2Playing = true;
}

function fnUpdateTimer() {
  var progressValue = Math.round(
    ($audio1[0].currentTime / $audio1[0].duration) * 100
  );

  slider.value = progressValue;
}

function fnStartAudio(_state) {
  $audio2[0].pause();
  if (_state == "play") {
    $("#pButton .playImg").hide();
    $("#pButton .pauseImg").show();
    $audio1[0].play();
    isMusic1Playing = true;
  } else {
    $("#pButton .playImg").show();
    $("#pButton .pauseImg").hide();
    $audio1[0].pause();
    lastAudio = 0;
    isMusic1Playing = false;
  }
  $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
}

function showAns() {
  // music.pause();
  // pButton.className = "";
  // pButton.className = "play";
  if ($(".showAnsBtn").hasClass("disabled")) {
    return false;
  }

  $audio1[0].pause();
  $audio2[0].pause();

  // $('.showAnswerTickMark').fadeIn('slow');
  $("div.active")
    .find('.option[data-Answer="correct"]')
    .addClass("correctTick");
  $("div.active").find('.option[data-Answer="incorrect"]').addClass("disabled");
  $("div.active").find(".option").addClass("optDisable").off("click");
  // $(".option[data-Answer='incorrect']").css('opacity','0.6');
  $(this).addClass("disabled");
}

function stopAudio() {
  $audio1[0].pause();
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  $audio1[0].currentTime = 0;
  slider.value = 0;
  isMusic1Playing = false;
  $audio2[0].pause();
  isMusic2Playing = false;
  lastAudio = 0;
}

function fnSetPlayer() {
  if (currentIndex == 1) {
    $(".backBtn").addClass("disabled");
  }

  if (totalItems == 1) {
    $(
      ".navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber"
    ).addClass("hide");
  }

  if ($(".title").attr("data-audioSrc") == "") {
    $(".title").addClass("hide");
    $(".headingTitle").removeClass("col-xs-10").addClass("col-xs-11");
  }

  $audio1[0].addEventListener("playing", function () {
    lastAudio = 1;
    isMusic1Playing = true;
  });

  $audio2[0].addEventListener("playing", function () {
    lastAudio = 2;
    isMusic2Playing = true;
  });

  $audio1[0].addEventListener("pause", function () {
    isMusic1Playing = false;
  });

  $audio2[0].addEventListener("pause", function () {
    isMusic2Playing = false;
  });

  $audio2[0].addEventListener("ended", function () {
    // $('.callout_1 img').attr('src','assets/images/p5ex4/ye.jpg');
    // $('.callout_2 img').attr('src','assets/images/p5ex4/ye.jpg');
    lastAudio = 0;
  });

  $audio1[0].addEventListener("ended", function () {
    lastAudio = 0;
    isMusic1Playing = false;
    $audio1[0].currentTime = 0;
    slider.value = 0;
    $audio1[0].pause();
    $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
    $("#pButton .playImg").show();
    $("#pButton .pauseImg").hide();
  });

  slider.addEventListener(
    "input",
    function () {
      // // console.log(">> input "+slider.value);
      // $audio1[0].pause();
      $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
      var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
      $audio1[0].currentTime = setTime;
    },
    false
  );

  slider.addEventListener(
    "change",
    function () {
      // // console.log("change >> "+isMusic1Playing);
      if (isMusic1Playing) {
        $audio1[0].play();
        $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
      }
    },
    false
  );

  $("#myCarousel").on("slid.bs.carousel", function () {
    currentIndex = $("div.active").index() + 1;
    $(".pageNumber").html(currentIndex + " of " + totalItems);
    if (currentIndex == 1) {
      $(".backBtn").addClass("disabled");
    } else {
      $(".backBtn").removeClass("disabled");
    }

    if (currentIndex == totalItems) {
      $(".nextBtn").addClass("disabled");
    } else {
      $(".nextBtn").removeClass("disabled");
    }

    // need to edit template function name here:
    fnTemplate2_v1($("div.active"));
  });

  $(".pageNumber").html(currentIndex + " of " + totalItems);
}

///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
