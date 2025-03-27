const request = require("supertest")("https://dummyjson.com"); 
const expect = require("chai").expect;

describe("Test Dummy Api", function () {
    // Test Case Get All Product
    it("Get All Product Positive", async function() {
        const res = await request.get("/products").send();
        expect(res.status).to.equal(200);
        expect(res.body.products).to.be.an("array");
    })

    // Test Case Get Product by ID Positive
    it("Get Product by ID Positive", async function() {
        const res = await request.get("/products/1").send();
        expect(res.status).to.equal(200);
    })

    // Test Case Get All Product Negative
    it("Get All Product Negative", async function() {
        const res = await request.get("/AWIKWOK").send();
        expect(res.status).to.equal(404);
    })

        // Test Case Add All Product
    it("Post New Product Positive", async function() {
        const res = await request.post("/products/add")
        .set("Content-Type", "'application/json'")
        .send({
            tittle: "Mobil Balap",
        });
        expect(res.status).to.equal(201);
    })
})