export const formatPrice = (priceNum: number): string => {
  const priceArray = String(priceNum).split("").reverse();
  return (
    "$ " +
    priceArray
      .map((num, idx) => {
        return (idx + 1) % 3 === 0 && idx + 1 != priceArray.length
          ? "," + num
          : num;
      })
      .reverse()
      .join("")
  );
};
