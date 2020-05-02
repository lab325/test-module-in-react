<!--
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2020-05-01 22:17:40
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-02 09:37:24
 -->
### 1 对于模块化数据组件的规划
目的：
- 1 数据请求统一打包；
- 2 数据格式统一管理；
- 3 持久数据统一存储；

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

#### 1.2 封装的方法
- 1 _add
    - 单条数据新增上传
- 2 _get
    - 批量数据获取
- 3 _put
    - 单条数据修改

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