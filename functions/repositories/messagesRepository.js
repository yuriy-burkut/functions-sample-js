const {db} = require("../firebase");
const {chunks} = require("../utils/arrayUtils");

const deleteUserMessages = async (userId) => {
    const userMessages = (await db.collection('messages').where('userId', '==', userId)).docs;

    for (const chunk of chunks(userMessages, 500)) {
        const batch = db.batch();
        chunk.forEach((message) => {
            batch.delete(message);
        });
        await batch.commit();
    }
}

exports.deleteUserMessages = deleteUserMessages;