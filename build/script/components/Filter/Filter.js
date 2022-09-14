import { typeCheker } from "/script/tools/TypeCheker.js";


export const Filter = (currentСurrency, transactions) => {


  
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




  const form = document.querySelector(".transactions__form");
  const list = document.querySelector(".transactions__list");
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
                      </li>
                    `;

    includeTransactions(
      filterCheck(filterParam.month, filterParam.category, filterParam.type)
    );
  });
};
