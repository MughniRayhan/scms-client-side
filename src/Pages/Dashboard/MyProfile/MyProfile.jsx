import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEnvelope, FaUser, FaCalendarAlt, FaUsers, FaCrown } from 'react-icons/fa';
import { MdVerifiedUser, MdSportsTennis } from 'react-icons/md';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import profilebg from '../../../assets/profilebg.jpg';
import Loader from '../../../Components/Loader/Loader';

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // Fetch user data
  const { data: dbUser, isLoading, isError } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email,
  });

  // Fetch admin summary data if role is admin
  const { data: adminStats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    },
    enabled: dbUser?.role === 'admin',
  });

  if (isLoading || statsLoading) {
    return <Loader />;
  }

  if (isError || !dbUser) {
    return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;
  }

  const formattedDate = new Date(dbUser.creation_date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const memberSinceDate = dbUser.membership_date 
  ? new Date(dbUser.membership_date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  : null;

  return (
    <div className="p-8 bg-white min-h-screen">
      <div
        className="sm:w-[80%] w-full h-[80%] mx-auto rounded-lg flex flex-col items-center shadow-xl mt-10 p-4"
        style={{
          backgroundImage: `url(${profilebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-8">
          <img
            src={dbUser.photoURL}
            alt={dbUser.displayName}
            className="w-28 h-28 rounded-full shadow-lg border-4 border-primary"
          />
          <h2 className="sm:text-2xl text-lg font-bold mt-4 flex items-center gap-2 text-accent pb-2">
            <FaUser /> {dbUser.displayName}
          </h2>
          <div className="pt-2 border-t border-accent/50 text-accent sm:text-base text-sm">
            <p className="flex items-center justify-start gap-2 mt-2 text-left ">
              <FaEnvelope className="text-primary" /> {dbUser.email}
            </p>
            <p className="flex items-center justify-start text-left gap-2 mt-2 ">
              <MdVerifiedUser className="text-blue-400" /> Role: {dbUser.role}
            </p>
            <p className="flex items-center gap-2 mt-2 ">
              <FaCalendarAlt className="text-secondary" /> Registered on: {formattedDate}
            </p>

            {/* Member specific: membership date */}
            {dbUser.role === 'member' && memberSinceDate && (
              <p className="flex items-center gap-2 mt-2 ">
                <FaCrown className="text-yellow-600" /> Member since: {memberSinceDate}
              </p>
            )}

            {/* Admin specific: total counts */}
            {dbUser.role === 'admin' && adminStats && (
              <div className="mt-4 border-t border-accent/50 pt-4 space-y-2">
                <p className="flex items-center gap-2">
                  <MdSportsTennis className="text-green-600" /> Total Courts: {adminStats.totalCourts}
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-blue-600" /> Total Users: {adminStats.totalUsers}
                </p>
                <p className="flex items-center gap-2">
                  <FaCrown className="text-purple-600" /> Total Members: {adminStats.totalMembers}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
