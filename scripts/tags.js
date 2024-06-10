import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    "http_req_duration{status:200}": ["p(95)<1000"],
    "http_req_duration{status:201}": ["p(95)<1000"],
  },
};

export default function () {
  http.get("https://run.mocky.io/v3/bed2010e-02e9-4682-9d5c-95893a0f5d38");
  http.get(
    "https://run.mocky.io/v3/96fa8d94-3a3a-4139-8938-5c1c3fe4a8ee?mocky-delay=500ms"
  );
}
