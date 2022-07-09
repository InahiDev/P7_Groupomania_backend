const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

passwordSchema
.is().min(4)
.is().max(32)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()

module.exports = passwordSchema