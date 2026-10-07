import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  // console.log('in the login page', location);

  const handleLogin = data => {
    console.log('form data', data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        navigate(location?.state || '/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome To Zap Shift</h3>
      <p className="text-center">Please Login</p>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required</p>
          )}

          <label className="label">Password</label>
          {/* password field */}
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 8,
              pattern:
                // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500">
              Password must be 8 characters or longer
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="text-red-500">
              Password must be 8 characters, at least one uppercase, at least
              one lowercase, at least one number, at least one special
              characters.
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New to zap shift{' '}
          <Link
            state={location?.state}
            className="text-blue-400 underline"
            to={'/register'}
          >
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
