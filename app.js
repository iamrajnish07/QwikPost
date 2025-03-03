const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get("/", async function(req,res){
    let post = await postModel.find().populate("user", "username");
    // let user = await userModel.find();
    res.render("dashboard", {post});
    // console.log(user);
});
app.get("/signin", function(req,res){
    res.render("index");
});
app.get("/login", function(req,res){
    res.render("login");
});
app.get("/profile", isLoggedIn, async function(req,res){
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", {user});
});
app.get("/like/:id", isLoggedIn, async function(req,res){
    let post = await postModel.findOne({_id: req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }

    await post.save();
    res.redirect("/profile");
});
app.get("/delete/:id", isLoggedIn, async function(req,res){
    let post = await postModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/profile");
});
app.post("/post", isLoggedIn, async function(req,res){
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;
    let post = await postModel.create({
        user: user._id,
        content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});
app.post("/register", async function(req,res){
    let {email, username, name, password} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registerd");
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
            let user = await userModel.create({
                username,
                name,
                email,
                password: hash
            })

            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.redirect("/login");
        })
    })
});
app.post("/login", async function(req,res){
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");
    bcrypt.compare(password, user.password, function(err, result){
        if(result) {
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.redirect("/login");
    })
});
app.get("/logout", function(req,res){
    res.cookie("token", "")
    res.redirect("/");
});
function isLoggedIn(req, res, next){
    if(req.cookies.token === "") res.redirect("/login");
    else{
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    }
}

app.listen(3000);