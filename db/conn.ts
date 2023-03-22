import mongoose from "mongoose";


async function main() {
    await mongoose.connect('mongodb://localhost:27017/eating')
    console.log('CONNECT WITH MONGOOSE')
}


main().catch((err) => { console.log(err) })



export default mongoose
