export default {
    interval: null,
    onTouchStart: function (e, footer) {
        /**
         * @type {HTMLElement}
         */
        const el = e.target;
        const action = el.getAttribute('action');

        if (!action || ['left', 'right', 'up', 'down'].indexOf(action) < 0) return;

        const editor = editorManager.editor;
        const $textarea = editor.textInput.getElement();
        const shiftKey = footer.querySelector('#shift-key').getAttribute('data-state') === 'on' ? true : false;

        if (editorManager.state === 'focus') editor.focus();

        document.ontouchend = () => {
            this.onTouchEnd();
            document.ontouchend = null;
        }

        switch (action) {
            case 'left':
                this.dispatchKey(37, shiftKey, $textarea);
                break;

            case 'right':
                this.dispatchKey(39, shiftKey, $textarea);
                break;

            case 'up':
                this.dispatchKey(38, shiftKey, $textarea);
                break;

            case 'down':
                this.dispatchKey(40, shiftKey, $textarea);
                break;
        }
    },
    onTouchEnd: function () {
        if (this.interval) clearInterval(this.interval);
    },
    dispatchKey: function (key, shiftKey, $textarea) {
        dispatchEvent();
        this.interval = setInterval(dispatchEvent, 100);

        function dispatchEvent() {
            const keyevent = new KeyboardEvent("keydown", {
                key,
                keyCode: key,
                shiftKey
            });

            $textarea.dispatchEvent(keyevent);
        }
    }
}