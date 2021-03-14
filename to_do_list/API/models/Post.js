const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        title: String,
        content: String,
        date: String
    }
);

module.exports = mongoose.model('Posts', PostSchema);

