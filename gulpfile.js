const Q=12;

var gulp = require("gulp");
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

var questions = function(){
  return range(1, Q);
};

var range = function(start, end){
  var i = start;
  var product = [];
  while(i <= end){
    product.push(i);
    i = i +1;
  }
  return product;
};

var toFile = function(index){
  index = format(index);
  return {
    name: index + ".js",
    get src(){
      return "src/js/" + this.name;
    },
    get distDir(){
      return "public/test";
    }
  };
};

var format = function(i){
  if(i < 10){
    return "0" + i;
  }
  return i + "";
};

var buildjs = function(file){
  console.log("build " + file.src);
  return browserify({
    entries: [file.src],
    transform: ["debowerify"]
  })
    .bundle()
    .pipe(source(file.name))
    .pipe(gulp.dest(file.distDir));
};

var buildHTML = function(template, data, 
                         dist, filename){
  return gulp.src(template).
    pipe(ejs(data)).
    pipe(rename(filename)).
    pipe(gulp.dest(dist));
};

gulp.task("copy", ["copyjs", "copycss"]);

gulp.task("copycss", function(){
  var files = ["src/js/components/mocha/mocha.css"];
  return gulp.src(files).pipe(gulp.dest("public/css"));
});

gulp.task("copyjs", function(){
  var files = ["src/js/components/mocha/mocha.js"];
  return gulp.src(files).pipe(gulp.dest("public/js"));
});

gulp.task("build-each-html", function(){
  var src = "src/html/test.html";
  var dist = "public";
  
  questions().forEach(function(i){
    i = format(i);
    return buildHTML(src, {number: i}, 
                     dist, i + ".html");
  });
});

gulp.task("build-index.html", function(){
  var src = "src/html/index.html";
  var dist = "public";
  var filename = "index.html";

  return buildHTML(src, {
    questions: questions().map(format)
  }, dist, filename);
});

gulp.task("buildhtml", ["build-each-html", "build-index.html"]);

gulp.task("buildjs", function(){
  questions().map(toFile).forEach(buildjs);
});

gulp.task("build", ["copy", "buildjs", "buildhtml"]);

gulp.task("serve",  function(){
  var connect = require('gulp-connect');
  connect.server({
    root: "public",
    livereload: false
  });
});

gulp.task("default", ["buildjs"]);
