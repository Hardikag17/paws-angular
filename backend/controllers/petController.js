const { Pet } = require("../models/schemas/petSchema");
const { Requests } = require("../models/schemas/requestsSchema");
const { Social } = require("../models/schemas/socialSchema");
const { search } = require("../utils/search");

/**
 * Get all Pets along with their socials OR Get specific pet along with their social, includes filterOptions in request
 * @param search: string
 * @param filterOptions: FilterOptions
 * FilterOptions - [minAge, maxAge, gender, health, breed]
 */
const getPets = async (req, res) => {
  let searchText = req.query.searchText;
  let filterOptions = {
    minAge: 1,
    maxAge: 100,
    gender: null,
    health: null,
    breed: null,
    point: { lat: null, long: null },
  };

  if (req.query.minAge) {
    try {
      let age;
      age = parseInt(req.query.minAge);
      if (Number(age)) filterOptions.minAge = age;
    } catch (err) {
      console.log(err);
    }
  }
  if (req.query.maxAge) {
    try {
      let age;
      age = parseInt(req.query.maxAge);
      if (Number(age)) filterOptions.maxAge = age;
    } catch (err) {
      console.log(err);
    }
  }
  if (req.query.gender) {
    let gender;
    gender = parseInt(req.query.gender);
    filterOptions.gender = gender;
  }
  if (req.query.health) {
    let health;
    health = parseInt(req.query.health);
    filterOptions.health = health;
  }
  if (req.query.breed) {
    let breed;
    breed = parseInt(req.query.breed);
    filterOptions.breed = breed;
  }

  if (req.query.latitude && req.query.longitude) {
    filterOptions.point.lat = req.query.latitude;
    filterOptions.point.long = req.query.longitude;
  }

  let response;

  // Pagination
  let limit = parseInt(req.query.limit);
  if (!limit) {
    limit = 12;
  }

  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }

  if (searchText && searchText.trim() !== "") {
    response = await search(searchText, filterOptions, page, limit);
  } else {
    response = await search("", filterOptions, page, limit);
  }

  return res.status(200).json({
    response: response,
  });
};

const getNearPets = async (req, res) => {
  const userlocation = {
    type: "Point",
    coordinates: [
      parseFloat(req.query.latitude),
      parseFloat(req.query.longitude),
    ],
  };

  try {
    const result = await Pet.aggregate([
      {
        $geoNear: {
          near: userlocation,
          distanceField: "distance",
          maxDistance: 10000,
          spherical: true,
        },
      },
      {
        $sort: {
          distance: 1,
        },
      },
    ]);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
};

// Add Pet
const addPet = async (req, res) => {
  const newPet = new Pet(req.body.Pet);

  try {
    await newPet.save();
    res.status(200).send({ status: 200, message: "Pet Successfully added" });
  } catch (err) {
    res.status(400).send({ status: 400, message: err });
  }
};

const getPetsByUserID = async (req, res) => {
  let UserID = req.params.UserID;

  try {
    let response = await Pet.find({ RescuerID: UserID });
    res.status(200).send({
      status: "success",
      message: "Pets added by Users",
      response: response,
    });
  } catch (err) {}
};

const getPetByPetID = async (req, res) => {
  let PetID = req.params.PetID;
  try {
    let response = await Pet.find({ PetID: PetID }).populate({
      path: "social",
      populate: {
        path: "author",
      },
    });
    res.status(200).send({
      status: "success",
      message: `Pets for ${PetID} PetID`,
      response: response[0],
    });
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

// Update Pet
const updatePet = async (req, res) => {};

// Delete Pet
const deletePet = async (req, res) => {};

// Request pet for Adoption
const requestPet = async (req, res) => {
  // key-value pairs (userID- Requested. PetID)
  // A user can request for only one pet at a time, user has to retrive his request to make new request

  const PetID = req.body.PetID;
  const UserID = req.body.UserID;

  try {
    let response = await Requests.find({
      PetID: PetID,
      Requests: { $in: [UserID] },
    });

    // User has already requested for the same pet
    if (response.length > 0)
      res.status(200).send({
        status: "success",
        message: "User already requested",
        response: PetID,
      });
    else {
      try {
        let response = await Requests.find({
          Requests: { $elemMatch: { $eq: UserID } },
        });

        if (response.length > 0 && response[0].Requests.length > 0) {
          // User has already requested somewhere else
          res.status(200).send({
            status: "success",
            message: "User has already requested in the below PetID",
            response: response[0].PetID,
          });
        } else {
          try {
            let response = await Requests.find({ PetID: PetID });
            if (response.length == 0) {
              const newRequest = new Requests({
                PetID: PetID,
                Requests: [],
              });
              response = await newRequest.save();
            }

            await Requests.updateOne(
              { PetID: PetID },
              { $push: { Requests: UserID } }
            );

            res.status(200).send({
              status: "success",
              message: "UserID successfully pushed",
            });
          } catch (err) {
            res.status(400).send({ status: "failed", message: err });
          }
        }
      } catch (err) {
        res.status(400).send({ status: "failed", message: err });
      }
    }
  } catch (err) {
    res.status(400).send({ status: "failed", message: err });
  }
};

const deleteRequest = async (req, res) => {
  // Delete user's previous request to make the new request
  const UserID = req.body.UserID;
  try {
    // Get the user's requested response
    let response = await Requests.find({
      Requests: { $elemMatch: { $eq: UserID } },
    });

    if (response && response[0].Requests.length > 0) {
      let PetID = response[0].PetID;
      try {
        let response = await Requests.updateOne(
          { PetID: PetID },
          { $pullAll: { Requests: [UserID] } }
        );

        res.status(200).send({
          status: "success",
          message: "UserID successfully pulled",
        });
      } catch (err) {
        res.status(400).send({ status: "failed", error: err });
      }
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

//Adopt pet
const adoptPet = async (req, res) => {
  // Rescuer can only call this fxn and approve user's request & making pet status true in petSchema and RequestSchema

  const PetID = req.body.PetID;
  const UserID = req.body.UserID;
  const RescuerID = req.body.RescuerID;

  // Check the Person calling this route is Rescuer

  try {
    let response = await Pet.find({ PetID: PetID });

    if (response && response[0].RescuerID == RescuerID && !response[0].Status) {
      // Check PetID and UserID in RequestSchema documents
      try {
        let response = await Requests.find({
          PetID: PetID,
          Requests: { $in: [UserID] },
        });

        if (response && response[0].Requests.length > 0) {
          // Change Adopt status to true
          await Requests.findOneAndUpdate({ PetID: PetID }, { Status: true });
          await Pet.findOneAndUpdate(
            { PetID: PetID },
            { Status: true, AdopterID: UserID }
          );

          res.status(200).send({
            status: "success",
            message: `${PetID} Pet is adopted by ${UserID} user`,
          });
        }
      } catch (err) {
        res.status(400).send({ status: "failed", message: err });
      }
    } else {
      // Something went wrong, Pet cannot be adopted
      res
        .status(200)
        .send({ status: "failed", message: "Pet cannot be adopted" });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", message: err });
  }
};

const getRequestByUserID = async (req, res) => {
  // Can be only one
  const UserID = req.params.UserID;

  try {
    let response = await Requests.find({
      Requests: { $elemMatch: { $in: UserID } },
    });

    if (response && response[0].PetID) {
      res.status(200).send({ status: "success", PetID: response[0].PetID });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

const getRequestsByPetID = async (req, res) => {
  const PetID = req.params.PetID;

  try {
    let response = await Requests.find({
      PetID: PetID,
    });

    if (response) {
      res.status(200).send({ status: "success", Pet: response[0] });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

const getRequestsByRescuerID = async (req, res) => {
  const RescuerID = req.params.RescuerID;
  var requests = [];

  try {
    let response = await Pet.find({ RescuerID: RescuerID });

    if (response && response.length > 0) {
      for (var i = 0; i < response.length; i++) {
        let Pet = response[i];
        Requests.find({ PetID: response[i].PetID }).then((req) => {
          requests.push({ Pet: Pet, requests: req });
          if (requests.length == response.length) {
            res.status(200).send({ status: "success", Requests: requests });
          }
        });
      }
    } else {
      res
        .status(200)
        .send({ status: "success", Requests: "No requests found" });
    }
  } catch (err) {
    res.status(400).send({ status: "failed", error: err });
  }
};

const getRecentAdded = async (req, res) => {
  try {
    const getPets = await Pet.find({}).sort({ updatedAt: -1 }).limit(3);
    res.send(getPets.slice(-3));
  } catch (err) {
    console.log(err);
  }
};

const getRecentUpdated = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ timpestamp: -1 }).limit(3);
    res.send(pets);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getmostpopular = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ "social.length": -1 }).limit(3);
    res.send(pets);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getPets,
  addPet,
  updatePet,
  deletePet,
  getNearPets,
  getPetByPetID,
  getPetsByUserID,
  requestPet,
  deleteRequest,
  getRequestsByPetID,
  getRequestByUserID,
  getRequestsByRescuerID,
  adoptPet,
  getRecentUpdated,
  getRecentAdded,
  getmostpopular,
};
