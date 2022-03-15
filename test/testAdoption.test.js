const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedAdopter;

  before(async () => {
    adoption = await Adoption.deployed();
  });

  describe("adopting a pet and retrieving account addresses", async () => {
    before("adopt a pet using accounts[1]", async () => {
      await adoption.adopt(8, { from: accounts[1] });
      expectedAdopter = accounts[1];
    });

    it("can fetch the address of an owner by pet id", async () => {
      const adopter = await adoption.adopters(8);
      assert.equal(
        adopter,
        expectedAdopter,
        "The owner of the adopted pet should be the second account."
      );
    });

    it("can fetch the collection of all pet owners' addresses", async () => {
      const adopters = await adoption.getAdopters();
      assert.equal(
        adopters[8],
        expectedAdopter,
        "The owner of the adopted pet should be in the collection"
      );
    });
  });
});
