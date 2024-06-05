import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate<0.01"],
    http_reqs: ["count>20"],
    http_reqs: ["rate>4"],
    checks: ["rate>=98"],
    counter: ["count>10"],
    responseNews: ["p(90)>100"],
  },
};

let counter = new Counter("counter");
let responseTrend = new Trend("responseNews");

export default function () {
  let response = http.get("https://test.k6.io");
  counter.add(1);
  sleep(1);

  response = http.get("https://test.k6.io/news.php");
  responseTrend.add(response.timings.duration);
  sleep(1);
}
