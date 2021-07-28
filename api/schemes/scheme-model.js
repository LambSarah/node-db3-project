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

    const [formattedScheme] = query;
    return {
      "scheme_id": formattedScheme.scheme_id,
      "scheme_name": formattedScheme.scheme_name,
      "steps": query[0].step_id ? query.map(obj => {
        return {
          "step_id": obj.step_id,
          "step_number": obj.step_number,
          "instructions": obj.instructions
        }
      })
        : []
    }
  }
  catch (err) {
    console.log(err)
  }
}


function findSteps(scheme_id) { // EXERCISE C

  return db('steps as st')
    .leftJoin('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
    .select('st.steps_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
    .where('st.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc')
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
