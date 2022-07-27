//jshint esversion:6
const items = ["Buy food", "Cook food", "Eat food"];  //数组也可以使用const声明，在const状态下 数组不能变更为新数组 但是可以新增数组
const workItems = [];
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs"); //必须写在这个位置不能往前写
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //导入css文件

app.get("/", function (req, res) {
    const day = date.getDate();
    // const day = date.getDay();
    res.render("list", { listTitle: day, newListItems: items }); //list对应ejs文件的名字

});
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
})
app.get("/about", function (req, res) {
    res.render("about");
})
app.post("/", function (req, res) {
    const item = req.body.newItem;
    // console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});