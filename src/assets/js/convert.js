
export function fileSize(size) {
    if (size >= 1024 * 1024 * 1024) {
        size = Math.floor(size / 1024 / 1024 / 1024 * 100) / 100 + 'GB'
    } else if (size >= 1024 * 1024) {
        size = Math.floor(size / 1024 / 1024 * 100) / 100 + 'MB'
    } else if (size >= 1024) {
        size = Math.floor(size / 1024 * 100) / 100 + 'KB'
    } else if (size < 1024) {
        size = Math.floor(size * 100) / 100 + 'bit'
    }
    return size;
}

export function timeShift(e) {
    let h = Math.floor(e / 3600);
    let m = Math.floor(e / 60) % 60;
    let t = e % 60;
    let time = (h.length > 1 ? h : '0' + h) + ":" + (m.length > 1 ? m : '0' + m) + ":" + (t > 9 ? t : '0' + t);
    return time;
}

export function exist(arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].path === e) {
            return true
        }
    }
    return false;
}