import React from "react";
import { useState } from "react";
import { send } from "emailjs-com";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

function Commission() {
  const navigate = useNavigate();

  const [from_name, setFrom_name] = useState("");
  const [from_email, setFrom_email] = useState("");
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCaptchaChange = (value) => {
    // The value parameter contains the response token if the user passes the CAPTCHA.
    setCaptchaValue(value);
  };

  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "Ananda",
    to_email: "fieshidiq@gmail.com",
    // to_email: "northc4t@gmail.com",
    message: "",
    from_email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (captchaValue) {
      // Your email sending logic here
      send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        toSend,
        process.env.REACT_APP_PRIVATE_KEY
      )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        })
        .finally(() => {
          setCaptchaValue(null);
        });
    } else {
      console.log("Please complete the CAPTCHA.");
    }
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showAlert && (
        <div className="alert alert-success" role="alert">
          Thanks! We'll proccess your request ASAP. Stay tune XD.
        </div>
      )}
      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
        <div className="text-4xl sm:text-5xl xl:text-6xl font-medium text-center mt-16 font-a">
          Commission
        </div>
        <div className="mx-4 text-lg sm:text-xl xl:text-2xl text-center mt-5 text-slate-600 font-b">
          Welcome to our commission draw request page! Submit your ideas and let your
          imagination soar with personalized art tailored to your preferences.
          Start your creative journey now! 😊
        </div>
        <form onSubmit={onSubmit} className="mt-8 w-min mb-20">
          <div className="w-96 border-2 p-6 bg-paper">
            <h4 className="text-2xl mb-8 font-b font-medium">Project Detail</h4>
            <div className="mb-4">
              <label
                htmlFor="from_name"
                className="font-b block text-md font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                required
                type="text"
                id="from_name"
                value={toSend.from_name}
                onChange={handleChange}
                name="from_name"
                className="border border-gray-300 px-3 py-2 mt-1 w-full font-b block text-sm focus:outline-none"
                placeholder="input your name here"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="from_email"
                className="font-b block text-md font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                required
                type="text"
                id="from_email"
                value={toSend.from_email}
                onChange={handleChange}
                name="from_email"
                className="border border-gray-300 px-3 py-2 mt-1 w-full font-b block text-sm focus:outline-none"
                placeholder="lemme know your active email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="font-b block text-md font-medium text-gray-700"
              >
                Project Description
              </label>
              <textarea
                required
                id="message"
                value={toSend.message}
                onChange={handleChange}
                name="message"
                rows="5"
                className="border border-gray-300 px-3 py-2 mt-1 w-full resize-none font-b block text-sm focus:outline-none"
                placeholder="write your project details here xD"
              ></textarea>
            </div>
            <ReCAPTCHA
              className="mt-2"
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={handleCaptchaChange}
            />
            <div className="mt-4">
              <button
                type="submit"
                disabled={!captchaValue}
                className={`py-2 px-4 border-2 bg-white  font-b ${
                  captchaValue ? "hover:bg-gray-50 text-black" : "text-gray-300"
                }`}
              >
                Submit
              </button>
              <button
                onClick={()=>{navigate('/');}}
                className={`ms-4 py-2 px-4 border-2 bg-white font-b hover:bg-gray-50 text-black`}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Commission;
