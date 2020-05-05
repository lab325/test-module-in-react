<!--
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2020-05-01 22:17:40
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 15:21:42
 -->
### 1 对于模块化数据组件的规划
目的：
- 1 数据请求统一打包；
- 2 数据格式统一管理；
- 3 持久数据统一存储；
    - 取消，仅实现获取数据的暂存；
    - 且 UI 组件获取到数据后，需要将暂存的数据情况，还原为空数组；

文件地址： ./src/dataModule；

#### 1.1 封装的属性
- 1 this._dataStructure，基础数据结构；
    ```
    this._dataStructure = {
        projectID: '',
        name: '',
        code: '',
        proposal_code: '',
        contract_code: '',
        customer: '',
        budget: 0.0,
        createBy: '',
        createDate: '',
        status: 0
    };
    ```
- 2 this._viewForm，展示表单属性列表
    - 对于需要计量单位的，在第四项中声明
    ```
    this._viewForm = [
        ['name', 'str', '项目名称'],
        ['code', 'str', '代码'],
        ['proposal_code', 'str', '立项号'],
        ['contract_code', 'str', '合同编号'],
        ['customer', 'str', '客户单位'],
        ['budget', 'float', '预算金额'],
        ['createBy', 'str', '创建人'],
        // 注意，此处的日期最终是 bigint
        ['createDate', 'date', '创建日期'],
    ];
    ```
- 3 this._editForm，编辑表单属性列表
    - 对于需要计量单位的，在第四项中声明
    ```
    this._editForm = [
        ['name', 'str', '项目名称'],
        ['proposal_code', 'str', '立项号'],
        ['contract_code', 'str', '合同编号'],
        ['customer', 'str', '客户单位'],
        ['budget', 'float', '预算金额', '￥'],
    ];
    ```

#### 1.2 方法继承
直接继承 src/dataModule/publicRequest.js 中的 PublicRequest 类；
_add 和 _get 的形参均有默认参数，可以在不传参的情况下直接使用；
- _add 方法中暂时只实现获取指定长度区间的数据；
- 对于向表格渲染的数组中添加空元素等操作由表格 UI 实现，经实验，该功能不适合直接写在 _add() 中；

#### 1.3 方法使用
- 1 组件首次加载时在 componentDidMount 中进行调用函数；
- 2 组件本时 UI 渲染所用数据不使用 dataModule 中的数据，而是使用自身的 store；
- 3 组件在 componentDidUpdate 完成新数据的获取和赋值，并且每次获取完数据后需要将 dataModule 的 store 中的源数据情况，避免陷入无限循环渲染的状态；

### 2 自数据组件延申的 Form
#### 2.1 ViewForm
文件地址： ./src/projectManagement/publicComponents/viewForm.jsx

##### 1 使用语法
- 例见 ./src/projectManagement/index.jsx
    ```
    <ViewForm form={projectList[0]} module={this.ProjectModule} />
    ```
- form 是当前数据，用于展示；
- module 是数据组件中封装的对象，这里面只用到了 _viewForm；
- 可以考虑进一步简化传输的数据；

##### 2 备注
- 时间（date，假设为八位整数）的展示进行了特殊处理；
- 数字（如浮点和整数）的展示后部可以添加计量单位，可以是字符或组件；

#### 2.2 EditForm
文件地址： ./src/projectManagement/publicComponents/editForm.jsx

##### 1 使用语法
- 例见 ./src/projectManagement/index.jsx
    ```
    <EditForm form={projectList[0]} module={this.ProjectModule} />
    ```
- form 是当前数据，用于展示；
- module 是数据组件中封装的对象，这里面只用到了 _eidtForm；
- 可以考虑进一步简化传输的数据；

##### 2 备注
- 1 数字（如浮点和整数）的输入框后部可以添加计量单位，可以是字符或组件；
    - 另，当前使用的是数字输入框，原生输入框，不是 bootstrap 或 antd；
- 2 日期 输入框直接使用的 antd 组件，时间选择上未作限制，已进行本地化；


### 其他
#### 1 表格跳页查看
```
    // 跳页查看，
    dealWithForwardSkipScanning(dataList, start, _dataStructure) {
        if (start === 0 || dataList.length >= start) return;
        for (let i = dataList.length; i < start; i++) {
            dataList.push(_dataStructure)
        }
        return dataList;
    }

    dealWithBackwardSkipScanning(dataList, start, newList, _dataStructure) {
        // 判断此时列表是否为 0，且请求起始位是否等于初始值
        console.log("if前", start, JSON.stringify(dataList[start]) !== JSON.stringify(_dataStructure));
        console.log(JSON.stringify(dataList[start]), JSON.stringify(_dataStructure));

        if (start === 0 || JSON.stringify(dataList[start]) !== JSON.stringify(_dataStructure)) return;
        console.log(dataList, start, newList, _dataStructure);
        for (let i = start; i < start + newList.length - 1; i++) {
            dataList[i] = newList[i - start];
        }
    }
```