import axios from "axios";

const api = axios.create({
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
});

// 取得彭彭老師提供的資料
export function getData() {
  return api
  .get("https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json")
  .then((res)=>{
    console.log(res);
  })
  .catch((error) => {
    console.log("error", error);
  });
}
