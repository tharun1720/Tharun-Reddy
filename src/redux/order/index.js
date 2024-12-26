import { createSlice } from "@reduxjs/toolkit";

const dummyOrders = [
  {
    orderNumber: "ORD-123",
    mobileNumber: 9482344434,
    effectiveDate: "2024-01-01",
    productList: ["MacBook"],
    id: 1,
  },
  {
    orderNumber: "ORD-124",
    mobileNumber: 9876543210,
    effectiveDate: "2024-01-02",
    productList: ["iPhone", "iPad"],
    id: 2,
  },
  {
    orderNumber: "ORD-125",
    mobileNumber: 9123456789,
    effectiveDate: "2024-01-03",
    productList: ["AirPods"],
    id: 3,
  },
];

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    content: dummyOrders,
  },
  reducers: {
    addOrder: (state, action) => {
      const existingOrder = state.content.find(
        (order) => order.orderNumber === action.payload.orderNumber
      );
      if (existingOrder) {
        return state;
      }
      state.content.push(action.payload);
    },
    deleteOrders: (state, action) => {
      state.content = state.content.filter(
        (order) => !action.payload.includes(order.id)
      );
    },
    toggleSelection: (state, action) => {
      const { orderId } = action.payload;
      const order = state.content.find((order) => order.id === orderId);
      if (order) {
        order.selected = !order.selected;
      }
    },
    toggleAllSelection: (state, action) => {
      const selectAll = action.payload;
      state.content.forEach((order) => (order.selected = selectAll));
    },
  },
});

export const { addOrder, deleteOrders, toggleSelection, toggleAllSelection } =
  ordersSlice.actions;
export default ordersSlice.reducer;
