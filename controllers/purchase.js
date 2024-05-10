const Razorpay = require('razorpay');
const Order = require('../models/order')

exports.getStatus = async( req , res) => {
    try{
        const isPremiumUser = req.user.isPremiumUser;
        res.status(200).json({status:isPremiumUser})
    }catch(error){
        console.error('Error in transaction status' , error);
        res.status(500).json({error:error,message:"An error encountering"})
    }
}


exports.premiumPurchase = async (req, res) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = 2500;

        const order = await rzp.orders.create({ amount, currency: 'INR' });

        await req.user.createOrder({ orderId: order.id, status: "PENDING" });

        return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (error) {
        console.error('Error in premium purchase:', error);
        res.status(500).json({ message: 'Something went wrong', error: error });
    }
};

exports.updateOrderStatus= async ( req, res) => {
    try{
        const{ order_id } = req.body;
        const order = await Order.findOne({where:{orderId:order_id}});
        await order.update({status: 'FAILED'});
        res.status(200).json({success:true,message:'Order status updated FAILED'})
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Failed to update order status', error: error });
    }
}

exports.updateTransactionStatus= async ( req, res) => {
    try{
        const {payment_id , order_id} = req.body;

        const order = await Order.findOne({where : { orderId:order_id }});

        if(!order){
            return res.status(404).json({success:false,message:'Order not found'})
        }
        const updateOrderPromise = order.update({paymentId:payment_id,status:"SUCCESSFUL"});
        const updateUserPromise = req.user.update({isPremiumUser:true});

        await Promise.all([updateOrderPromise,updateUserPromise]);
        res.status(202).json({success:true,message:"Transaction succesfull"})
    }catch(err){
        console.log(err);
        res.status(500).json({ error: err , message: "Something went wrong" });
    }
}