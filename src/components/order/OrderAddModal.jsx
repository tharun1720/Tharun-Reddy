import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/order";
import swal from "sweetalert2";
import { getDateFormat } from "../../utils/date-function";

export default function OrderAddModal({ closeModal }) {
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [productList, setProductList] = useState([]);

  const handleAddProduct = () => {
    if (!productName.trim()) {
      swal.fire("Oops", "Product name cannot be empty", "warning");
      return;
    }

    setProductList([...productList, productName.trim()]);
    setProductName("");
  };

  const handleRemoveProduct = (index) => {
    setProductList(productList.filter((_, i) => i !== index));
  };

  const handleAddOrder = () => {
    if (productList.length < 1 || !mobileNumber) {
      swal.fire("Oops", "Please fill all fields", "warning");
      return;
    }

    if (mobileNumber.length !== 10) {
      swal.fire("Oops", "Invalid Mobile Number", "warning");
      return;
    }

    const orderNumber = `ORD-${Math.floor(Math.random() * 10000)}`;

    const newOrder = {
      orderNumber,
      effectiveDate: getDateFormat(new Date()),
      id: Date.now(),
      mobileNumber,
      productList,
    };

    dispatch(addOrder(newOrder));

    closeModal();
    swal.fire("Success", "Order added successfully", "success");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl mb-4">Add New Order</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) =>
            !isNaN(e.target.value) && setMobileNumber(e.target.value)
          }
          maxLength={10}
        />

        <div className="mb-4">
          <strong className="text-sm">Product List</strong>
          <div className="flex items-center mt-2">
            <input
              type="text"
              className="w-full p-2 border rounded mr-2"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          {productList.length === 0 ? (
            <p className="text-sm text-gray-500 mt-2">No products added yet.</p>
          ) : (
            <ul className="mt-2 border p-2 rounded max-h-40 overflow-y-auto">
              {productList.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-1"
                >
                  <span className="text-[14px]">{product}</span>
                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500 hover:underline text-[10px]"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleAddOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
