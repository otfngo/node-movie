const express = require('express')
const PORT = process.env.PORT || 8000
const _ = require('underscore')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const Movie = require('./models/movies')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/movies', {
    useMongoClient: true
})

let app = express()

// 设置视图根目录
app.set('views', './views/pages')
// 设置模板引擎
app.set('view engine', 'jade')

// 解析 POST 方法中的表单数据
app.use(bodyParser.urlencoded({extended: true}))
// 静态文件根目录
app.use(serveStatic('public'))

// 使用 Moment.js
app.locals.moment = require('moment')

app.listen(PORT)
console.log('Server is running at http://localhost:' + PORT + '/')

// 错误页
function miss(res, err) {
    res.render('miss', {
        title: '出现错误',
        err: err
    })
}

// 首页
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            miss(res, err)
            return
        }
        res.render('index', {
            title: '首页',
            movies: movies
        })
    })
})

// detail page 详情页
app.get('/movie/:id', function (req, res) {
    let id = req.params.id
    Movie.findById(id, function (err, movie) {
        if (err) {
            miss(res, err)
            return
        }
        res.render('detail', {
            title: movie.title,
            movie: movie
        })
    })
})

// admin update movie 后台更新页
app.get('/admin/update/:id', function (req, res) {
    let id = req.params.id
    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                miss(res, err)
                return
            }
            res.render('admin', {
                title: '后台更新页',
                movie: movie
            })
        })
    }
})

// admin page 后台录入页
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '后台录入页',
        movie: {
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
})

// admin post movie 后台录入提交
app.post('/admin/movie/new', function (req, res) {
    let id = req.body.movie._id
    let movieObj = req.body.movie
    let _movie
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                miss(res, err)
                return
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    miss(res, err)
                    return
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }
    else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function (err, movie) {
            if (err) {
                miss(res, err)
                return
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

// list page 列表页
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            miss(res, err)
            return
        }
        res.render('list', {
            title: '列表页',
            movies: movies
        })
    })
})

// list delete movie data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    let id = req.query.id
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                miss(res, err)
                return
            }
            res.json({success: 1})
        })
    }
})