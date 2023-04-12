const Pet = require("../../models/schemas/petSchema");
const axios = require("axios");
const { Social } = require("../../models/schemas/socialSchema");

describe("Getting Pets List", () => {
  it("Should check if the pets returned are in json format", async () => {
    const res = await axios.get("http://localhost:9000/pets");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/); // Verify that the content-type header is JSON
    expect(res).toEqual(expect.any(Object));
  }, 30000);
}, 30000);

describe("Getting Social Details", () => {
  it("Should check if the social schema contains the autor details", async () => {
    let petId = "34af29aab";
    const res = await axios.get(
      `http://localhost:9000/social/${petId}/getSocial`
    );
    expect(res.status).toBe(200);
    expect(typeof res.data[0].author.name).toBe("string");
  });
});

describe("Adding Social Data", () => {
  it("Should check if the social data is added to the schema ", async () => {
    let petId = "3c90f3f54";
    const SocialData = {
      PetID: "3c90f3f54",
      author: "g90bm3wzlftdl2qd",
      comment: "Adorable",
      likes: "g90bm3wzlftdl2qd",
    };
    const res = await axios.post(
      `http://localhost:9000/social/${petId}/social`,
      { SocialData }
    );
    expect(res.status).toBe(200);
  });
});
