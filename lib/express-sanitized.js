/*!
 * express-sanitized
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var sanitizer = require('sanitizer');
_ = require('underscore');


/**
 * Simple middleware that wraps sanitzer and can be exposed
 * at the app.use router layer and apply to all methods.
 * This is best used for APIs where it is very unlikely
 * you would need to pass back and forth html entities
 *
 * @return {Function}
 * @api public
 *
 */
module.exports = function expressSanitized() {

    return function expressSanitized(req, res, next) {

        [req.body, req.query].forEach(function (val, ipar, request) {
            if (_.size(val)) {
               _.each(val, function (val, ichild) {
                    if(val && _.isString(val)){
                        var sanitized = sanitizer.sanitize(val);
                        request[ipar][ichild] = sanitized;
                    }
                });
            }
        });

        next();
    }

}