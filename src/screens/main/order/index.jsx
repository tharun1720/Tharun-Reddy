import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrders,
  toggleSelection,
  toggleAllSelection,
} from "../../../redux/order";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import OrderAddModal from "../../../components/order/OrderAddModal";

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.content);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [viewModal, setViewModal] = useState({ isOpen: false, products: [] });

  const handleDelete = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: `You are about to delete ${selectedOrders.length} order(s).`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm Delete",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteOrders(selectedOrders));
          setSelectedOrders([]);
        }
      });
  };

  const handleSelectAll = () => {
    const selectAll = orders.length !== selectedOrders.length;
    setSelectedOrders(selectAll ? orders.map((order) => order.id) : []);
    dispatch(toggleAllSelection(selectAll));
  };

  const handleSelectRow = (id) => {
    const updatedSelection = selectedOrders.includes(id)
      ? selectedOrders.filter((orderId) => orderId !== id)
      : [...selectedOrders, id];
    setSelectedOrders(updatedSelection);
    dispatch(toggleSelection({ orderId: id }));
  };

  const handleView = (products) => {
    setViewModal({ isOpen: true, products });
  };

  const closeViewModal = () => {
    setViewModal({ isOpen: false, products: [] });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Order
        </button>
        <button
          onClick={handleDelete}
          disabled={selectedOrders.length === 0}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Delete Selected
        </button>
      </div>

      <table className="min-w-full bg-white rounded-md shadow-md border-collapse">
        <thead className="bg-gray-200">
          <tr className="border-b">
            <th className="px-4 py-2 text-center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedOrders.length === orders.length}
              />
            </th>
            <th className="px-4 py-2 text-left">Mobile Number</th>
            <th className="px-4 py-2 text-left">No Of Items</th>
            <th className="px-4 py-2 text-left">Order Number</th>
            <th className="px-4 py-2 text-left">Effective Date</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-gray-100 transition duration-150"
            >
              <td className="px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => handleSelectRow(order.id)}
                />
              </td>
              <td className="px-4 py-2 text-left">{order.mobileNumber}</td>
              <td className="px-4 py-2 text-left">
                {order.productList.length}
              </td>
              <td className="px-4 py-2 text-left">{order.orderNumber}</td>
              <td className="px-4 py-2 text-left">{order.effectiveDate}</td>
              <td className="px-4 py-2 text-left">
                <button
                  onClick={() => handleView(order.productList)}
                  className="bg-green-500 text-white px-2 py-1 text-sm rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <OrderAddModal closeModal={() => setIsModalOpen(false)} />
      )}

      {viewModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl mb-4">Product List</h2>
            <ul className="list-disc pl-6">
              {viewModal.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeViewModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
