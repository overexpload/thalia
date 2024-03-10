import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

export default function Footer() {
  return (
    <>
      <footer
        className="wow fadeInUp p-10 relative z-10 bg-[#090E34] pt-5 lg:pt-[60px]"
        data-wow-delay=".15s"
      >
        <div className="container">
          <div className="mb-10 w-full items-center justify-center flex flex-col">
            <h1 className="mb-6 inline-block max-w-[160px]">
              <img src={Logo} alt="logo" className="max-w-full" />
            </h1>
            <h1 className="mb-8 max-w-[400px] text-text text-center">
              "Small acts, when multiplied by millions of people, can transform
              the world."
            </h1>
          </div>
        </div>

        <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-2/3 lg:w-1/2">
                <div className="my-1">
                  <div className="-mx-3 flex items-center justify-center md:justify-start">
                    <Link
                      to={
                        "https://github.com/Auto-Playground/thalia/blob/main/CODE_OF_CONDUCT.md"
                      }
                      className="px-3 text-text  hover:text-white hover:underline"
                    >
                      Code of Conduct
                    </Link>
                    <Link
                      to={
                        "https://github.com/Auto-Playground/thalia/blob/main/CONTRIBUTING.md"
                      }
                      className="px-3 text-text  hover:text-white hover:underline"
                    >
                      Contributing
                    </Link>
                    <Link
                      to={
                        "https://github.com/Auto-Playground/thalia/blob/main/LICENSE"
                      }
                      className="px-3 text-text  hover:text-white hover:underline"
                    >
                      LICENCE
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/3 lg:w-1/2">
                <div className="my-1 flex justify-center md:justify-end">
                  <h1 className="text-text ">
                    Designed and Developed by
                    <Link
                    to={"https://github.com/Auto-Playground/thalia"}
                      className="text-gray-1 hover:underline"
                    >
                      Team Thalia
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
