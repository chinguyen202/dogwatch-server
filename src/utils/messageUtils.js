const groupMessages = (messages, loginUserId) => {
  const messagesByUser = {};

  messages.forEach((message) => {
    const { sender, receiver } = message;
    const partner = sender.uuid === loginUserId ? receiver : sender;
    const partnerName = `${partner.firstName} ${partner.lastName}`;
    const partnerId = partner.uuid;
    const partnerAvatar = partner.avatar;

    if (!messagesByUser[partnerId]) {
      messagesByUser[partnerId] = {
        partnerId,
        partnerName,
        partnerAvatar,
        messages: [],
      };
    }

    messagesByUser[partnerId].messages.push({
      uuid: message.uuid,
      content: message.content,
      senderId: message.senderId,
      receiverId: message.receiverId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    });
  });

  // Sorted the messages by create at date
  Object.values(messagesByUser).forEach((userMessages) => {
    userMessages.messages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  });

  // Convert object to array and return
  const result = Object.values(messagesByUser);
  return result;
};

module.exports = { groupMessages };
