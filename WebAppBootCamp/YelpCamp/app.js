var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mothodeOveride  = require("method-override"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStratergy  = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    user            = require("./models/user"),
    seedDB          = require("./seeds")

var commentRoutes        = require("./routes/comments"),
    campgroundRoutes     = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index")

// seedDB(); //seed the database
mongoose.connect("mongodb://localhost:27017/yelp_camp",  {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(mothodeOveride("_method"));
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("The YelpCamp server has started");
});