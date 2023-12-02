import axios from "axios";
import urlDoc from "./url";

const baseUrl = "https://us-central1-infact-zerp.cloudfunctions.net/api/";

const handleApiCall = ({
  variant = "user",
  urlType,
  data,
  params,
  cb = (returnData) => returnData,
  setLoading = (state) => state,
  urlParams = "",
  auth = true,
}) => {
  const url = `${baseUrl}${urlDoc[variant][urlType]?.url}${urlParams}`;
  const method = urlDoc[variant][urlType]?.type;

  async function handelCall() {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
          Accept: "*/*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          Authorization: auth ? `Bearer ${localStorage.getItem("token")}` : "",
        },
      });
      setLoading(false);
      return cb(response, response.status);
    } catch (error) {
      setLoading(false);
      cb(error, error.response);
      throw error;
    }
  }
  return handelCall();
};

export default handleApiCall;
