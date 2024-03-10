import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../../utils/formValidator";
import { signUp, verifyEmail } from "../../../Services/authServiece";
import OtpverifyModal from "../../../components/OtpverifyModal/OtpverifyModal";
import { reset } from "../../../features/authSlice";
import Loader from "../../../components/Loader/Loader1/Loader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Signup() {
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    setFormError({
      ...formError,
      fullname: validate("name", formData.fullname),
      email: validate("email", formData.email),
      password: validate("password", formData.password),
    });
    setSubmit(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formData.fullname) {
      setFormError({
        ...formError,
        fullname: validate("name", formData.fullname),
      });
    }
    if (formData.email) {
      setFormError({
        ...formError,
        email: validate("email", formData.email),
      });
    }
    if (formData.password) {
      setFormError({
        ...formError,
        password: validate("password", formData.password),
      });
    }
  };
  useEffect(() => {
    (async function () {
      if (
        submit &&
        !formError.email &&
        !formError.fullname &&
        !formError.password &&
        formData.fullname &&
        formData.email &&
        formData.password
      ) {
        const data = await verifyEmail(formData.email);
        if (data.success) {
          setOpenModal(true);
        } else {
          setServerError(data.response.data.message);
        }
        console.log(data);
      }
    })();
  }, [formData, formError, submit]);

  useEffect(() => {
    if (formSubmit) {
      dispatch(signUp(formData));
    }
  }, [formSubmit, dispatch, formData]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setFormSubmit(false);
      setSubmit(false);
      window.location.reload();
    }
  }, [dispatch, isSuccess, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <OtpverifyModal
        email={formData.email}
        openModal={openModal}
        setOpenModal={setOpenModal}
        isSubmit={submit}
        setFormSubmit={setFormSubmit}
      />
      <div className="min-h-screen pt-28 md:pt-14 pb-56 md:pb-40 bg-gradient-to-r from-[#2d1525] to-background flex flex-col justify-center ">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative md:w-[30rem] bg-text shadow-lg rounded-3xl p-10">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Signup</h1>
              </div>
              {serverError && (
                <div className="w-full bg-red-200 flex items-center justify-center p-1 mt-3 rounded-md text-red-600">
                  <small className="">{serverError}</small>
                </div>
              )}
              <div className="divide-y divide-gray-200">
                <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      name="fullname"
                      type="text"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="peer placeholder-transparent outline-none h-10 w-full bg-text border-0 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-2 focus:ring-0"
                      placeholder="Email address"
                    />
                    {formError.fullname && (
                      <small className="text-red-700">
                        {formError.fullname}
                      </small>
                    )}
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      name="email"
                      type="text"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer placeholder-transparent outline-none h-10 w-full bg-text border-0 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-2 focus:ring-0"
                      placeholder="Email address"
                    />
                    {formError.email && (
                      <small className="text-red-700">{formError.email}</small>
                    )}
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
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
                      className="bg-secondary mt-3 mb-2 text-white rounded-md w-full py-1"
                    >
                      Submit
                    </button>
                    <Link to={"/login"}>
                      <small className="text-blue-500 cursor-pointer hover:underline">
                        Already have account?
                      </small>
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
