import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   // formState: { errors },
  // } = useForm();

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)]; // Set will not keep duplicate values

  // explore useMemo useCallBack
  // const senderRegion = watch('senderRegion');
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };

  // console.log(regions);

  const handleSendParcel = data => {
    console.log(data);
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    // console.log(isSameDistrict);

    // ====================================
    // let cost = 0;
    // if (isDocument) {
    //   cost = isSameDistrict ? 60 : 80;
    // } else {
    //   if (parcelWeight <= 3) {
    //     cost = isSameDistrict ? 110 : 150;
    //   } else {
    //     const minCharge = isSameDistrict ? 110 : 150;
    //     const extraWeight = parcelWeight - 3;
    //     const extraCharge = isSameDistrict
    //       ? extraWeight * 40
    //       : extraWeight * 40 + 40;
    //     cost = minCharge + extraCharge;
    //   }
    // }

    // ====================================
    const cost = isDocument
      ? isSameDistrict
        ? 60
        : 80
      : parcelWeight <= 3
        ? isSameDistrict
          ? 110
          : 150
        : (isSameDistrict ? 110 : 150) +
          (parcelWeight - 3) * 40 +
          (isSameDistrict ? 0 : 40);

    console.log('cost', cost);
    data.cost = cost;

    Swal.fire({
      title: 'Agree with the cost?',
      text: `You will be charged ${cost} taka!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm and continue payment',
    }).then(result => {
      if (result.isConfirmed)
        // save the parcel info to the database
        axiosSecure.post('/parcels', data).then(res => {
          console.log('after saving parcel', res.data);
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Parcel has created. Please pay for the parcel',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black"
      >
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register('parcelType')}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register('parcelType')}
              value="non-document"
              className="radio"
            />
            non-Document
          </label>
        </div>

        {/* parcel info: name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register('parcelName')}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register('parcelWeight')}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* two colum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* sender details */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">Sender Details</h2>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register('senderName')}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              {...register('senderEmail')}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register('senderRegion')}
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

            {/* sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register('senderDistrict')}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender address */}
            <label className="label my-4">Sender Address</label>
            <input
              type="text"
              {...register('senderAddress')}
              className="input w-full"
              placeholder="Sender Address"
            />
          </fieldset>

          {/* receiver info */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">Receiver Details</h2>
            {/* receiver name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register('receiverName')}
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* receiver email */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              {...register('receiverEmail')}
              className="input w-full"
              placeholder="Receiver Email"
            />

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register('receiverRegion')}
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

            {/* receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Districts</legend>
              <select
                {...register('receiverDistrict')}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver address */}
            <label className="label my-4">Receiver Address</label>
            <input
              type="text"
              {...register('receiverAddress')}
              className="input w-full"
              placeholder="Receiver Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-4 mb-10"
          value="send parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
