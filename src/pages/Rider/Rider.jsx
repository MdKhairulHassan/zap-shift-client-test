import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)]; // Set will not keep duplicate values

  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };

  // explore useMemo useCallBack
  // const senderRegion = watch('senderRegion');
  const riderRegion = useWatch({ control, name: 'region' });

  const handleRiderApplication = data => {
    console.log(data);
    axiosSecure.post('/riders', data).then(res => {
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:
            'Your application has been submitted. We will reach out to you in 145 days',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl text-primary">Be a rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4 text-black"
      >
        {/* two colum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* rider details */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">Rider Details</h2>
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name')}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Your Name"
            />

            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              {...register('email')}
              className="input w-full"
              placeholder="Your Email"
            />

            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register('region')}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Districts</legend>
              <select
                {...register('district')}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* address */}
            <label className="label my-4">Your Address</label>
            <input
              type="text"
              {...register('address')}
              className="input w-full"
              placeholder="Your Address"
            />
          </fieldset>

          {/* driving info */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">More Details</h2>
            {/* driving name */}
            <label className="label">Driving License</label>
            <input
              type="text"
              {...register('drivingLicense')}
              className="input w-full"
              placeholder="Driving License"
            />

            {/* rider NID */}
            <label className="label">NID</label>
            <input
              type="text"
              {...register('nid')}
              className="input w-full"
              placeholder="NID"
            />

            {/* Bike */}
            <label className="label my-4">BIKE</label>
            <input
              type="text"
              {...register('bike')}
              className="input w-full"
              placeholder="Bike"
            />

            {/* address */}
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-4 mb-10"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
