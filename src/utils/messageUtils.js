const groupMessages = (messages, loginUserId) => {
  console.log(`USER ID IS ${loginUserId}`);
  return messages.reduce((acc, message) => {
    const { roomId, sender, receiver } = message;
    // Define the other user in the chat
    const otherUser = sender.uuid === loginUserId ? receiver : sender;
    const otherUserName = `${otherUser.firstName} ${otherUser.lastName}`;
    //If the roomID doesn't exist
    if (!acc[roomId]) {
      acc[roomId] = {
        user: otherUserName,
        messages: [],
      };
    }
    // Add the message to the roomID
    acc[roomId].messages.push(message);
    // return the grouped messages
    return acc;
  }, {});
};

module.exports = { groupMessages };
