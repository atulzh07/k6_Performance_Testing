import http from "k6/http";
import { check } from "k6";

export default function () {
  const response = http.get("https://test.k6.io");
  //assertions
  check(response, {
    "status is 200": (r) => r.status === 200,
    "correct page is rendered": (r) =>
      r.body.includes("Collection of simple web-pages") === true,
  });
}
