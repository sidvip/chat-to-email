import axios from "axios";
export function sendEmail(body) {
    return axios.post("https://ll46g8ggdl.execute-api.ap-southeast-2.amazonaws.com/testingV1/send-email", body)
}

export function getAllEmails() {
    return axios.get("https://ll46g8ggdl.execute-api.ap-southeast-2.amazonaws.com/testingV1/receive-emails");
}