const { app } = window.require("@electron/remote")
const NO_DEV = app.isPackaged;
const path = app.getAppPath();
const fs = window.require("fs")


export function convetImageToCanvas() {
    let watermark;
    if (!NO_DEV) {
        watermark = path + "/ffp/watermark.png"
    } else {
        watermark = path.substring(0, path.lastIndexOf('app') - 1) + "/ffp/watermark.png"
    }
    let isexist = fs.existsSync(watermark)
    if (isexist) return;
    let image = new Image();
    let text = '音视频格式转换';
    let canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 50;
    let ctx = canvas.getContext('2d');
    ctx.font = '30px Verdana'
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1a88f9';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.drawImage(image, 0, 0)
    let base64 = canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, '');
    let chart = new Buffer(base64, 'base64');
    fs.writeFileSync(`${watermark.replace(/\\/g, "/")}`, chart, (error) => {
        // 创建失败
        if (error) {
            console.log(`创建失败：${error}`)
        } else {
            // 创建成功
            console.log(`创建成功！`)
        }

    })
}