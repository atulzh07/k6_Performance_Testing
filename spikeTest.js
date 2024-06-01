import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 10000 }, // Ramp Up testing.
    { duration: "1m", target: 0 }, // Ramp Down testing.
  ],
};
export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
