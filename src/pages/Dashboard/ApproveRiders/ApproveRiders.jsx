import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { HiUserRemove } from 'react-icons/hi';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then(res => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Rider status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = rider => {
    updateRiderStatus(rider, 'approved');
  };

  const handleRejection = rider => {
    updateRiderStatus(rider, 'rejected');
  };

  return (
    <div>
      <h2 className="text-5xl">Riders Pending Approval:{riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Work Status</th>
              <th>District</th>
              <th>Actions</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>
                  <p
                    className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>{rider.district}</td>
                <td className="flex gap-x-3">
                  {/* you can keep modal to view by click eye icone. then approve from modal. */}
                  <button className="btn">
                    <FaEye />
                  </button>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn"
                  >
                    <HiUserRemove />
                  </button>
                  <button className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
