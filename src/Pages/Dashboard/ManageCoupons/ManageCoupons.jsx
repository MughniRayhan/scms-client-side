import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import { toast } from 'react-toastify';

const ManageCoupons = () => {
  const axiosSecure = UseAxiosSecure();
  const [newCoupon, setNewCoupon] = useState({ code: '', discountPercentage: '' });
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [updatedDiscount, setUpdatedDiscount] = useState('');

  // Fetch all coupons
  const { data: coupons = [], isLoading, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    }
  });

  // Handle add coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discountPercentage) {
      toast.error('All fields are required');
      return;
    }

    try {
      await axiosSecure.post('/coupons', newCoupon);
      toast.success('Coupon added');
      setNewCoupon({ code: '', discountPercentage: '' });
      refetch();
    } catch (err) {
      toast.error('Failed to add coupon');
    }
  };

  // Handle delete coupon
  const handleDeleteCoupon = async (id) => {
    try {
      await axiosSecure.delete(`/coupons/${id}`);
      toast.success('Coupon deleted');
      refetch();
    } catch (err) {
      toast.error('Failed to delete coupon');
    }
  };

  // Open edit modal
  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon);
    setUpdatedDiscount(coupon.discountPercentage);
  };

  // Submit updated coupon
  const submitUpdatedCoupon = async () => {
    if (!updatedDiscount) {
      toast.error('Please enter a discount percentage');
      return;
    }

    try {
      await axiosSecure.put(`/coupons/${editingCoupon._id}`, { discountPercentage: updatedDiscount });
      toast.success('Coupon updated');
      setEditingCoupon(null);
      refetch();
    } catch (err) {
      toast.error('Failed to update coupon');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Manage Coupons</h2>

      {/* Add coupon form */}
      <form onSubmit={handleAddCoupon} className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Coupon Code"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={newCoupon.discountPercentage}
          onChange={(e) => setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary transform hover:scale-105 transition duration-300">
          <FaPlus /> Add Coupon
        </button>
      </form>

      {/* Coupons table */}
      <div className="overflow-x-auto border bg-white dark:bg-gray-800 border-gray-300 rounded-lg">
        <table className="table w-full">
          <thead className="bg-secondary dark:bg-orange-400 font-bold text-gray-700 dark:text-white">
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Discount %</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.discountPercentage}%</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info" onClick={() => handleEditClick(coupon)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-error text-white" onClick={() => handleDeleteCoupon(coupon._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No coupons found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Coupon Modal */}
      {editingCoupon && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Coupon</h3>
            <div className="mb-4">
              <label>Discount Percentage:</label>
              <input
                type="number"
                value={updatedDiscount}
                onChange={(e) => setUpdatedDiscount(e.target.value)}
                className="input input-bordered w-full mt-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button className="btn btn-secondary" onClick={() => setEditingCoupon(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitUpdatedCoupon}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
