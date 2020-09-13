//配置参数（表格）及相关事件处理函数

let mainTableConfig = {
    pagination: {
        defaultPageSize: 50,
        pageSizeOptions: [50, 100, 150, 200],
        showQuickJumper: true
    },
    // rowSelection: {
        //     type: "checkbox", // "checkbox" "radio"
        //     onChange: (selectKey, selectData) => {
        //         store.dispatch(bindEvent.table.onChange(selectData));
        //     }
        // },//{},
    columns: [
        {
            title: '序号',
            dataIndex: 'NO',
            fixed: 'left',
            width: 50
        },
        {
            title: '机种',
            dataIndex: 'SKUNO',
            fixed: 'left',
            width: 130
        },
        {
            title: 'BU',
            dataIndex: 'BU',
            width: 80
        },
        {
            title: '版本',
            dataIndex: 'VERSION',
            width: 80
        },
        {
            title: '机种名称',
            dataIndex: 'SKU_NAME',
            width: 220
        },
        {
            title: '机种类型',
            dataIndex: 'SKU_TYPE',
            width: 90
        },
        {
            title: '机种所属系列',
            dataIndex: 'SERIES_NAME'
        },
        {
            title: '客户料号',
            dataIndex: 'CUST_PARTNO',
        },
        {
            title: '客户产品编码',
            dataIndex: 'CUST_SKU_CODE',
            width: 140
        },
        {
            title: 'SN编码规则',
            dataIndex: 'SN_RULE'
        },
        // {
        //     title: 'Panel编码规则',
        //     dataIndex: 'PANEL_RULE'
        // },
        {
            title: '描述',
            dataIndex: 'DESCRIPTION',
            width: 360
        },
        {
            title: '操作',
            dataIndex: '',
            width: 120,//88,
            fixed: 'right',
            render: (d1, d2, no) => {
                return <div>
                    <Tooltip title="修改">
                        <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} style={{marginRight: '10px'}}
                            onClick={() => {store.dispatch(bindEvent.actions.edit(d1, d2))}}
                        />  
                    </Tooltip>   
                    <Tooltip title="複製">
                        <Button type="primary" shape="circle" size="small" icon={<CopyOutlined />} style={{marginRight: '10px'}} 
                            onClick={() => {store.dispatch(bindEvent.actions.copy(d1, d2))}}
                        />  
                    </Tooltip>   
                    <Tooltip title="刪除"  placement="topRight">
                        <Button type="primary" shape="circle" size="small" danger={true} icon={<DeleteOutlined />} 
                            onClick={() => {store.dispatch(bindEvent.actions.delete(d1, d2))}}
                        />  
                    </Tooltip>  
                </div>
            }
        }
    ]
}

//=================================================================================================================================



// 绑定路由 - 已配置的路由

// let tableConfig = {
//     pagination: {
//         defaultPageSize: 50,
//         pageSizeOptions: [50, 100, 150, 200],
//         showQuickJumper: true,
//         hideOnSinglePage: true
//     },
//     dataSource: tableData,
//     scroll: {x: 800},
//     columns: [
//         {
//             title: '路由名称',
//             dataIndex: 'ROUTE_NAME',
//             width: 120,
//             fixed: 'left'
//         },
//         {
//             title: '路由类型',
//             dataIndex: 'ROUTE_TYPE',
//             width: 120
//         },
//         {
//             title: '是否为默认路由',
//             dataIndex: 'DEFAULT_FLAG',
//             width: 120
//         },
//         {
//             title: '是否卡PCBA测试资料',
//             dataIndex: 'CHECK_FLAG',
//             width: 160
//         },
//         {
//             title: '默认机种',
//             dataIndex: 'DEFAULT_SKUNO'
//         },
//         {
//             title: '操作人',
//             dataIndex: 'EDIT_EMP'
//         },
//         {
//             title: '操作',
//             dataIndex: '',
//             width: 80,//88,
//             fixed: 'right',
//             render: (row, allRow, no) => {
//                 let onConfirm = (e) => {
//                     let id = row["ID"];
//                     deleteRoute([id]).then(e => {
//                         message.success("delete ok!");
//                         showAllRoutes();
//                     }, e => {
//                         message.error("delete error!");
//                     });
//                 };
//                 let onCancel = (e) => {
//                     console.log(e);
//                     message.error("no");
//                 }
//                 return <div>
//                     <Popconfirm title="你確定要刪除該路由？"  okText="Yes" cancelText="No" placement="topRight" onConfirm={onConfirm} onCancel={onCancel}>
//                         <Button type="primary" danger size="small"  loading={false}  icon={<DeleteOutlined />}> 刪除 </Button>  
//                     </Popconfirm>
//                 </div>
//             }
//         }
//     ]
// }







