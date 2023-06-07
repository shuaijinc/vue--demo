
import { scalpFoler } from './choice'


export function files(e, format, list, type) {
    e.stopPropagation();
    e.preventDefault();
    let { files, items } = e.dataTransfer;
    if (items && items.length && items[0].webkitGetAsEntry != null) {
        addFilesItems(items, files, format, list, type);
    }
    return false;
}

export function addFilesItems(items, files, format, list, type) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var entry;
        if (item.webkitGetAsEntry && (entry = item.webkitGetAsEntry())) {
            if (entry.isFile) {
                scalpFoler(files, format, list, type)
            } else if (entry.isDirectory) {
                addFilesFormDirectory(entry, entry.name, format, list, type);
            }
        }
    }
}


export function addFilesFormDirectory(directory, path, format, list, type) {
    const dirReader = directory.createReader()
    const that = this
    dirReader.readEntries(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isFile) {
                entry.file(function (file) {
                    file.fullPath = path + '/' + file.name
                    scalpFoler([file], format, list, type)
                })
            } else if (entry.isDirectory) {
                addFilesFormDirectory(entry, path + '/' + entry.name,format, list, type)
            }
        })
    })
}