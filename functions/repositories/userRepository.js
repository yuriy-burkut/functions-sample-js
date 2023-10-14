const {db} = require("../firebase");

/**
 * Returns users by given email
 * @param {String} email
 * @returns {Promise<Array<QueryDocumentSnapshot<T>>|Array<FirebaseFirestore.QueryDocumentSnapshot<T>>>}
 */
const findByEmail = async (email) => {
    return (await db.collection('users').where('email', '==', email).get()).docs;
}

/**
 * Creates new user
 * @param {String} firstNAme
 * @param {String} lastName
 * @param {String} email
 * @returns {Promise<*>}
 */
const create = async (firstNAme, lastName, email) => {
    return db.collection('users').add({
        firstNAme: firstNAme,
        lastName: lastName,
        email: email
    });
}

exports.findByEmail = findByEmail;
exports.create = create;