import { getClickTime, updateClickTime } from "./firebase";

function countClickTime(docId) {
    return getClickTime(docId)
        .then((res) => {
            const count = { click_time: res + 1 };
            updateClickTime(docId, count);
        })
};

export { countClickTime }