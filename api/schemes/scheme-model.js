const db = require('../../data/db-config')



function find() { // EXERCISE A

  return db('schemes as sc')
    .leftJoin('steps as st', 'st.scheme_id', 'sc.scheme_id')
    .select('sc.*')
    .count('st.step_id', { as: 'number_of_steps' })
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id', 'asc');
}

const findById = async (scheme_id) => { // EXERCISE B

  try {
    const query = await db('schemes as s')
      .leftJoin('steps as st', 's.scheme_id', 'st.scheme_id')
      .where('s.scheme_id', scheme_id)
      .orderBy('st.step_number', 'asc')

    console.log(query[0])

    let formattedScheme = []

    formattedScheme = {
      scheme_id: query[0].scheme_id,
      scheme_name: query[0].scheme_name,
      "steps": query[0].step_id ? query.map(step => {
        return {
          step_number: step.step_number,
          step_id: step.step_id,
          instructions: step.instructions
        }
      }) : []
    }
    return formattedScheme;
  }
  catch (err) {
    console.log(err)
  }
}


const findSteps = async scheme_id => {

  const steps = await db('steps as st')
    .leftJoin('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
    .where('st.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc')

  return steps

}
async function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
  const { scheme_name } = scheme
  const [id] = await db("schemes").insert({ "scheme_name": scheme_name })
  return db('schemes').where({ "scheme_id": id }).first()
}

async function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
  const { step_number, instructions } = step;
  await db('steps').insert({ "scheme_id": scheme_id, "step_number": step_number, "instructions": instructions })
  return db('steps').orderBy('steps.step_number').where({ 'scheme_id': scheme_id })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
