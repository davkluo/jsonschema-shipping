"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");

const jsonschema = require('jsonschema');
const shipmentSchema = require('../schema/shipmentSchema.json');

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const result = jsonschema.validate(
    req.body, shipmentSchema, {required: true}
  );
  if (!result.valid) {
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId }); // Should we return code 201?
});


module.exports = router;