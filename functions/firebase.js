// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getFunctions} = require("firebase-admin/functions");
const {getAuth} = require("firebase-admin/auth");
const {getStorage} = require("firebase-admin/storage");
const {logger} = require("firebase-functions");


initializeApp();

exports.functions = getFunctions();
exports.auth = getAuth();
exports.db = getFirestore();
exports.storage = getStorage();
exports.logger = logger;