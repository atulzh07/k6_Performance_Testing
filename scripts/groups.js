import http from "k6/http";
import { sleep, group, check } from "k6";

export const options = {
  thresholds: {},
};

export default function () {
  group("groupName", function () {
    let res = http.get("https://test.k6.io");
    check(res, { "status is 200": (r) => r.status === 200 });

    group("staticAsset", function () {
      http.get("https://test.k6.io/static/css/site.css");
    });
  });

  group("groupName2", function () {
    http.get("https://test.k6.io/news.php");
  });

  sleep(1);
}
