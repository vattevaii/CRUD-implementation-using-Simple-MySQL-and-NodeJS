const router = require('express').Router();
const path = require('path');
const { exit } = require('process');
const dbConn = require(path.join(__dirname, '../Routes/databaseConn'));
const { checkLogged } = require(path.join(__dirname, "../config/userAuth"));

// router.get('/', async(req, res) => {
//     let sql = 'SELECT * FROM persons';
//     let data = await dbConn.query(sql, (err, rows) => {
//         if (!!err) console.log(err);
//         res.render('home.ejs', {
//             "data": rows,
//             "name": "Ashish"
//         });
//     });
// });
router.get('/', async(req, res) => {
    res.redirect('/person');
});
router.post('/person', async(req, res) => {
    res.redirect('/person/' + req.body.id);
});
router.get('/person', async(req, res) => {
    let message = req.query.msg;
    // console.log(message);
    let sql = 'SELECT * FROM persons';
    let data = await dbConn.query(sql, (err, rows) => {
        if (!!err) console.log(err);
        res.render('home.ejs', { data: rows, name: message });
    });
});
router.get('/person/:id', async(req, res) => {
    // let sql = `SELECT * FROM persons WHERE id = ${req.params.id}`;
    // let data = await dbConn.query(sql, (err, rows) => {
    //     if (!!err) console.log(err);
    //     res.send(rows);
    // });
    res.redirect('/update/' + req.params.id);
});
router.get('/delete/:id', async(req, res) => {
    let sql = `DELETE FROM persons WHERE id = ${req.params.id}`;
    let data = await dbConn.query(sql, (err, rows) => {
        if (!!err) console.log(err);
        res.redirect('/person?msg=' + encodeURIComponent("Row Deleted !!"));
    });
});
router.get('/insert', async(req, res) => {
    res.render('insert.ejs', { message: "Insert Data" });
});
router.post('/insert', async(req, res) => {
    sql = `INSERT INTO persons VALUES ("${req.body.id}","${req.body.fName}","${req.body.lName}","${req.body.email}")`;
    data = await dbConn.query(sql, (err, rows) => {
        if (!!err) res.render('insert.ejs', { message: err.sqlMessage });
        let stringsth = encodeURIComponent("Data Inserted")
        res.redirect('/person?msg=' + stringsth);
    });
});
router.post('/update/:id', async(req, res) => {
    // console.log(req.body);
    let sql = 'UPDATE `persons` SET first_name="' + req.body.fName + '",\
     `last_name`="' + req.body.lName + '", email="' + req.body.email + '" WHERE id=' + req.params.id;
    // console.log(sql);
    let data = await dbConn.query(sql, (err, rows) => {
        if (!!err) res.redirect(`/update/${req.params.id}?msg=${encodeURIComponent(err.sqlMessage)}`);
        else {
            let stringsth = encodeURIComponent("Data Updated")
            res.redirect('/person?msg=' + stringsth);
        }
    });
});
router.get('/update/:id', async(req, res) => {
    let message = req.query.msg;
    let sql = `SELECT * FROM persons WHERE id=${req.params.id}`;
    let data = await dbConn.query(sql, (err, rows) => {
        if (!!err) console.log(err);
        // console.log(rows);
        res.render('update.ejs', { message: "Requested Data !!", msg: message, data: rows[0] }, );
    });
});
router.get('/noentry', async(req, res) => {
    res.send("No such entry found !!!");
})

module.exports = router;




// UPDATE employee SET `city`="Pokhara" WHERE name="Jonas";

// UPDATE works SET `salary`=salary*1.3
// WHERE works.company_name="NABIL Bank" AND works.employee_name=manages.employee_name