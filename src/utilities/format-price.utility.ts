export const formatPrice = (priceNum: number | string): string => {
  let priceString = typeof priceNum === "number" ? String(priceNum) : priceNum;
  let priceStringDecimal = "";
  if (priceString.includes(".")) {
    priceStringDecimal = "." + priceString.split(".")[1];
    priceString = priceString.split(".")[0];
  }

  const priceArray = priceString.split("").reverse();
  return (
    "$ " +
    priceArray
      .map((num, idx) => {
        return (idx + 1) % 3 === 0 && idx + 1 != priceArray.length
          ? "," + num
          : num;
      })
      .reverse()
      .join("") +
    priceStringDecimal
  );
};

export const parsePrice = (priceNum: string): number => {
  return 1;
};
