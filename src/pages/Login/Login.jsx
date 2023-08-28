import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import usersDataReducer, { saveUser } from "../../reducer/usersDataReducer";
import instance from "../../services/Axios.jsx";

function Login({ usersDataReducer, saveUser }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    usersDataReducer.userData && navigate("/");
  }, []);

  function onSubmit(data) {
    instance
      .post("/user/login", { password: data.password, phoneNumber: data.phone })
      .then((res) => {
        if (res.data.success) {
          saveUser({
            object: res.data.data?.userResponse,
            message: res.data.data?.accessToken,
            success: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error("Telefon nomer yoki parol noto'g'ri kiritildi");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Telefon nomer yoki parol noto'g'ri kiritildi");
      });
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex h-screen justify-center">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
            <div>
              <h2 className="text-4xl font-bold text-white">Edu Up</h2>

              <p className="mt-3 max-w-xl text-gray-300">
                Biz foydalanish uchun qulay va o‘quv markazingizni boshqarish uchun barcha zarur
                funksiyalarni ta’minlaydigan CRM tizimini taklif etamiz.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
                Edu Up
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Hisobingizga kirish uchun tizimga kiring
              </p>
            </div>

            <div className="mt-8">
              <form
                onSubmit={handleSubmit((data) => {
                  return onSubmit(data);
                })}
              >
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >
                    Telefon nomer
                  </label>
                  <div
                    className={twMerge(
                      classNames(
                        "mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600",
                        {
                          "border-danger focus:border-danger focus:ring-danger":
                            errors.phone?.type === "required",
                        },
                      ),
                    )}
                  >
                    <span className="prefix">+998 </span>
                    <input
                      type="text"
                      id="phone"
                      {...register("phone", { required: true })}
                      placeholder="Telefon nomeringizni kiriting..."
                      className="w-full max-w-[250px] dark:bg-gray-900 border-none outline-none"
                    />
                  </div>
                  {errors.phone?.type === "required" && (
                    <p className="text-danger">Telefon nomeringizni kiriting</p>
                  )}
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
                      Parol
                    </label>
                    <Link
                      to="/"
                      className="text-sm text-gray-400 hover:text-blue-500 hover:underline focus:text-blue-500"
                    >
                      Parolni unutdingizmi?
                    </Link>
                  </div>

                  <input
                    type="password"
                    {...register("password", { required: true })}
                    id="password"
                    placeholder="Parolingizni kiriting..."
                    className={twMerge(
                      classNames(
                        "mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400",
                        {
                          "border-danger focus:border-danger focus:ring-danger":
                            errors.password?.type === "required",
                        },
                      ),
                    )}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-danger">Parolingizni kiriting</p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full transform rounded-md bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Kirish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(usersDataReducer, { saveUser })(Login);
