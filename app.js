var express = require("express"),
        app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   flash    = require("connect-flash"),
   passport = require("passport"),
 LocalStrategy = require("passport-local"),  
 methodOverride = require("method-override"),
 Campground = require("./models/campground"), 
       User = require("./models/user"), 
    Comment = require("./models/comment"),
     seedDB = require("./seeds")

//requring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes   = require("./routes/index")


//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://Yinan:stone6061@ds147411.mlab.com:47411/yelpcampre");
process.env.databaseURL

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started!");
});