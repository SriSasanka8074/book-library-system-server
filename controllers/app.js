const fs = require('fs');
const _ = require('lodash');

exports.saveBookDetails = (req, res, next) => {
    const bookName = req.body.bookName;
    const bookDescription = req.body.bookDescription;
    const count = req.body.count;
    const author = req.body.author;
    const ismodify = req.body.ismodify;
    let id = req.body.id;

    let arr = [];
    const obj = {
        bookName,
        bookDescription,
        count,
        author,
        id
    }
    try {
        if (fs.existsSync('db/data.json')) {
            const arrTemp = JSON.parse(fs.readFileSync('db/data.json', 'utf8'));
            if (Number(ismodify) == Number(0)) {
                const currrId = arrTemp[arrTemp.length -1].id + 1;
                obj.id = currrId;
                arrTemp.push(obj);
            } else {
                const index = _.findIndex(arrTemp, function(o) {
                    return o.id == id;
                });
                const updateObj = arrTemp[index];
                updateObj.bookName = bookName;
                updateObj.bookDescription = bookDescription;
                updateObj.count = count;
                updateObj.author = author;
                arrTemp[index] = updateObj;
            }
            fs.writeFileSync('db/data.json', JSON.stringify(arrTemp));
            const data = JSON.parse(fs.readFileSync('db/data.json'));
            if (data) {
                if (Number(ismodify) == Number(0)) {
                    res.status(201).send(true);
                }
                res.status(200).send(true);
            } else {
                res.status(404).send(false);
            }
        } else {
            obj.id = 1;
            arr.push(obj);
            fs.writeFileSync('db/data.json', JSON.stringify(arr));
            const data = JSON.parse(fs.readFileSync('db/data.json'));
            if (data) {
                res.status(201).send(true);
            } else {
                res.status(404).send(false);
            }
        }
    } catch(err) {
        if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
    }
}

exports.getBookDetails = (req, res, next) => {
    try {
        if (fs.existsSync('db/data.json')) {
            const arr = JSON.parse(fs.readFileSync('db/data.json', 'utf8'));
            if (arr) {
                res.status(200).send(arr);
            } else {
                res.status(404).send(null);
            }
        } else {
            res.status(404).send(null);
        }
    } catch(err) {
        if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
    }
}

exports.getBookDetailsById = (req, res, next) => {
    const id = req.body.id;
    try {
        if (fs.existsSync('db/data.json')) {
            const arr = JSON.parse(fs.readFileSync('db/data.json', 'utf8'));
            if (arr) {
                const index = _.findIndex(arr, function (o) {return o.id == id;});
                const data = arr[index];
                res.status(200).send(data);
            } else {
                res.status(404).send(null);
            }
        } else {
            res.status(404).send(null);
        }
    } catch(err) {
        if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
    }
}
