const getHome = async (req, res) => {
    try {
        res.status(200).json({ message: 'Hello from home page!' });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    getHome
};
