import axios from "axios";

async function det() {
    try {
        const response = await axios.get("https://radshahmat.tech/rest_apis/score_manager/det.php");
        const matchFinishFlag = response.data[0].match_finish_flag;
        return matchFinishFlag;
    } catch (error) {
        console.error("Error fetching match_finish_flag:", error);
        return false;
    }
}

export default det;
