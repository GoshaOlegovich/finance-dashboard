let currentСurrency = '$'

export const typeCheker = (amount, type) => {
    if (type == "income") {
      return `+ ${currentСurrency} ${amount}`;
    } else {
      return `- ${currentСurrency} ${amount}`;
    }
  };