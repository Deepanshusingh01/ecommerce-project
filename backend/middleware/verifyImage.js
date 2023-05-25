
const isValidImage = (value, { req }) => {

    if(!req.files || !req.files.image){
        throw new Error('Image file is required')
    }
    const image = req.files.image;
    if(!image.mimetype.startsWith('image/')){
        throw new Error('Only Image files are allowed')
    }
    return value
}

module.exports = isValidImage