"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require('axios');
const axiosMock = new AxiosMockAdapter(axios);

const {
  shipProduct, SHIPIT_SHIP_URL
} = require("./shipItApi");


test("shipProduct", async function () {

  axiosMock.onPost(`${SHIPIT_SHIP_URL}`).reply(200, {
    receipt: {
      itemId: 1526,
      name: "Test Tester",
      addr: "123 Test St.",
      zip: "123456",
      shipId: 9000
    }
  });

  const shipId = await shipProduct({
    productId: 1526,
    name: "Test Tester",
    addr: "123 Test St.",
    zip: "123456",
  });

  expect(shipId).toEqual(9000);
});
