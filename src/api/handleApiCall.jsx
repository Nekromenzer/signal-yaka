import axios from "axios";
import urlDoc from "./url";

// const baseUrl = import.meta.env.VITE_API_URL
const baseUrl = "http://localhost:3000/";

const handleApiCall = ({
  variant = "user",
  urlType,
  data,
  params,
  cb = (returnData) => returnData,
  setLoading = (state) => state,
  urlParams = "",
  auth,
}) => {
  const url = `${baseUrl}${urlDoc[variant][urlType]?.url}${urlParams}`;
  const method = urlDoc[variant][urlType]?.type;

  async function handelCall() {
    console.log(url);
    setLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
          "Access-Control-Allow-Methods":
            "POST, PUT, PATCH, GET, DELETE, OPTIONS",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          Authorization: auth ? `Bearer ${localStorage.getItem("token")}` : "",
        },
      });
      setLoading(false);
      return cb(response.data, response.status);
    } catch (error) {
      setLoading(false);
      cb(error, error.response?.status);
      throw error;
    }
  }
  return handelCall();
};

export default handleApiCall;
