import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate<0.01"],
    http_reqs: ["count>20"],
    http_reqs: ["rate>4"],
    checks: ["rate>=98"],
  },
};

export default function () {
  const response = http.get("https://test.k6.io");
  console.log(exec.scenario.iterationInTest);
  sleep(2);
}
