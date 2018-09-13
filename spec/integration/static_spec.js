const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const marco = "http://localhost:3000/marco";

describe("routes : static", () => {

  describe("GET /", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("GET /marco", () => {
    it("should return status code 200", (done) => {
      request.get(base + "marco", (err, res, body) => { //either use variable marco or add "marco" to base
        expect(res.statusCode).toBe(200);
        expect(body).toBe("polo");
        done();
      })
    })
  })
});
