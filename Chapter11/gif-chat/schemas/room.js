const mongoose = require('mongoose');

const {Schema} = mongoose;
const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    max: {
        type: Number,
        required: true,
        default: 10,
        min: 2,
    },
    owner: {
        type: String,
        require: true,
    },
    password: String,
    createdAt: {
        type :Date,
        default: Date.now,
    },
});

// 방 제목, 최대 수용인워, 방장, 비밀번호, 생성시간, 등을 받는다
module.exports = mongoose.model('Room', roomSchema);