const container = document.querySelector("#container");
const injection = document.querySelector("#injection");
const pointsDiv = document.querySelector("#pointsDiv");

container.addEventListener("mousemove", (e) => {
  injection.style.left = e.clientX - 12.5 + "px";
});

setInterval(() => {
  let containerWidth = container.offsetWidth;

  const coronaDiv = document.createElement("div");
  coronaDiv.classList.add("corona");

  let coronaLeft = Math.floor(Math.random() * containerWidth) + 1;
  coronaDiv.style.left = coronaLeft + "px";
  container.append(coronaDiv);
  const coronaObj = {
    coronaElement: coronaDiv,
    top: 0,
  };
  coronaArr.push(coronaObj);
}, 1000);

const coronaArr = [];
let lost = 0;
let score = 0;

setInterval(() => {
  let containerHeight = container.offsetHeight;

  coronaArr.forEach((element, idx) => {
    if (element.top > containerHeight) {
      container.removeChild(element.coronaElement);
      coronaArr.splice(idx, 1);
      lost++;
      pointsDiv.innerHTML = "Score" + score + " ||| Lost:" + lost;
    } else {
      element.top += 10;
      element.coronaElement.style.top = element.top + "px";
    }
  });
}, 50);

let gameSound = document.createElement("audio");
gameSound.src = "./sounds/game.mp3";
gameSound.setAttribute("controls", "none");
gameSound.setAttribute("preload", "auto");
gameSound.style.display = "none";
gameSound.volume = 0.1;
gameSound.loop = true;
container.append(gameSound);
let bulletSound = document.createElement("audio");
bulletSound.src = "./sounds/bullet.wav";
bulletSound.setAttribute("controls", "none");
bulletSound.setAttribute("preload", "auto");
bulletSound.style.display = "none";
bulletSound.volume = 0.1;
container.append(bulletSound);
container.append(gameSound);
container.addEventListener("click", (e) => {
  gameSound.play();
  bulletSound.play();
  const bulletDiv = document.createElement("div");
  bulletDiv.classList.add("bullet");
  bulletDiv.style.left = e.clientX + "px";
  container.append(bulletDiv);
  let containerHeight = container.offsetHeight;
  let bottom = 100;
  const interval = setInterval(() => {
    if (bottom > containerHeight) {
      clearInterval(interval);
      container.removeChild(bulletDiv);
    } else {
      bottom += 25;
      bulletDiv.style.bottom = bottom + "px";
      explode(bulletDiv, interval);
    }
  }, 50);
});
let explosionSound = document.createElement('audio')
explosionSound.src = './sounds/explosion.wav';
explosionSound.setAttribute('controls', 'none');
explosionSound.setAttribute('preload', 'auto');
explosionSound.style.display = 'none';
explosionSound.volume = 0.1;
container.append(explosionSound);

function explode(bulletElement, interval) {
  coronaArr.forEach((corona, idx) => {
    if (is_colliding(bulletElement, corona.coronaElement)) {
      clearInterval(interval);
      container.removeChild(bulletElement);
      container.removeChild(corona.coronaElement);
      coronaArr.splice(idx, 1);
      score++;
      pointsDiv.innerHTML = "Score" + score + " ||| Lost:" + lost;
        explosionSound.play();
    }
  });
}

var is_colliding = function ($div1, $div2) {
  // Div 1 data
  //var d1_offset             = $div1.offset();
  var d1_height = $div1.offsetHeight;
  var d1_width = $div1.offsetWidth;
  var d1_distance_from_top = $div1.offsettop + d1_height;
  var d1_distance_from_left = $div1.offsetLeft + d1_width;

  // Div 2 data
  //var d2_offset             = $div2.offset();
  var d2_height = $div2.offsetHeight;
  var d2_width = $div2.offsetWidth;
  var d2_distance_from_top = $div2.offsetTop + d2_height;
  var d2_distance_from_left = $div2.offsetLeft + d2_width;

  var not_colliding =
    d1_distance_from_top < $div2.offsetTop ||
    $div1.offsetTop > d2_distance_from_top ||
    d1_distance_from_left < $div2.offsetLeft ||
    $div1.offsetLeft > d2_distance_from_left;

  // Return whether it IS colliding
  return !not_colliding;
};
