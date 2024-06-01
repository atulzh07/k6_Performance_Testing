import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "5m", target: 1000 }, // Ramp Up testing.
    { duration: "8h", target: 1000 }, // Steady Load
    { duration: "5m", target: 0 }, // Ramp Down testing.
  ],
};
export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
