<<<<<<< HEAD
//course purchase model 
=======

>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
import mongoose from "mongoose";
const coursePurchaseSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'completed', 'failed'],
        default:'pending'
    },
    paymentId:{
        type:String,
        required:true
    }

},{timestamps:true});
export const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema);