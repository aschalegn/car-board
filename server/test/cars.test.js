const chai = require('chai'),
    chai_http = require('chai-http');

const should = chai.should();
chai.use(chai_http);

describe("The cars Api testing", () => {
    const baseUrl = "http://127.0.0.1:2000";
    // Test The get Api
    describe("GET /cars", () => {
        it("return paginated <= 15 result without filter and the length of of the results", (done) => {
            chai.request(baseUrl)
                .get("/cars")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object");
                    res.body.should.have.property("pages").and.to.be.a("number");
                    res.body.should.have.property("cars").and.to.be.a("array").and.to.have.length(15);
                    done();
                });
        });
    });

    //Test Pagination
    describe("GET /cars/:page", () => {
        it("return paginated <= 15 result without filter and the length of of the results", (done) => {
            chai.request(baseUrl)
                .get("/cars")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object");
                    res.body.should.have.property("pages").and.to.be.a("number");
                    res.body.should.have.property("cars").and.to.be.a("array").and.to.have.length(15);
                    done();
                });
        });
    });
});