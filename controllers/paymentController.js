const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require('crypto');

const Razorpay = require("razorpay");





// Razorpay payment
exports.processRazorpayPayment = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body,"=========== req.body payment");
  const {amount} = req.body

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
  });
  console.log("=========== under instance payment");
  const options = {
    amount:amount*100,
    currency: "INR",
    receipt:crypto.randomBytes(10).toString("hex")

  }
  instance.orders.create(options,(err,order)=>{
    if (err) {
      return next(new ErrorHander("Something went Wrong!", 400));
    }
    console.log(order,"=========== Order payment");
    res.status(200).json({
      success:true,
      data:order
      
    });

  })
  
});

//Rozorpay Payment Verify
exports.razorpayPaymentVerify = catchAsyncErrors(async (req, res, next) => {
 
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_KEY)
  .update(sign.toString()).digest("hex");

  if(razorpay_signature === expectedSign){
    res.status(200).json({
      success:true,
      message:"Payment successfull"
    });

  }else{
    res.status(400).json({
      success:false,
      message:"Your payment has failed, please try again"
    });

  }

});