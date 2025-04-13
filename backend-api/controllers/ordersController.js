const db = require("../knexfile.js");
const { createResponse } = require("../jsend.js");

const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await db("orders")
        .select("orders.*", "users.username")
        .leftJoin("users", "orders.user_id", "users.id");
      res
        .status(200)
        .json(createResponse(true, orders, "Orders retrieved successfully"));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(createResponse(false, null, "Error retrieving orders"));
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await db("orders")
        .select("orders.*", "users.username")
        .leftJoin("users", "orders.user_id", "users.id")
        .where("orders.id", req.params.id)
        .first();
      if (!order) {
        return res
          .status(404)
          .json(createResponse(false, null, "Order not found"));
      }
      res.status(200).json(createResponse(true, order, "Order retrieved successfully"));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(createResponse(false, null, "Error retrieving order"));
    }
  },
  createOrder: async (req, res) => {
    try {
      const { book_id, total_price, quantity, user_id } = req.body;
      const [id] = await db("orders").insert({
        book_id: JSON.stringify(book_id),
        total_price,
        quantity,
        user_id,
      });
      const newOrder = await db("orders").where("id", id).first();
      res
        .status(201)
        .json(createResponse(true, newOrder, "Order created successfully"));
    } catch (err) {
      console.error(err);
      res.status(500).json(createResponse(false, null, "Error creating order"));
    }
  },

  updateOrder: async (req, res) => {
    try {
      await db("orders").where("id", req.params.id).update(req.body);
      const updatedOrder = await db("orders")
        .where("id", req.params.id)
        .first();
      res
        .status(200)
        .json(createResponse(true, updatedOrder, "Order updated successfully"));
    } catch (err) {
      console.error(err);
      res.status(500).json(createResponse(false, null, "Error updating order"));
    }
  },

  updateOrderStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const result = await db("orders").where("id", id).update({ status });
      if (result === 0) {
        return res
          .status(404)
          .json(createResponse(false, null, "Order not found"));
      }
      const updatedOrder = await db("orders").where("id", id).first();
      res
        .status(200)
        .json(
          createResponse(
            true,
            updatedOrder,
            "Order status updated successfully"
          )
        );
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(createResponse(false, null, "Error updating order status"));
    }
  },

  deleteOrder: async (req, res) => {
    try {
      await db("orders").where("id", req.params.id).del();
      res
        .status(200)
        .json(createResponse(true, null, "Order deleted successfully"));
    } catch (err) {
      console.error(err);
      res.status(500).json(createResponse(false, null, "Error deleting order"));
    }
  },

  searchOrders: async (req, res) => {
    const { query } = req.query;
    try {
      const orders = await db("orders")
        .select("*")
        .where("status", "like", `%${query}%`)
        .orWhere("user_id", "like", `%${query}%`)
        .orWhere("id", "like", `%${query}%`);
      res
        .status(200)
        .json(createResponse(true, orders, "Orders searched successfully"));
    } catch (error) {
      console.error("Error searching orders:", error);
      res
        .status(500)
        .json(createResponse(false, null, "Error searching orders"));
    }
  },

  getOrderByUserId: async (req, res) => {
    const { user_id } = req.params;
    try {
      const orders = await db("orders").where("user_id", user_id);
      if (orders.length > 0) {
        res
          .status(200)
          .json(createResponse(true, orders, "Orders retrieved successfully"));
      } else {
        res
          .status(404)
          .json(createResponse(false, null, "No orders found for this user"));
      }
    } catch (error) {
      console.error("Error getting orders by user ID:", error);
      res
        .status(500)
        .json(createResponse(false, null, "Error retrieving orders"));
    }
  },

  cancelOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db("orders")
        .where("id", id)
        .update({ status: "canceled" });

      if (result === 0) {
        return res
          .status(404)
          .json(createResponse(false, null, "Order not found"));
      }

      res
        .status(200)
        .json(createResponse(true, null, "Order canceled successfully"));
    } catch (error) {
      console.error("Error canceling order:", error);
      res
        .status(500)
        .json(createResponse(false, null, "Error canceling order"));
    }
  },
};

module.exports = ordersController;
