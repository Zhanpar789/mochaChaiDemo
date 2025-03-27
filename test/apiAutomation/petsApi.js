const request = require ("supertest")("https://petstore.swagger.io")
const expect = require ("chai").expect;
const fs = require("fs");
const path = require("path");

describe("Test pets Swagger API", function () {
    // Test Case Get Pets ID

    it ("Get Pets ID - Positive Case", async function () {
        const res = await request.get("/v2/pet/88").send();
        expect(res.status).to.equal(200)
    });

    it.skip("Get Pets Status - Hanya SOLD Positive Case", async function () {
        const res = await request.get("/v2/pet/findByStatus?status=sold").send();
        expect(res.status).to.equal(200);
    });

    const statuses = ["sold", "available", "pending"];

    statuses.forEach(status => {
        it.skip(`Get Pets Status - ${status} (Positive Case)`, async function () {
            const res = await request.get(`/v2/pet/findByStatus?status=${status}`).send();
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array"); // Pastikan hasilnya adalah array
        });
    });

    it("Get Pets Status - Seluruh Status (Positive Case)", async function () {
        const res = await request.get("/v2/pet/findByStatus?status=sold,available,pending").send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("Get Pets ID - Negative Case", async function() {
        const res = await request.get("/v2/pets/789").send();
        expect(res.status).to.equal(404);
    });

    it.skip("Get Pets Status - Negative Case", async function () {
        const res = await request.get("/v2/pet/findByStatus?status=return").send();
        expect(res.status).to.equal(404);
    });

    it("Add a New Pets - Positive Case", async function () {
        const res = await request.post("/v2/pet").set("Content-Type", "application/json")
        .send({
            id: 88,
            category: {
                id: 88,
                name: "string"
            },
            name: "Embe",
            photoUrls: [
                "string"
            ],
            tags: [
                {
                    id: 88,
                    name: "string"
                }
            ],
                status: "available"
        });
        expect(res.status).to.equal(200);
    });

    it("Update an Existing Pets - Positive Case", async function () {
        const res = await request.put("/v2/pet").set("Content-Type", "application/json")
        .send({
            id: 88,
            category: {
                id: 88,
                name: "string"
            },
            name: "Embe Embe Kurinkkk",
            photoUrls: [
                "string"
            ],
            tags: [
                {
                    id: 88,
                    name: "string"
                }
            ],
            status: "available"
        });
        expect(res.status).to.equal(200);
    });

    it("Upload Image - Positive Case", async function () {
        const res = await request
            .post("/v2/pet/88/uploadImage")
            .attach("file", fs.readFileSync(path.join(__dirname, "orait.png")), "orait.png");

        expect(res.status).to.equal(200);
        // expect(res.body).to.have.property("code", 200);
        // expect(res.body).to.have.property("type", "unknown");
        // expect(res.body).to.have.property("message").that.is.a("string");

        // console.log("Upload Response:", res.body);
    });

    it("Delete A Pets - Positive Case", async function () {
        const res = await request.delete("/v2/pet/99").send();
        expect(res.status).to.equal(200);
    });

    it("Delete A Pets - Negative Case", async function () {
        const res = await request.delete("/v2/pet/789").send();
        expect(res.status).to.equal(404);
    });

    // **Upload Image - Negative Case (Invalid Pet ID)**
    it("Upload Image - Negative Case (Invalid Pet ID)", async function () {
        const res = await request
            .post("/v2/pet/999999/uploadImage") // Pet ID yang tidak ada
            .attach("file", fs.readFileSync(path.join(__dirname, "test-image.png")), "test-image.png");

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message").that.includes("Pet not found");

        console.log("Upload Error Response:", res.body);
    });



});