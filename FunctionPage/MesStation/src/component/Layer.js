
//  工站弹出层 （提示框 操作框）

let Layer = () => {
    return <Modal key="errormessage" title="Station error message" visible={false} onOk={ () => {} } onCancel={ () => {} } >
        <span style={{lineHeight: '30px', fontWeight: 700}}>报错信息： XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ?</span>
        <Input size="middle" placeholder="请输入“FAIL”或点击enter按钮关闭该弹窗！"  onChange={ () => {} } />
    </Modal>
}