import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getUsers = async (req, res) => {
 try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({_id: { $ne: loggedInUser }}).select("-password");
    res.status(200).json( filteredUsers );
 } catch (error) {
    console.error("error in getUsers", error.message);
    res.status(500).json({error: "internal server error"})
 }
};

export const getMessages = async ( req, res ) => {
    try {
        const {id : userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                { senderId:myId, receiverId:userToChatId },
                { senderId:userToChatId, receiverId:myId }
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.error("error in get messages", error.message);
        res.status(500).json({error: "internal server error"})
    }
};

export const sendMessage = async (req, res) => {
try {
    const { text , image } = req.body;
    const {id : receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
   if(image){
    const uploadResponse = await cloudinary.upload(image);
    imageUrl = uploadResponse.secure_url
   };

   const NewMessage = new Message ({
    senderId,
    receiverId,
    text,
    image: imageUrl
   });

   await NewMessage.save();

   // todo : realtime functionality goes here => socket.io

   res.status(201).json(NewMessage);
    
} catch (error) {
    console.error("error in get message", error.message);
    res.status(500).json({error: "internal server error"})
}
};