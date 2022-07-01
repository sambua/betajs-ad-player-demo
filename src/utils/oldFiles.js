const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const deleteOldFiles = (dir, age = 36000) => {
    fs.readdir(dir, function(err, files) {
        files.forEach(function(file, index) {
            fs.stat(path.join(dir, file), function(err, stat) {
                var endTime, now;
                if (err) {
                    return console.error(err);
                }
                now = new Date().getTime();
                endTime = new Date(stat.ctime).getTime() + age;
                if (now > endTime) {
                    return rimraf(path.join(dir, file), function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log('successfully deleted');
                    });
                }
            });
        });
    });
}

module.exports = {
    deleteOldFiles
}
