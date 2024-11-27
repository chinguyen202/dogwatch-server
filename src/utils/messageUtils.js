const groupMessages = (messages, loginUserId) => {
  return messages.reduce((acc, message) => {
    const { roomId, sender, receiver } = message;
    // Define the other user in the chat
    const otherUser = sender.uuid === loginUserId ? receiver : sender;
    const otherUserName = `${otherUser.firstName}${otherUser.lastName}`;
    //If the roomID doesn't exist
    if (!acc[otherUserName]) {
      acc[otherUserName] = [];
    }
    // Add the message to the roomID
    acc[otherUserName].push(message);
    // return the grouped messages
    return acc;
  }, {});
};

module.exports = { groupMessages };
