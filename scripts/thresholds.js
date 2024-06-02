import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<300"],
    http_req_failed: ["rate<0.01"],
    http_reqs: ["count>20"],
    http_reqs: ["rate>4"],
  },
};

export default function () {
  const response = http.get("https://test.k6.io");
  sleep(2);
}
