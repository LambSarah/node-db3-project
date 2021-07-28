const Schemes = require('./scheme-model')


const checkSchemeId = async (req, res, next) => {
  const id = req.params.scheme_id;
  const scheme = await Schemes.findById(id);
  if (!scheme) {
    res.status(404).json({ message: `scheme with scheme_id ${id} not found` });
  } else {
    next();
  }
};


/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    let scheme_name = req.body.scheme_name
    console.log(scheme_name)
    if (!scheme_name || typeof scheme_name !== 'string' || scheme_name === undefined) {

      next({
        message: 'invalid scheme name',
        status: 400
      })
    } else {
      res.scheme_name = scheme_name
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
  }*/

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

