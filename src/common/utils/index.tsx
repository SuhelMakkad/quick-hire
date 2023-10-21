export const formateCurrency = (amount: number) =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);

export const formateDate = (date: string | number) => new Date(date).toLocaleDateString();
