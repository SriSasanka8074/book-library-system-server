const fs = require('fs');

exports.saveBookDetails = (req, res, next) => {
    console.log(req.body);
    const bookName = req.body.bookName;
    const bookDescription = req.body.bookDescription;
    const count = req.body.count;
    const author = req.body.author;

    let arr = [];
    const obj = {
        bookName,
        bookDescription,
        count,
        author
    }
    console.log(fs.existsSync('/db/data.json'));

    if (fs.existsSync('/db/data.json')) {} else {
        arr.push(obj);
        fs.writeFileSync('/db/data.json', arr);
    }
}

exports.getBookDetails = (req, res, next) => {

}
