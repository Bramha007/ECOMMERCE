import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// route POST /api/v1/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No order items found");
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc fetch all orders for loggedin user
// route GET /api/v1/orders/mine
// @access Private
const getMyOrderItems = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc fetch order by id for loggedin user
// route GET /api/v1/orders/:id
// @access Private
const getMyOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) res.status(200).json(order);
  else {
    res.status(404);
    throw new Error("No corresponding order found for the given id");
  }
});

// @desc Update order to paid
// route PUT /api/v1/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc Update order to delivered
// route PUT /api/v1/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @desc Get all order
// route GET /api/v1/orders/:id/deliver
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders");
});

export {
  addOrderItems,
  getMyOrderItems,
  getMyOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
