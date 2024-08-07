export const lowestUniqBid = (usersBid) => {
  //   console.log("usersBid", usersBid);
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

  //   console.log("updatedData", updatedData);

  const uniqValData = {};
  const finalUniqBidArr = [];

  for (let key in updatedData) {
    uniqValData[key] = findUniqueElements(updatedData[key]);
    finalUniqBidArr.push(...uniqValData[key]);
  }
  //   console.log("uniqValData", uniqValData);
  const finalAns = findUniqueElements(finalUniqBidArr);
  //   console.log("finalAns", finalAns);
  let winnerUser;
  for (let key in uniqValData) {
    if (uniqValData[key].includes(finalAns[0])) {
      winnerUser = key;
    }
  }
  //   console.log("winnerUser", winnerUser);
  return { value: finalAns[0], winnerUser, uniqValData };
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
