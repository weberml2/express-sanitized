/*!
 * express-sanitized
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var _ = require('underscore');
var sanitizer = require('sanitizer');

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
        var params = req.params || {};
        var body = req.body || {};
        var query = req.query || {};

        _.each(params, function(param){
            param = sanitizer.sanitize(param);
        });

        _.each(query, function(query){
            query = sanitizer.sanitize(query);
        });

        req.body = sanitizer.sanitize(body);

        next()
    }

}
