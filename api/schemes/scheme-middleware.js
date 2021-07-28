const Schemes = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.param;
    const scheme = await Schemes.findById(scheme_id)
    if (scheme) {
      req.scheme = scheme
      next()
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.param.scheme_id} not found`
      })
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    const body = req.body
    if (!body.scheme_name) {
      next({
        status: 400, message: 'invalid scheme name'
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  try {
    const steps = req.body
    if (!steps.instructions
      || typeof steps.instructions !== 'string'
      || steps.instructions === undefined
      || isNaN(steps.step_number)
      || steps.step_number < 1) {
      next({ status: 400, message: "invalid step" })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
