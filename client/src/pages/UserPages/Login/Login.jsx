import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../../utils/formValidator";
import { useEffect, useState } from "react";
import { login } from "../../../Services/authServiece";
import { useNavigate } from "react-router";
import { reset } from "../../../features/authSlice";
import Loader2 from "../../../components/Loader/Loader2/Loader2";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [serverError, setServerError] = useState("");
  const { isLoading, isError, isSuccess, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formData.email) {
      setFormError({
        ...formError,
        email: validate("email", formData.email),
      });
    }
    if (formData.password) {
      setFormError({
        ...formError,
        password: validate("required", formData.password),
      });
    }
    setSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError({
      ...formError,
      email: validate("email", formData.email),
      password: validate("required", formData.password),
    });
    setSubmit(true);
  };

  useEffect(() => {
    if (
      submit &&
      !formError.email &&
      !formError.password &&
      formData.email &&
      formData.password
    ) {
      dispatch(login(formData));
    }
  }, [formData, formError, dispatch, submit]);

  useEffect(() => {
    if (isError) {
      setServerError(errorMessage.message);
      setSubmit(false);
      dispatch(reset());
    }
  }, [isError, errorMessage, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      setServerError("");
      setSubmit(false);
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-[#2d1525] to-background flex flex-col justify-center">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative md:w-[30rem] bg-text shadow-lg rounded-3xl p-10">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              {serverError && (
                <div className="w-full bg-red-100 flex items-center justify-center p-1 h-6 mt-3 rounded-md text-red-600">
                  {isLoading ? (
                    <Loader2 />
                  ) : (
                    <small className="">{serverError}</small>
                  )}
                </div>
              )}
              <div className="divide-y divide-gray-200">
                <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer placeholder-transparent outline-none h-10 w-full bg-text border-0 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-2 focus:ring-0"
                      placeholder="Email address"
                    />
                    {formError.email && (
                      <small className="text-red-700">{formError.email}</small>
                    )}
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="peer placeholder-transparent outline-none h-10 w-full border-b-2 bg-text border-0 border-gray-300 text-gray-900 focus:outline-none focus:border-b-2 focus:ring-0"
                      placeholder="Password"
                    />
                    {formError.password && (
                      <small className="text-red-700">
                        {formError.password}
                      </small>
                    )}
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={handleSubmit}
                      className="bg-secondary mt-3 text-white rounded-md w-full py-1"
                    >
                      Submit
                    </button>
                    <Link to={"/signup"}>
                      <small className="text-blue-500 cursor-pointer hover:underline">create account?</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
