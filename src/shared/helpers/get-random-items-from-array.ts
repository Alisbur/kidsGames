// export const getRandomItemsFromArray = <T>(arr: T[], quantity: number): T[] => {
//   if (!arr.length || quantity <= 0) return [];
//   if (quantity >= arr.length) return [...arr];

//   const shuffled = [...arr];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled.slice(0, quantity);
// };

export const getRandomItemsFromArray = <T>(arr: T[], quantity: number): T[] => {
  if (!arr.length) return [];

  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  if (quantity >= shuffled.length) return shuffled;
  return shuffled.slice(0, quantity);
};
