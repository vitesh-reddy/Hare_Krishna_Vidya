import http from "k6/http";
import { sleep, check } from "k6";


// k6 run duplicateReplay.test.js --summary-export=tmp.json ; node appendSummary.js

export const TEST_META = {
  testType: "Duplicate Replay",
  vus: 30,
  duration: "15s",
};

export const options = {
  vus: TEST_META.vus,
  duration: TEST_META.duration,
  summaryTimeUnit: "ms",
};

const BASE_URL = "http://localhost:3000";
const ENDPOINT = "/api/payments/verify-payment";

const ORDER_ID = "order_DUPLICATE_TEST_001";
const PAYMENT_ID = "pay_DUPLICATE_TEST_001";

export default function () {
  const body = {
    orderId: ORDER_ID,
    paymentId: PAYMENT_ID,
    signature: "mock",
    donationData: {
      donorInfo: {
        firstName: "Replay",
        lastName: "Test",
        email: "replay@test.com",
        phone: "9999999999",
      },
      donationType: "amount",
      donatedFor: "Annadaan",
      amount: 1000,
      paymentDetails: {
        orderId: ORDER_ID,
        paymentId: PAYMENT_ID,
        signature: "mock",
      },
    },
  };

  const res = http.post(
    `${BASE_URL}${ENDPOINT}`,
    JSON.stringify(body),
    { headers: { "Content-Type": "application/json" } }
  );

  check(res, {
    "status is 2xx": (r) => r && r.status >= 200 && r.status < 300,
  });

  sleep(0.1);
}

export function handleSummary(data) {
  data.__meta = TEST_META;
  return { "tmp.json": JSON.stringify(data, null, 2) };
}