import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaSearch, FaTrash } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../../../Components/Loader/Loader';

const ManageMembers = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { data: members = [], isLoading, refetch } = useQuery({
    queryKey: ['members', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/members?search=${search}`);
      return res.data;
    }
  });

  const deleteMemberMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/members/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Member has been deleted.', 'success');
      queryClient.invalidateQueries(['members']);
    },
    onError: () => Swal.fire('Error', 'Failed to delete member', 'error')
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This member will be removed permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMemberMutation.mutate(id);
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-12 py-10 bg-white shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-accent mb-4">Manage Members</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <FaSearch /> Search
        </button>
      </form>

      {/* Members Table */}
      <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.displayName}</td>
                <td>{member.email}</td>
                <td>{new Date(member.creation_date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="btn btn-error btn-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
