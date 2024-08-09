export const validation = (bid) => {
  const keys = Object.keys(bid).filter((key) => key !== "amount");
  const error = keys.reduce((acc, curr) => {
    bid[curr].replace(/^0+/, "");
    const zero = bid[curr].replace(/^0+/, "");
    if(zero === ""){
        acc[curr] = "Zero not Allowed"
    }
    if (bid[curr] === "") {
      acc[curr] = "Please Fill";
    }
    if (bid[curr].length > 7) {
      acc[curr] = "at most 7 digit allowed";
    }
    return acc;
  }, {});
  const values = Object.values(bid);
  values.shift();

  const indicesMap = {};

  values.forEach((item, index) => {
    if (indicesMap[item] && item !== "") {
      indicesMap[item].push(index);
    } else {
      indicesMap[item] = [index];
    }
  });

  const duplicateIndices = [];
  for (const [item, indices] of Object.entries(indicesMap)) {
    if (indices.length > 1) {
      duplicateIndices.push(...indices);
    }
  }

  duplicateIndices.forEach((index) => {
    if (keys[index]) {
      error[keys[index]] = "value is duplicate";
    }
  });

  return error;
};
