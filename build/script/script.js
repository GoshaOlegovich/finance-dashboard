console.log('das');
// Global

let currentСurrency = "$";

// => Mock BACKEND

const transactions = [
  {
    type: "income",
    value: 800,
    category: "Freelance",
    date: {
      month: "September",
      day: 01,
    },
  },
  {
    type: "outcome",
    value: 200,
    category: "Food",
    date: {
      month: "September",
      day: 8,
    },
  },
  {
    type: "income",
    value: 700,
    category: "Freelance",
    date: {
      month: "August",
      day: 01,
    },
  },
  {
    type: "outcome",
    value: 200,
    category: "Food",
    date: {
      month: "August",
      day: 8,
    },
  },
];

// => Form

const form = document.querySelector(".transactions__form");

form.addEventListener("change", (e) => {
  let chage = e.target.value;

  let month = document.getElementById("selectorMonth"),
    category = document.getElementById("selectorCategory"),
    type = document.getElementById("selectorType");

  const filterParam = {
    month: month.value,
    category: category.value,
    type: type.value,
  };

  console.log(filterParam);

  list.innerHTML = `
  <li class="transactions__item">
                  <span class="transactions__value">
                    Category
                  </span>
                  <span class="transactions__value">
                    Date
                  </span>
                  <span class="transactions__value">
                    Amount
                  </span>
                </li>`;

  includeTransactions(
    filterCheck(filterParam.month, filterParam.category, filterParam.type)
  );
});

// => Filter

const filterCheck = (p1, p2, p3) => {
  const filterResult = filter(p1, p2, p3);
  console.log(filterResult);
  if (filterResult.length === 0) {
    list.innerHTML = `
  <li class="transactions__item">
                  <span class="transactions__value">
                    Category
                  </span>
                  <span class="transactions__value">
                    Date
                  </span>
                  <span class="transactions__value">
                    Amount
                  </span>
                </li>
                <li class="transactions__item">
                  <span class="transactions__value">
                 No data
                  </span>
                </li>
                
                `;
  } else {
    return filterResult;
  }
};




const filter = (param1, param2, param3) => {
  // month
  if (param1 !== "All" && param2 === "All" && param3 === "All") {
    const filtred = transactions.filter((el) => el.date.month === param1);

    return filtred;
  }
  // category
  else if (param1 === "All" && param2 !== "All" && param3 === "All") {
    const filtred = transactions.filter((el) => el.category === param2);

    return filtred;
  }
  // month + category
  else if (param1 !== "All" && param2 !== "All" && param3 === "All") {
    const filtred = transactions
      .filter((el) => el.date.month === param1)
      .filter((el) => el.category === param2);

    return filtred;
  }
  // month + type
  else if (param1 !== "All" && param2 === "All" && param3 !== "All") {
    const filtred = transactions
      .filter((el) => el.date.month === param1)
      .filter((el) => el.type === param3);

    return filtred;
  }

  // month + category + type
  else if (param1 !== "All" && param2 !== "All" && param3 !== "All") {
    const filtred = transactions
      .filter((el) => el.date.month === param1)
      .filter((el) => el.category === param2)
      .filter((el) => el.type === param3);

    return filtred;
  }
  // category + type
  else if (param1 === "All" && param2 !== "All" && param3 !== "All") {
    const filtred = transactions
      .filter((el) => el.category === param2)
      .filter((el) => el.type === param3);

    return filtred;
  }
  // category
  else if (param1 === "All" && param2 === "All" && param3 !== "All") {
    const filtred = transactions.filter((el) => el.type === param3);

    return filtred;
  } else {
    return transactions;
  }
};


// => Transactions list

const list = document.querySelector(".transactions__list");

const includeTransactions = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const item = document.createElement("li");
    item.className = "transactions__item";

    const type = document.createElement("span");
    type.className = "transactions__value transactions__value--type";

    const value = document.createElement("span");
    value.className = "transactions__value transactions__value--amount";

    const date = document.createElement("div"),
      category = document.createElement("span"),
      month = document.createElement("span"),
      day = document.createElement("span");
    category.className = "transactions__value";
    month.className = "transactions__value";
    day.className = "transactions__value";

    category.innerHTML = arr[i].category;
    month.innerHTML = arr[i].date.month;
    day.innerHTML = arr[i].date.day;

    date.appendChild(month);

    value.innerHTML = typeCheker(arr[i].value, arr[i].type);

    item.appendChild(category);
    item.appendChild(date);
    item.appendChild(value);

    list.appendChild(item);
  }
};

const typeCheker = (amount, type) => {
  if (type == "income") {
    return `+ ${currentСurrency} ${amount}`;
  } else {
    return `- ${currentСurrency} ${amount}`;
  }
};


// Inner Earning / Spending / Balance

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


const whatsBigger = (a,b) => {
    return (a - b) / b * 100
}


console.log("Aug", prevIncome,"Sep", income, 'Whats bigger?', whatsBigger(income, prevIncome) + '%');


earning.innerHTML = `$ ${income}`;
speding.innerHTML = `$ ${outcome}`;
balance.innerHTML = `$ ${totalBalance}`;

const incomeDifference = document.querySelector(".headbar__difference-income"),
  outcomeDifference = document.querySelector(".headbar__difference-outcome");



const intrestIn = () => {
  let result = whatsBigger(income, prevIncome)
  if (result > 0) {
    incomeDifference.classList.add('green')
    incomeDifference.innerHTML = `${result.toFixed(2)}%`;
  }
  else if (result < 0) {
    incomeDifference.classList.add('red')
    incomeDifference.innerHTML = `${result.toFixed(2)}%`;
  }
  else {
    outcomeDifference.innerHTML = `0%`;
  }

  // outcomeDifference.innerHTML = `${outcome / prevOutcome}%`;
}

const intrestOut = () => {
  let result = whatsBigger(outcome, prevOutcome)
  if (result > 0) {
    outcomeDifference.classList.add('red')
    outcomeDifference.innerHTML = `${result.toFixed(2)}%`;
  }
  else if (result < 0) {
    outcomeDifference.classList.add('green')
    outcomeDifference.innerHTML = `${result.toFixed(2)}%`;
  }
  else {
    outcomeDifference.innerHTML = `0%`;
  }
}

intrestIn()
intrestOut()
includeTransactions(transactions);
