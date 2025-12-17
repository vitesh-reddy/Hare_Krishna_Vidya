import fs from "fs";

const JSON_FILE = "tmp.json";

const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
const m = data.metrics;
const meta = data.__meta;

const mdFile =
  meta.testType === "Duplicate Replay"
    ? "duplicateReplay.md"
    : "burstDonations.md";

const totalRequests = m.http_reqs.count;
const reqPerSec = m.http_reqs.rate;

const failedCount = m.checks?.fails || 0;
const errorRate =
  totalRequests === 0 ? 0 : failedCount / totalRequests;

const f = (n) => Number(n).toFixed(2);
const runDate = new Date().toLocaleString("en-IN");

const header = `| VUs | Duration | Total Requests | Req/sec | Avg (ms) | Min (ms) | Max (ms) | P95 (ms) | Errors | Run Date |
|-----|----------|----------------|---------|----------|----------|----------|----------|--------|----------|
`;

const row = `| ${meta.vus} | ${meta.duration} | ${totalRequests} | ${f(
  reqPerSec
)} | ${f(m.http_req_duration.avg)} | ${f(
  m.http_req_duration.min
)} | ${f(m.http_req_duration.max)} | ${f(
  m.http_req_duration["p(95)"]
)} | ${failedCount} (${f(errorRate * 100)}%) | ${runDate} |
`;

if (!fs.existsSync(mdFile)) {
  fs.writeFileSync(mdFile, `### ${meta.testType}\n\n` + header + row);
} else {
  fs.appendFileSync(mdFile, row);
}

fs.unlinkSync(JSON_FILE);