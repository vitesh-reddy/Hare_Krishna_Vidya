import http from "k6/http";
import { sleep, check } from "k6";
import { firstNames, lastNames, cities, donationTypes, amounts, randomFrom } from "./testData.js";

// k6 run burstDonations.test.js --summary-export=tmp.json ; node appendSummary.js

export const TEST_META = {
  testType: "Burst Donations",
  vus: 1000,
  duration: "15s",
};

export const options = {
  vus: TEST_META.vus,
  duration: TEST_META.duration,
  summaryTimeUnit: "ms",
};

const BASE_URL = "http://localhost:3000";
const ENDPOINT = "/api/payments/verify-payment";

export default function () {
  const orderId = `order_${Date.now()}_${__VU}_${__ITER}`;

  const body = {
    orderId,
    paymentId: `pay_${orderId}`,
    signature: "mock",
    donationData: {
      donorInfo: {
        firstName: randomFrom(firstNames),
        lastName: randomFrom(lastNames),
        email: `user_${__VU}_${__ITER}@test.com`,
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        city: randomFrom(cities),
      },
      donationType: "amount",
      donatedFor: randomFrom(donationTypes),
      amount: randomFrom(amounts),
      paymentDetails: {
        orderId,
        paymentId: `pay_${orderId}`,
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

  sleep(0.2);
}

export function handleSummary(data) {
  data.__meta = TEST_META;
  return { "tmp.json": JSON.stringify(data, null, 2) };
}
