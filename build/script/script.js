// Global

let currentСurrency = "$";

// Mock BACKEND

const transactions = [
  {
    type: "income",
    value: 500,
    category: "Freelance",
    date: {
      month: "Sep",
      day: 01,
    },
  },
  {
    type: "outcome",
    value: 100,
    category: "Food",
    date: {
      month: "Aug",
      day: 8,
    },
  },
  {
    type: "income",
    value: 500,
    category: "Freelance",
    date: {
      month: "Jule",
      day: 01,
    },
  },
  {
    type: "outcome",
    value: 90,
    category: "Food",
    date: {
      month: "Sep",
      day: 8,
    },
  },
  {
    type: "income",
    value: 490,
    category: "Freelance",
    date: {
      month: "Jule",
      day: 01,
    },
  },
  {
    type: "outcome",
    value: 30,
    category: "Food",
    date: {
      month: "Jule",
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
  <li class="transactions_item">
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

const filterCheck = (p1, p2, p3) => {
  const filterResult = filter(p1, p2, p3)
  console.log(filterResult);
  if (filterResult.length === 0) {
    list.innerHTML = `
  <li class="transactions_item">
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
                <li class="transactions_item">
                  <span class="transactions__value">
                 No data
                  </span>
                </li>
                
                `;
  }
  else {
    return filterResult
  }

}


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

// => Chart

const list = document.querySelector(".transactions__list");

const includeTransactions = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const item = document.createElement("li");
    item.className = "transactions_item";

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

//

const earning = document.querySelector(".analytic__info_amount__earning"),
  speding = document.querySelector(".analytic__info_amount__spending"),
  balance = document.querySelector(".analytic__info_amount__balance");

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

includeTransactions(transactions);

// => Chart

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
