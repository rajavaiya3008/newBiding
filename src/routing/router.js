import App from "../App";
import BidSystem from "../components/BidSystem";
import Result from "../components/Result";

export const allRouter = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <BidSystem />,
      },
      {
        path: "/results",
        element: <Result />,
      },
    ],
  },
];
