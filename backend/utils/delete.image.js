const fsPromise =  require('fs/promises')

const deleteImage = async (filePath) => {

    try{
    await fsPromise.unlink(filePath);
    return true
    } catch(err) {
        console.log('Error while deleting Image', err)
        return false
    }
    
}

module.exports = deleteImage