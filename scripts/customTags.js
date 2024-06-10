import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { Counter } from "k6/metrics";

export const options = {
  thresholds: {
    "http_req_duration{page:order}": ["p(95)<300"],
    checks: ["rate>0.99"],
    "checks{page:differentPage}": ["rate>0.99"],
    httpErrors: ["count==0"],
    "httpErrors{page:add}": ["count==0"],
  },
};
let httpErrors = new Counter("httpErrors");

export default function () {
  let response = http.get(
    "https://run.mocky.io/v3/bed2010e-02e9-4682-9d5c-95893a0f5d38"
  );
  if (response.error) {
    httpErrors.add(1);
  }
  check(response, {
    "status is 200": (r) => r.status === 200,
  });

  //Submitting an Order
  http.get(
    "https://run.mocky.io/v3/96fa8d94-3a3a-4139-8938-5c1c3fe4a8ee?mocky-delay=2000ms",
    {
      tags: {
        page: "order",
      },
    }
  );
  if (response.error) {
    httpErrors.add(1, { page: "add" });
  }
  check(
    response,
    {
      "status is 201": (r) => r.status === 201,
    },
    { page: "differentPage" }
  );
}
