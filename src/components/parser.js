export const KEYS = [
    "Message-ID",
    "In-Reply-To",
    "References",
    "From",
    "Date",
    "Subject",
    "To"
]


export function parser(string) {
    const map = {};
    let id;
    let counter = 0;
    let response = "";
    string.split("\r").forEach((ele) => {
        if (KEYS.filter(k => new RegExp(k).test(ele)).length > 0) {
            let split = ele.split(/:(.*)/s);
            if (ele.includes("From")) {
                map[split[0].trim()] = split[1]?.replace(/(>)/g, "").trim()?.split("<")[1];
            } else {
                map[split[0].trim()] = split[1]?.replace(/(>|<)/g, "").trim();
            }
        }
        if (ele.includes(id)) {
            counter += 1;
        }
        if (ele.includes("boundary")) {
            id = ele.split("=")[1].replaceAll("\"", "");
        }
        if (!ele.includes(id) && (counter === 1 || counter === 2)) {
            response += ele;
            if (counter === 2) {
                map["response"] = response.replaceAll(/(>|<)/ig, "")
                    .replaceAll('charset="UTF-8"', "")
                    .replaceAll('\nContent-Type: text/plain;', "")
                    .replaceAll('\nContent-Type: text/html;', "");
                counter = 0;
            }
        }
    });
    console.log(map);
    return map;
}