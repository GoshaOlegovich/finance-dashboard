// Mock JSON

const transactions = [
  {
    type: "income",
    value: 2000,
  },
  {
    type: "income",
    value: 10000,
  },
  {
    type: "outcome",
    value: 2000,
  },
  {
    type: "income",
    value: 1000,
  },
  {
    type: "outcome",
    value: 4000,
  },
  {
    type: "income",
    value: 10000,
  },
  {
    type: "income",
    value: 700,
  },
];

//

const list = document.querySelector(".dashboard__actives_list");

const includeTransactions = () => {
  for (let i = 0; i < transactions.length; i++) {
    const item = document.createElement("li");
    item.className = "dashboard__actives_item";

    const type = document.createElement("span");
    type.className = "dashboard__actives-value dashboard__actives-value-type";

    const value = document.createElement("span");
    value.className =
      "dashboard__actives-value dashboard__actives-value-amount";

    type.innerHTML = transactions[i].type;
    value.innerHTML = `$ ${transactions[i].value}`;

    item.appendChild(type);
    item.appendChild(value);

    list.appendChild(item);
  }
};

//

const earning = document.querySelector(".dashboard__info_amount__earning"),
  speding = document.querySelector(".dashboard__info_amount__spending"),
  balance = document.querySelector(".dashboard__info_amount__balance");

const totals = () => {
  const income = transactions.filter((el) => el.type === "income"),
    incomeTotal = income.reduce((a, b) => a + b.value, 0);

  const outcome = transactions.filter((el) => el.type === "outcome"),
    outcomeTotal = outcome.reduce((a, b) => a + b.value, 0);

  let totalBalance = incomeTotal - outcomeTotal;

  earning.innerHTML = `$ ${incomeTotal}`;
  speding.innerHTML = `$ ${outcomeTotal}`;

  balance.innerHTML = `$ ${totalBalance}`;
  console.log(balance);
};

totals();
includeTransactions();
