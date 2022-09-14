

export const TransactionsList = (arr) => {
    let currentСurrency = "$";
    const list = document.querySelector(".transactions__list");
    const typeCheker = (amount, type) => {
        if (type == "income") {
          return `+ ${currentСurrency} ${amount}`;
        } else {
          return `- ${currentСurrency} ${amount}`;
        }
    }
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


}