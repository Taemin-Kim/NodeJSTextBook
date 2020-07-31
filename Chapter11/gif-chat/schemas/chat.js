const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: { ObjectId }} = Schema;
const chatSchema = new Schema({
    room:{
        type: ObjectId,
        required: true,
        ref: 'Room',
    },
    user:{
        type: String,
        required: true,
    },
    chat: String,
    gif: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Chat', chatSchema);

// 채팅방 아이디, 채팅 내역, GIF 이미지 주소,  채팅 시간등을 저장