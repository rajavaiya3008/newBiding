// export const bidData = [
//   // {
//   //   amount: "0",
//   //   val1: "",
//   //   val2: "",
//   //   val3: "",
//   //   val4: "",
//   //   val5: "",
//   //   val6: "",
//   // },
//   createSingleBidData({amount:'0'}),
//   createSingleBidData({amount:'500'}),
//   // { amount: "500", val1: "", val2: "", val3: "", val4: "", val5: "", val6: "" },
//   {
//     amount: "1000",
//     val1: "",
//     val2: "",
//     val3: "",
//     val4: "",
//     val5: "",
//     val6: "",
//   },
//   {
//     amount: "1500",
//     val1: "",
//     val2: "",
//     val3: "",
//     val4: "",
//     val5: "",
//     val6: "",
//   },
//   {
//     amount: "2000",
//     val1: "",
//     val2: "",
//     val3: "",
//     val4: "",
//     val5: "",
//     val6: "",
//   },
//   {
//     amount: "2500",
//     val1: "",
//     val2: "",
//     val3: "",
//     val4: "",
//     val5: "",
//     val6: "",
//   },
// ];
export const bidData = createBidData();

function createBidData() {
  const allBid = [];
  const amounts = ["0", "500", "1000", "1500", "2000", "2500"];
  amounts.forEach((amount) => {
    allBid.push(createSingleBidData({ amount }));
  });
  return allBid;
}

function createSingleBidData({ amount }) {
  return {
    amount,
    val1: "",
    val2: "",
    val3: "",
    val4: "",
    val5: "",
    val6: "",
  };
}
