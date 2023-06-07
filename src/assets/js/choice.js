import store from "../../store"
import { fileSize, exist, existFoler } from './convert'


export function selectFile(format, list, type) {
    let inputObj = document.createElement("input");
    inputObj.setAttribute("id", "_ef");
    inputObj.setAttribute("type", "file");
    inputObj.setAttribute("accept", format); 
    inputObj.setAttribute("style", "display:none");
    inputObj.setAttribute("multiple", "true");
    document.body.appendChild(inputObj);
    inputObj.addEventListener("change", () => {
        obtainList(inputObj.files, list, type);
    });
    inputObj.click();
}

export function selecFolder(format, list, type) {
    let inputObj = document.createElement("input");
    inputObj.setAttribute("id", "_ef");
    inputObj.setAttribute("type", "file");
    inputObj.setAttribute("style", "display:none");
    inputObj.setAttribute("webkitdirectory", "true");
    document.body.appendChild(inputObj);
    inputObj.addEventListener("change", () => {
        scalpFoler(inputObj.files, format, list, type)
    });
    inputObj.click();
}

export function scalpFoler(item, val, list, type) {
    for (let i = 0; i < item.length; i++) {
        let format ='.' + item[i].name.split(".").pop()
        if (val.indexOf(format) > -1) {
            obtainList([item[i]], list, type)
        } else {
            store.commit("setShowhide", true);
            store.commit("setTips", "请上传可支持转换的格式!");
        }
    }
}

export function obtainList(items, array, type) {
    for (let i = 0; i < items.length; i++) {
        if (type === 'video' && store.state.video_format.length === 10) {
            store.commit("setShowhide", true);
            store.commit("setTips", "最多可上传10个文件");
            return
        } else if (type === 'audio' && store.state.audio_format.length === 10) {
            store.commit("setShowhide", true);
            store.commit("setTips", "最多可上传10个文件");
            return
        } else if (type === 'reduce' && store.state.video_reduce.length === 10) {
            store.commit("setShowhide", true);
            store.commit("setTips", "最多可上传10个文件");
            return
        }
        if (!exist(array, items[i].path)) {
            let data = window.ffprobeList(items[i].path, type)
            let list = {
                name: items[i].name.slice(0, items[i].name.lastIndexOf(".")),
                path: items[i].path,
                size: fileSize(items[i].size),
                format: items[i].name.split(".").pop(),
                layout: "", //输出格式
                title: items[i].name.slice(0, items[i].name.lastIndexOf(".")), //输出名字
                method: "", //输出路径
                status: "default", //状态
                time: data.time,
                height: data.height,
                width: data.width,
                bit_rate: data.bit_rate,
            };
            if (type === "video") {
                let list_video = store.state.video_format;
                list.layout = store.state.formatVideo
                list_video.push(list);
                store.commit("setVideo", list_video);
            } else if (type === "audio") {
                let list_audio = store.state.audio_format;
                list.layout = store.state.formatAudio
                list_audio.push(list);
                store.commit("setAudio", list_audio);
            } else if (type === "double") {
                let list_double = store.state.double_format;
                list.layout = store.state.formatDouble
                list_double.push(list);
                store.commit("setDouble", list_double);
            } else if (type === "reduce") {
                let list_double = store.state.video_reduce;
                list.layout = list.format
                list_double.push(list);
                store.commit("setReduce", list_double);
            }
        }
    }
}

