
const Filter = () => {
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
                      </li>
                    `;
    
      includeTransactions(filterCheck(filterParam.month, filterParam.category, filterParam.type));
    
    });
}


export default Filter