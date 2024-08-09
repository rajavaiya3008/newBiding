export const lowestUniqBid = (usersBid) => {
  const keys = Object.keys(usersBid);
  const updatedData = keys.reduce((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = [];
    }
    usersBid[curr].map((obj) => {
      Object.keys(obj).map((key) => {
        if (key !== "amount") {
          acc[curr].push(obj[key]);
        }
      });
    });
    return acc;
  }, {});

  const allBidVal = [];
  for (let key in updatedData) {
    allBidVal.push(...updatedData[key]);
  }
  const uniqBid = findUniqueElements(allBidVal);

  return uniqBid;
};

function findUniqueElements(arr) {
  const countMap = {};

  arr.forEach((element) => {
    if (!countMap[element]) {
      countMap[element] = 0;
    }
    countMap[element] = countMap[element] + 1;
  });

  const uniqueElements = Object.keys(countMap).filter(
    (key) => countMap[key] === 1
  );

  return uniqueElements.map(Number);
}
