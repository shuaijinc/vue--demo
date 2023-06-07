import { Message } from 'element-ui';
let messageInstance = null;
const resetMessage = (options, close) => {
    if (messageInstance) {
        messageInstance.close()
    }
    messageInstance = Message(options)
    if (close) {
        messageInstance.close()
    }
}
['error', 'success', 'info', 'warning'].forEach(type => {
    resetMessage[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return resetMessage(options)
    }
})
export const message = resetMessage