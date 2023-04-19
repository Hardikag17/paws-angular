const breedLabels = require("../dataset/breed_labels.json");
const stateLabels = require("../dataset/state_labels.json");

const getBreeds = async (req, res) => {
  let Breeds = [];
  breedLabels.forEach((el) => {
    Breeds.push({ label: el.BreedName, value: el.BreedID });
  });
  res.send({ options: Breeds });
};

const getStates = async (req, res) => {
  let states = [];
  stateLabels.forEach((el) => {
    states.push({ label: el.StateName, value: el.StateID });
  });
  res.send({ options: states });
};

module.exports = { getBreeds, getStates };
