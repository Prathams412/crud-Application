const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.set('view engine','ejs');
app.set('views','./src/views');
app.use(express.static('./assets'));
app.use(express.json());

app.use(fileUpload({
    useTempFiles:true,
    preserveExtension:true,
    parseNested:true,
}))

module.exports = {app};