// Mock BACKEND

const transactions = [
  {
    type: "income",
    value: 20000,
    date: {
      month: "Jule",
      day: 01,
    },
  },
  {
    type: "income",
    value: 40000,
    date: {
      month: "Jule",
      day: 10,
    },
  },
  {
    type: "outcome",
    value: 1300,
    date: {
      month: "Jule",
      day: 8,
    },
  },
  {
    type: "outcome",
    value: 2000,
    date: {
      month: "Jule",
      day: 30,
    },
  },
  {
    type: "outcome",
    value: 2000,
    date: {
      month: "Jule",
      day: 01,
    },
  },
  {
    type: "outcome",
    value: 2000,
    date: {
      month: "Jule",
      day: 10,
    },
  },
  {
    type: "income",
    value: 20000,
    date: {
      month: "Jule",
      day: 01,
    },
  },
  {
    type: "income",
    value: 3000,
    date: {
      month: "Jule",
      day: 10,
    },
  },
  {
    type: "income",
    value: 3000,
    date: {
      month: "Jule",
      day: 10,
    },
  },
  {
    type: "income",
    value: 3000,
    date: {
      month: "Jule",
      day: 10,
    },
  },
  {
    type: "income",
    value: 123,
    date: {
      month: "Jule",
      day: 10,
    },
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

    const date = document.createElement("div"),
      month = document.createElement("span"),
      day = document.createElement("span");
    month.className = "dashboard__actives-value";
    day.className = "dashboard__actives-value";

    month.innerHTML = transactions[i].date.month;
    day.innerHTML = transactions[i].date.day;

    date.appendChild(month);

    type.innerHTML = typeCheker(transactions[i].type);
    value.innerHTML = `$ ${transactions[i].value}`;


    item.appendChild(value);
    item.appendChild(date);
    item.appendChild(type);
    list.appendChild(item);
  }
};

const typeCheker = (x) => {
  if (x == "income") {
    return "<div class='marker marker-income'></div>";
  } else {
    return "<div class='marker marker-outcome'></div>";;
  }
};

//

const earning = document.querySelector(".dashboard__info_amount__earning"),
  speding = document.querySelector(".dashboard__info_amount__spending"),
  balance = document.querySelector(".dashboard__info_amount__balance");

const income = transactions.filter((el) => el.type === "income"),
  incomeTotal = income.reduce((a, b) => a + b.value, 0);

const outcome = transactions.filter((el) => el.type === "outcome"),
  outcomeTotal = outcome.reduce((a, b) => a + b.value, 0);
let totalBalance = incomeTotal - outcomeTotal;
earning.innerHTML = `$ ${incomeTotal}`;
speding.innerHTML = `$ ${outcomeTotal}`;

balance.innerHTML = `$ ${totalBalance}`;

const incomeValueArr = income.map((i) => i.value);
const outcomeValueArr = outcome.map((i) => i.value);

includeTransactions();

const labels = ["Jule"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Income",
      backgroundColor: "green",
      borderColor: "green",
      data: incomeValueArr,
      
    },
    {
      label: "Outcome",
      backgroundColor: "red",
      borderColor: "red",
      data: outcomeValueArr,
      
    },
  ],

};

const config = {
  type: "bar",
  data: data,
  options: {},
};

const myChart = new Chart(document.getElementById("myChart"), config);
