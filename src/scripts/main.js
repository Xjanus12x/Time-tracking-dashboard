import data from "./data.js";

// const work = data[0];
// const play = data[1];
// const study = data[2];
// const exercise = data[3];
// const social = data[4];
// const selfCare = data[5];

const cardsCategories = document.querySelectorAll(".card .card__hours");
const buttons = document.querySelector(".profile__menu");
let previousActive = undefined;
let currentActive = undefined;

setCardTitles(cardsCategories, data);

buttons.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("button")) {
    currentActive = target;
    if (target.dataset.state === "inactive") {
      renderCardContents(target.textContent, cardsCategories, data);
      target.dataset.state = "active";
    } else return;

    if (previousActive) {
      previousActive.dataset.state = "inactive";
    }
    previousActive = currentActive;
  }
});

function renderCardContents(optionType, cards, data) {
  let currentHours = undefined;
  let previousWeekHours = undefined;
  switch (optionType) {
    case "Daily":
      for (let i = 0; i < cards.length; i++) {
        currentHours = checkIfTimeIsGreaterThanOne(
          data[i].timeframes.daily.current
        );

        previousWeekHours = `Last Week - ${checkIfTimeIsGreaterThanOne(
          data[i].timeframes.daily.previous
        )}`;
        setCardContents(cards[i], currentHours, previousWeekHours);
      }
      break;
    case "Weekly":
      for (let i = 0; i < cards.length; i++) {
        currentHours = checkIfTimeIsGreaterThanOne(
          data[i].timeframes.weekly.current
        );

        previousWeekHours = `Last Week - ${checkIfTimeIsGreaterThanOne(
          data[i].timeframes.weekly.previous
        )}`;
        setCardContents(cards[i], currentHours, previousWeekHours);
      }

      break;
    case "Monthly":
      for (let i = 0; i < cards.length; i++) {
        currentHours = checkIfTimeIsGreaterThanOne(
          data[i].timeframes.monthly.current
        );

        previousWeekHours = `Last Week - ${checkIfTimeIsGreaterThanOne(
          data[i].timeframes.monthly.previous
        )}`;
        setCardContents(cards[i], currentHours, previousWeekHours);
      }
      break;
  }
}

function setCardTitles(cards, data) {
  cards.forEach((card, index) => {
    card.children[0].children[0].textContent = data[index].title;
  });
}

function setCardContents(card, currentHours, previousWeekHours) {
  card.children[1].children[0].textContent = currentHours;
  card.children[1].children[1].textContent = previousWeekHours;
}

function checkIfTimeIsGreaterThanOne(timeFrame) {
  return timeFrame > 1 ? `${timeFrame}hrs` : `${timeFrame}hr`;
}
