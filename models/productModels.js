const mongoose = require('mongoose');

const prodctSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    // description:{
    //     type:String,
    //     required:[true,"Please Enter Product Description"]
    // },
    mrp:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    gst:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
        // default:0
    },
    // ratings:{
    //     type:Number,
    //     default:0
    // },
    images:[
       {
        public_id :{
            type:String,
        required:true
        },
        url:{
            type:String,
        required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]

    },
    qtyType:{
        type:String
    },
    productType:{
        type:String
    },
    stock:{
        type:Number,
        required :[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 charactors"],
        default:1
    },
   
   createdAt:{
        type:Date,
        default:Date.now
    },
    discountAmount:{
        type:Number,
        default: function() {
            return ((this.mrp * (100-this.discount) )/ 100)
        }
    },
    product_tax:{
        type:Number,
        // required:[true,"Please Enter Tax "],
        // default:18
        default: function() {
            return (((this.discountAmount) * (this.gst))/100)
        }
    },
    taxedAmount:{
        type:Number,
        default: function() {
            // if(this.discount) return (this.discountAmount * (100+this.gst))/100
            // else return (this.mrp * (100+this.gst))/100
            return ((this.mrp * (100+this.gst))/100)
        }
    },
    // selected_type:{
    //     type:Number
    // },
    // price:{
    //     type:Number,
    //     default: function() {
    //         if()
    //     }
    // },
  
    isRemoved:{
        type:Boolean,
        default:false,
    }

})

module.exports = mongoose.model("Product",prodctSchema);