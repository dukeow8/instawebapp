import { data } from "../../static/db";
const feed = data?.feed;

export default function Feed(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(feed));
}
