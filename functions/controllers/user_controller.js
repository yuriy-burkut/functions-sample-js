const {onDocumentDeleted, onDocumentUpdated, onDocumentCreated} = require("firebase-functions/v2/firestore");
const messagesRepository = require("../repositories/messagesRepository");
const userRepository = require("../repositories/userRepository");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("../firebase");

exports.onUserCreated = onDocumentCreated('users/{userId}', (event) => {
    logger.log('User created', event.data);
});

/**
 * onDocument update function example
 */
exports.onUserUpdated = onDocumentUpdated('users/{userId}', (event) => {
    logger.log(`User updated from: ${JSON.stringify(event.data.before.data())} to ${JSON.stringify(event.data.after.data())}`);
});

/**
 * onDocument delete function example
 */
exports.onUserDeleted = onDocumentDeleted('users/{userId}', async (event) => {
    await messagesRepository.deleteUserMessages(event.id);
    console.log(`User deleted ${JSON.stringify(event.data)}`)
});

/**
 * Callable function. Invoked when you call regular function from Flutter side
 * Yoy can take token and email from context
 * @type {HttpsFunction & import("./cloud-functions").Runnable<any>}
 */
exports.createUser = onCall(async (request) => {

    const {firstName, lastName, email} = request.data;
    const auth = request.auth;

    // Todo(Verify token here)
    if (!auth || !auth.token) {
        throw new HttpsError('permission-denied', 'Only for authorised users');
    }

    if (!firstName || !lastName || !email) {
        throw new HttpsError('invalid-argument', 'Data for user creation are missing or invalid');
    }

    const existingUsers = await userRepository.findByEmail(email);

    if (existingUsers.length) {
        throw new HttpsError('already-exists', 'user by given email already exist');
    } else {
        await userRepository.create(firstName, lastName, email);
    }
});

