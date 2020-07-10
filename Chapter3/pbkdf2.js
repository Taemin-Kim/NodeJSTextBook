const crypto = require('crypto');

crypto.randomBytes(64, function(err, buf) {
    const salt = buf.toString('base64');
    console.log('salt : ', salt);
    crypto.pbkdf2('password', salt, 10000, 64, 'sha512', (error,key)=>{
        console.log('password:', key.toString('base64'));
    })
})