// => Mock API ( Make later )
import { transactions } from "./components/mock-fetch.js";

// => Function components

import { Headbar } from "./components/Headbar/Headbar.js";
import { Filter } from "./components/Filter/Filter.js";
import { TransactionsList } from "./components/TransactionsList/TransactionsList.js";

const currentСurrency = '$'



Headbar(transactions)
TransactionsList(currentСurrency, transactions)
Filter(currentСurrency, transactions)