exports.dbConect = {
    host     : 'localhost',
    database : 'soteriasoft',
    user     : 'ivan',
    password : 'ivanluis',
    connectTimeout  : 60000
}

var url = "http://localhost"
var webPort = 3000
exports.empresa = 'SoteriaSoft Open Source'
exports.webPort = webPort

exports.httpMsgsFormat = "HTML"

// git config --global credential.helper wincred
// git config --global user.email "ivanvalmorbida@gmail.com"
// git config --global user.name "ivanvalmorbida"
// git clone https://github.com/ivanvalmorbida/soteriasoft.git

// https://git-scm.com/download
// git remote add origin https://github.com/ivanvalmorbida/soteriasoft.git

// sudo mysql -u root -pi -h localhost soteriasoft < soteriasoft.sql