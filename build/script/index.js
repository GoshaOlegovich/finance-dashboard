// Imports

import { transactions } from "./components/mock-fetch.js";
import { Filter } from "./components/Filter/Filter.js";
import { Headbar } from "./components/Headbar/Headbar.js";
import { TransactionsList } from "./components/TransactionsList/TransactionsList.js";



// => Transactions list



// Inner Earning / Spending / Balance
Headbar(transactions)

TransactionsList(transactions)
Filter(transactions)