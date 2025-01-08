import ChatModel from "../model/chat.js";

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("send_message", async (data) => {
      const { senderId, receiverId, content } = data;

      let chat = await ChatModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!chat) {
        chat = new ChatModel({
          participants: [senderId, receiverId],
          messages: [],
        });
      }

      const message = { sender: senderId, content };
      chat.messages.push(message);

      await chat.save();

      const room = `${senderId}_${receiverId}`;
      io.to(room).emit("receive_message", message);
    });
    
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
