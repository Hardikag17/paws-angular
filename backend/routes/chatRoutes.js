const express = require("express");
const routes = express.Router();

const { getRoom } = require("../controllers/chat/getRoom");
const { getChats } = require("../controllers/chat/getChats");
const { addChatList, getChatList } = require("../controllers/chat/chatList");

const auth = require("../middleware/auth");

routes.post("/room", auth, getRoom);
routes.post("/texts", auth, getChats);
routes.post("/chatlist/add", auth, addChatList);
routes.get("/chatlist/:UserId", auth, getChatList);

module.exports = routes;
