export default class LodopPrint {

    // 实例化打印类
    constructor(pageFrame) {
        debugger
        this.pageFrame = pageFrame;  // 纸张的尺寸
        this.top = pageFrame.top;
        this.left = pageFrame.left;
        this.marginLeft = pageFrame.left;
        this.marginTop = pageFrame.top;
        this.fontSize = 9;
        let LODOP = getLodop();  // 获取打印机插件对象
        if (LODOP) {
            LODOP.PRINT_INIT("打印控件功能演示");  // 打印机插件初始化
            LODOP.SET_PRINT_PAGESIZE(1, `${pageFrame.width}mm`, `${pageFrame.height}mm`, "LodopCustomPage");  // 设置纸张大小
            this.LODOP = LODOP;
        }else {
            console.log("初始化打印机插件失败");
        }
    }

    //  获取字符串长度（汉字算两个字符，字母数字算一个）
    getByteLen = (val) => {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                    len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    }

    // 打印二维码
    renderQRCode() {
		this.LODOP.ADD_PRINT_BARCODE(`${this.top}mm`, `${this.left}mm`, "20mm", "20mm", "QRCode", this.textMessage.value);
    }

    // 打印纯文本
    renderText = (width) => {
        if (!width) {
            width = this.pageFrame.width - this.marginLeft*2;
        }
        let height = this.getTextHeight(width);
        this.LODOP.ADD_PRINT_HTM(`${this.top}mm`, `${this.left}mm`, `${width}mm`, `${height}mm`, `<p style='font-size: ${this.textMessage.fontSize}px; font-weight: bold; text-align: ${this.textMessage.textAlign}; color:#000;'>${this.textMessage.value}:</p>`);   
        if (this.left + width < this.pageFrame.width/2) {
            this.left = this.left + width;
        }else {
            this.top = this.top + height;
        }
    }

    // 打印带下划线的文本
    renderTextWithUnderLine = () => {
        let width = this.pageFrame.width - this.marginLeft - this.left;
        let height = this.getTextHeight(width);
        this.LODOP.ADD_PRINT_HTM(`${this.top}mm`, `${this.left}mm`, `${width}mm`, `${height}mm`,  `<p style='font-size: ${this.textMessage.fontSize}px; font-weight: bold; text-align: ${this.textMessage.textAlign}; color:#000;'>${this.textMessage.value}:</p>`);  
        //  渲染下划线
        this.LODOP.ADD_PRINT_LINE(`${this.top+height}mm`, `${this.left}mm`, `${this.top+height}mm`, "57mm", 0, 1);
        
        this.top = this.top + height;
        this.left = this.marginLeft;
    }

    // 获取文字宽度
    getTextWidth = () => {
        // 计算文字宽度
        let textWidth = this.getByteLen(this.textMessage.value)*1.5*(this.textMessage.fontSize/9.0);
        return textWidth;
    }

    // 获取文字的高度
    getTextHeight = (width) => {
        let textWidth = this.getByteLen(this.textMessage.value)*1.5;
        // 计算文字高度
        let height = this.textMessage.fontSize*0.5*(textWidth/width+1);
        return height;
    }

    renderText = (text) =>{
        this.context = text
        return this
    }

    renderTextGroup = (data) => {
        data.forEach(element => {
            this.textMessage = {
                value: element.value,
                fontSize: element.fontSize,
                textAlign: element.textAlign,
            }
            if (element.top)  this.top = element.top;
            if (element.left)  this.left = element.left;
            
            if (element.isNoValue) {
                this.renderText(null);
            }else if(element.isQRCode) {

            }else {
                if (element.isTitle) {
                    let width = this.getTextWidth();
                    this.renderText(width);
                }else {
                    this.renderTextWithUnderLine();
                }
            }
        });
    }
}