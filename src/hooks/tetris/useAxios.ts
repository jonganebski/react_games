import Axios from "axios";
import { useEffect, useState } from "react";
import { processData } from "../../utils/globalUtils";

export const useAxios = (
  url: string,
  method: "GET" | "POST",
  username: string,
  score: number
): [
  {
    name: string;
    time: string;
  }[]
] => {
  const [data, setData] = useState<
    {
      name: string;
      time: string;
    }[]
  >([]);

  //   useEffect(() => {
  //     Axios({ method, url, data: { username, score } }).then((res) =>
  //       setData(processData(res.data))
  //     );
  //   }, [method, score, url, username]);

  return [data];
};
