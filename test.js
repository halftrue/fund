const http = require("https");
const req = http.get(
  "https://api.doctorxiong.club/v1/stock?code=sz000651",
  (res) => {
    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (c) => (rawData += c));
    res.on("end", () => {
      const data = JSON.parse(rawData);
      if (data.code != 200) {
        http.get(
          "https://api.day.app/FApXchMpWvrZTtST5tRiVH/" + "服务不稳定",
          (res) => {}
        );
        return;
      }
      const price = data.data[0].price;
      const date = new Date();

      const currentTime = `${date.getHours()}:${date.getMinutes()}`;
      http.get(
        `https://api.day.app/FApXchMpWvrZTtST5tRiVH/${price}at${currentTime}`,
        (res) => {}
      );
    });
  }
);
