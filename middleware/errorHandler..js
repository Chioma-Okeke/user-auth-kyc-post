const err = (error, res) => {
    const status = error.status || 500;
    console.error(error)
    return res.status(status).json({success: false, status})
}

module.exports = err