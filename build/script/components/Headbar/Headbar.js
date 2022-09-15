export const Headbar = (transactions) => {
  const earning = document.querySelector(".headbar__info_amount__earning"),
    speding = document.querySelector(".headbar__info_amount__spending"),
    balance = document.querySelector(".headbar__info_amount__balance");

  const monts = ["August", "September"];

  const prevIncome = transactions
    .filter((el) => el.type === "income")
    .filter((el) => el.date.month === monts[0])
    .reduce((a, b) => a + b.value, 0);

  const prevOutcome = transactions
    .filter((el) => el.type === "outcome")
    .filter((el) => el.date.month === monts[0])
    .reduce((a, b) => a + b.value, 0);

  const income = transactions
    .filter((el) => el.type === "income")
    .filter((el) => el.date.month === monts[1])
    .reduce((a, b) => a + b.value, 0);

  const outcome = transactions
    .filter((el) => el.type === "outcome")
    .filter((el) => el.date.month === monts[1])
    .reduce((a, b) => a + b.value, 0);

  let totalBalance = income - outcome;

  const whatsBigger = (a, b) => {
    return ((a - b) / b) * 100;
  };

  earning.innerHTML = `$${income}`;
  speding.innerHTML = `$${outcome}`;
  balance.innerHTML = `$${totalBalance}`;

  const incomeDifference = document.querySelector(
      ".headbar__difference-income"
    ),
    outcomeDifference = document.querySelector(".headbar__difference-outcome");

  const intrestIn = () => {
    let result = whatsBigger(income, prevIncome);
    if (result > 0) {
      incomeDifference.classList.add("green");
      incomeDifference.innerHTML = `${result.toFixed(2)}%`;
    } else if (result < 0) {
      incomeDifference.classList.add("red");
      incomeDifference.innerHTML = `${result.toFixed(2)}%`;
    } else {
      outcomeDifference.innerHTML = `0%`;
    }

    // outcomeDifference.innerHTML = `${outcome / prevOutcome}%`;
  };

  const intrestOut = () => {
    let result = whatsBigger(outcome, prevOutcome);
    if (result > 0) {
      outcomeDifference.classList.add("red");
      outcomeDifference.innerHTML = `${result.toFixed(2)}%`;
    } else if (result < 0) {
      outcomeDifference.classList.add("green");
      outcomeDifference.innerHTML = `${result.toFixed(2)}%`;
    } else {
      outcomeDifference.innerHTML = `0%`;
    }
  };

  intrestIn();
  intrestOut();
};
