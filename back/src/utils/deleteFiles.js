const cloudinary = require("cloudinary").v2

const deleteFiles = (url) => {

    const imgSplited = url.split("/")

    const folderName = imgSplited.at(-2)
    const fileName = imgSplited.at(-1).split(".")[0]

    cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {

    })
}

module.exports = { deleteFiles }