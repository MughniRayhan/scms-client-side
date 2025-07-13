import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import Loader from '../../../Components/Loader/Loader';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageCourts = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [newCourt, setNewCourt] = useState({ type: '', pricePerSession: '', image: '', slots: [] });
  const [editCourtId, setEditCourtId] = useState(null);
  const [editData, setEditData] = useState({ type: '', pricePerSession: '', image: '', slots: [] });

  // Fetch courts
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courts/all');
      return res.data;
    }
  });

  // Add court mutation
  const addCourtMutation = useMutation({
    mutationFn: async (court) => {
      const res = await axiosSecure.post('/courts', court);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Court added');
      queryClient.invalidateQueries(['courts']);
      setNewCourt({ type: '', pricePerSession: '', image: '', slots: [] });
    },
    onError: () => toast.error('Failed to add court'),
  });

  // Update court mutation
  const updateCourtMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.put(`/courts/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Court updated');
      queryClient.invalidateQueries(['courts']);
      setEditCourtId(null);
    },
    onError: () => toast.error('Failed to update court'),
  });

  // Delete court mutation
  const deleteCourtMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/courts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Court deleted');
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => toast.error('Failed to delete court'),
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Manage Courts</h2>

      {/* Add new court */}
      <div className="mb-8 border border-gray-300 p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-accent"><FaPlus /> Add New Court</h3>
        <input
          type="text"
          placeholder="Court Type"
          className="input input-bordered w-full mb-2"
          value={newCourt.type}
          onChange={(e) => setNewCourt({ ...newCourt, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price per session"
          className="input input-bordered w-full mb-2"
          value={newCourt.pricePerSession}
          onChange={(e) => setNewCourt({ ...newCourt, pricePerSession: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full mb-2"
          value={newCourt.image}
          onChange={(e) => setNewCourt({ ...newCourt, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Slots (comma separated)"
          className="input input-bordered w-full mb-2"
          value={newCourt.slots}
          onChange={(e) => setNewCourt({ ...newCourt, slots: e.target.value.split(',').map(s => s.trim()) })}
        />
        <button
          className="btn btn-primary"
          onClick={() => addCourtMutation.mutate(newCourt)}
        >
          Add Court
        </button>
      </div>

      {/* Courts table */}
      <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Price</th>
              <th>Slots</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.map((court, index) => (
              <tr key={court._id}>
                <td>{index + 1}</td>
                <td>
                  {editCourtId === court._id ? (
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={editData.type}
                      onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                    />
                  ) : (
                    court.type
                  )}
                </td>
                <td>
                  {editCourtId === court._id ? (
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={editData.pricePerSession}
                      onChange={(e) => setEditData({ ...editData, pricePerSession: e.target.value })}
                    />
                  ) : (
                    `$${court.pricePerSession}`
                  )}
                </td>
                <td>{court.slots?.join(', ')}</td>
                <td><img src={court.image} alt="" className="w-16 h-16 object-cover" /></td>
                <td className="flex gap-2">
                  {editCourtId === court._id ? (
                    <button
                      onClick={() => updateCourtMutation.mutate({ id: court._id, data: editData })}
                      className="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => { setEditCourtId(court._id); setEditData(court); }}
                      className="btn btn-primary btn-sm"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => deleteCourtMutation.mutate(court._id)}
                    className="btn btn-error btn-sm"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {courts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No courts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourts;
