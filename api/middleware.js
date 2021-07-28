
const notFound = (req, res, next) => { // eslint-disable-line
	res.status(404).json({
		message: 'Resource not found'
	})
}

const errorHandling = (err, req, res, next) => { // eslint-disable-line
	const status = err.status || 500
	res.status(status).json({
		message: err.message,
	})
}


module.exports = {
	notFound,
	errorHandling
}