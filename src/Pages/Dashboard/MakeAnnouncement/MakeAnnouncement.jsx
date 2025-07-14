import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Loader from '../../../Components/Loader/Loader';

const MakeAnnouncement = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  // Add mutation
  const addMutation = useMutation({
    mutationFn: async (text) => {
      const res = await axiosSecure.post('/announcements', { text });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Announcement added');
      queryClient.invalidateQueries(['announcements']);
      setNewAnnouncement('');
    },
    onError: () => toast.error('Failed to add announcement'),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, text }) => {
      const res = await axiosSecure.put(`/announcements/${id}`, { text });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Announcement updated');
      queryClient.invalidateQueries(['announcements']);
      setEditId(null);
      setEditText('');
    },
    onError: () => toast.error('Failed to update announcement'),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/announcements/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Announcement deleted');
      queryClient.invalidateQueries(['announcements']);
    },
    onError: () => toast.error('Failed to delete announcement'),
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 min-h-screen bg-white">
      <h2 className="text-3xl font-bold mb-6 text-accent">Make Announcement</h2>

      {/* Add announcement */}
      <div className="mb-8 border border-gray-300 p-4 rounded-xl shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-accent">
          <FaPlus /> Add New Announcement
        </h3>
        <input
          type="text"
          placeholder="Announcement text"
          className="input input-bordered w-full mb-2"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => addMutation.mutate(newAnnouncement)}
        >
          Add Announcement
        </button>
      </div>

      {/* Announcements list */}
      <div className="border bg-white border-gray-300 rounded-lg mt-6 p-4">
        <h3 className="text-xl font-semibold mb-5 text-accent text-center ">All Announcements</h3>
        {announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <ul className="space-y-3">
            {announcements.map((ann) => (
              <li key={ann._id} className="border border-secondary p-3 rounded flex justify-between items-center ">
                {editId === ann._id ? (
                  <>
                    <input
                      type="text"
                      className="input input-bordered w-full mr-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateMutation.mutate({ id: ann._id, text: editText })}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{ann.text}</span>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-primary  btn-sm"
                        onClick={() => { setEditId(ann._id); setEditText(ann.text); }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-error btn-sm text-white"
                        onClick={() => deleteMutation.mutate(ann._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MakeAnnouncement;
