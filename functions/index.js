require('./firebase');

const userController = require("./controllers/user_controller");

exports.onUserCreated = userController.onUserCreated;
exports.onUserUpdated = userController.onUserUpdated;
exports.onUserDeleted = userController.onUserDeleted;
exports.createUser = userController.createUser;
