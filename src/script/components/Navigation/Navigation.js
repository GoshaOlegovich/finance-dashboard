const navigation = document.querySelector(".navigation");
const links = document.querySelectorAll(".navigation__link");

// Pages

const analysis = document.querySelector('.analysis')
const transactions = document.querySelector('.transactions')

export const Navigation = () => {
  navigation.addEventListener("click", (e) => {
    for (let i = 0; i < links.length; i++) {
      if (e.target.classList.contains("navigation__link")) {
        links[i].classList.remove("navigation__link--active");
        e.target.classList.add("navigation__link--active");
        console.log(history);
        if (e.target.dataset.page === 'transactions') {
          analysis.style.display = 'none'
          transactions.style.display = 'block'
          console.log('history');
        }
        if (e.target.dataset.page === 'analysis') {
          analysis.style.display = 'block'
          transactions.style.display = 'none'
          console.log('analysis');
        }
      }
    }
  });
};
