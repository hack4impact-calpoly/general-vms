const express = require("express");
const app = require("../src/server");
const supertest = require("supertest");

test("GET /test", async () => {
  const message = "Hi there!";

  await supertest(app).get("/test/")
    .expect(200)
    .then((response) => {
      expect(response.text).toBe(message);
    });
});
