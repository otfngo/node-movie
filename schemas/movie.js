const mongoose = require('mongoose')

// Movie 的结构概要（模式）
var MovieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    director: String,
    country: String,
    language: String,
    year: Number,
    summary: String,
    flash: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// movieSchema.pre 表示每次存储数据之前都先调用这个方法
MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

// movieSchema 模式的静态方法
MovieSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = MovieSchema
