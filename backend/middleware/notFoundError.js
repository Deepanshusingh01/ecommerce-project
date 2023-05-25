const routeNotFound = (req, res, next) => {
    return res.json({ error: 'Route not Found'})
}

module.exports = routeNotFound