const { app, dialog, shell } = window.require("@electron/remote")
const { exec, execSync } = window.require('child_process')
const NO_DEV = app.isPackaged; //判断是否是开发环境
const path = app.getAppPath(); //当前应用程序目录
const pathExe = app.getPath("exe") //exe所在目录
let ffmpeg;
let ffprobe;
let watermark;
const fs = window.require("fs")
if (!NO_DEV) {
    ffmpeg = path + "/ffp/ffmpeg.exe"
    ffprobe = path + "/ffp/ffprobe.exe"
    watermark = path + "/ffp/watermark.png"
} else {
    ffmpeg = path.substring(0, path.lastIndexOf('app') - 1) + "/ffp/ffmpeg.exe"
    ffprobe = path.substring(0, path.lastIndexOf('app') - 1) + "/ffp/ffprobe.exe"
    watermark = path.substring(0, path.lastIndexOf('app') - 1) + "/ffp/watermark.png"
}
window.ffprobeList = (e, type) => {
    let val = ffprobe.replaceAll('/\/', '\\');
    let exe = e.replaceAll(" ", "\" \""); //空格加""
    const item = JSON.parse(execSync(`"${val}" -i ${exe} -show_format -show_streams -print_format json`))
    let back = [];
    let list = {};
    if (type === "video") {
        back = item.streams.filter((items) => {
            if (items.height && items.width) {
                return items
            }
        })
        list = {
            height: back[0].height,
            width: back[0].width,
            time: timeShift(parseInt(back[0].duration)),
            bit_rate: back[0].bit_rate ? back[0].bit_rate / 1000 : '',
        }
    } else {
        back = item.streams
        list = {
            time: timeShift(parseInt(back[0].duration)),
            bit_rate: parseInt(back[0].bit_rate / 1000),
        }
    }
    return list;
}
window.videoContent = (path, outpath,vip) => {
    watermark = `"${watermark.replace(/\\/g, "/")}"`;
    let convent = `-vcodec h264`;
    let zimu = `-i ${watermark} -filter_complex overlay=(W-w)/2:(H-h)/2`;
    if (vip) zimu = "";
    let type = outpath.split(".").pop();
    if (type === 'webm') {
        convent = `-vcodec libvpx`
    } else if (type === 'ogv') {
        convent = `-vcodec libtheora`
    } else if (type === '3gp') {
        convent = `-vcodec h264 -ac 1 -ar 8000`
    } else if (type === 'wmv') {
        convent = `-vcodec wmv2`
    }
    path = `"${path.replace(/\\/g, "/")}"`;
    outpath = `"${outpath.replace(/\\/g, "/")}"`
    return new Promise((resolve, reject) => {
        exec(`"${ffmpeg}" -y -i ${path} ${zimu} ${convent} -threads 5 -preset ultrafast ${outpath}`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(outpath)
            }
        })
    })
}
window.audioContent = (path, outpath) => {
    outpath = `"${outpath}"`
    let type = path.split(".").pop();
    let convent = `-f mp4 -c:a aac`
    if (type === 'flac') {
        convent = `-ab 320k -map_metadata 0 -id3v2_version 3`
    } else {
        convent = `-f mp4 -c:a aac`
    }
    path = `"${path}"`;
    return new Promise((resolve, reject) => {
        exec(`"${ffmpeg}" -y -i ${path} ${convent} -threads 5 -preset ultrafast ${outpath}`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(outpath)
            }
        })
    })
}
window.VideoAudioContent = (path, outpath) => {
    path = `"${path}"`;
    outpath = `"${outpath}"`
    return new Promise((resolve, reject) => {
        exec(`"${ffmpeg}" -y -i ${path} -f mp4 -c:a aac -threads 5 -preset ultrafast ${outpath}`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(outpath)
            }
        })
    })
}
window.videoCompress = (path, outpath,vip) => {
    watermark = `"${watermark.replace(/\\/g, "/")}"`;
    let zimu = `-i ${watermark} -filter_complex overlay=(W-w)/2:(H-h)/2`;
    if (vip) zimu = "";
    path = `"${path}"`;
    outpath = `"${outpath}"`
    return new Promise((resolve, reject) => {
        exec(`"${ffmpeg}" -y -i ${path} ${zimu} -b 1m -threads 5 -preset ultrafast ${outpath}`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(outpath)
            }
        })
    })
}
timeShift = (e) => {
    let h = Math.floor(e / 3600);
    let m = Math.floor(e / 60) % 60;
    let t = e % 60;
    let time = (h.length > 1 ? h : '0' + h) + ":" + (m.length > 1 ? m : '0' + m) + ":" + (t > 9 ? t : '0' + t);
    return time;
}
window.SelectFile = (path) => {
    path = path.replaceAll(/\\/g, "\\\\");
    path = path.replaceAll(/\//g, "\\\\");
    path = JSON.parse(path);
    shell.showItemInFolder(path)
}