const fs = require("fs");
const path = require("path");
const express = require("express");
// const findRemoveSync = require('find-remove');
const { deleteOldFiles } = require("../utils/oldFiles");

module.exports = (data, io, clinetID) => {
    const router = express.Router();
    const root = path.join(__dirname + "/../");
    const vastFolder = root + "/public/vast";
    const vastTemplatesFolder = root + "/vast-templates";
    const id = io.socket;

    /* GET home page. */
    router.get("/", function(req, res, next) {


        // Will delete all files, based a provided period; default is 36000 seconds
        deleteOldFiles(vastFolder);

        // fs.readdir(vastFolder, (err, files) => {
        //     if (err) throw err;
        //
        //     for (const file of files) {
        //         console.log(file + ' : File Deleted Successfully.');
        //         fs.unlinkSync(`${vastFolder}/${file}`);
        //     }
        // });

        // findRemoveSync(vastFolder, { age: { seconds: 3600 }});

        res.render("index", {
            id: clinetID,
            data,
            title: "Beta JS Player Ad demo",
        });
    });

    router.post("/custom-vast", function(req, res, next) {
        res.json({ success: true }).status(200);
    });

    router.post("/vast-generator", function(req, res, next) {

        const { exampleName } = req.body;
        // const newName = 'vast-' + Date.now();
        const templateName = exampleName || 'v3_non_linear';
        fs.readFile(path.resolve(`${vastTemplatesFolder}/${templateName}.txt`), 'utf-8', function(err, data) {
            if (err) throw err;

            const newValue = data.replace(/\{\{url\}\}/gim, '//' + req.get("host") || req.get('origin'));

            try {
                fs.writeFile(path.resolve(`${vastFolder}/${exampleName}.xml`),
                    newValue, 'utf-8', function(err, data) {
                        if (err) throw err;
                        res.json({
                            url: `/public/vast/${exampleName}.xml`,
                            data: newValue ? newValue : '',
                            errors: []
                        }).status(200);
                    });
            } catch (e) {
                res.json({ errors: [{
                    message: 'Could not be able generate a new template'
                }] }).status(500);
            }
        });

    });

    router.get("/vast/:template_name", function(req, res, next) {
        res.render("index", {
            title: "Beta JS Player Ad demo",
            data
        });
    });

    router.get("/ad/:type", function(req, res, next) {
        const {params: { type }} = req;
        io.sockets.emit("tracking", { log: `Tracking type: ${type}. Endpoint: ${req.url}`});
        return res.sendStatus(200);
    });

    return router;
};
