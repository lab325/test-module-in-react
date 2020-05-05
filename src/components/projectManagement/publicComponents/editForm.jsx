import React, { Component } from 'react';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.module = this.props.module;
        this.state = {
            form_data: this.props.form,
        }
    }

    changeDate(date, dateString, name) {
        let form_data = this.state.form_data;
        form_data[name] = parseInt(dateString.substr(0, 4) + dateString.substr(5, 2) + dateString.substr(8, 2), 10);

        this.setState({
            form_data: form_data
        })
    }

    onChange = (e) => {
        let form_data = this.state.form_data;
        form_data[e.target.name] = e.target.value;

        this.setState({
            form_data: form_data,
        })
    }

    render() {
        let { form_data } = this.state;

        let _editForm = this.module._editForm;

        return (
            <div className="edit-form">
                {
                    _editForm.map((item, index) => {
                        let type = "text";
                        let unit = null;
                        if (item[1] === 'int' || item[1] === 'float') {
                            type = "number";
                            // 当数据为数字型时，需要单位
                            unit = item[3];
                        };
                        let value = form_data[item[0]] ? form_data[item[0]] : '';

                        let element = null;
                        if (item[1] === 'date') {
                            element = <DatePicker
                                onChange={(date, dateString) => this.changeDate(date, dateString, item[0])}
                                locale={locale}
                                value={moment(value.toString(), 'YYYYMMDD')}
                            />
                        } else {
                            element = <div key={index}>
                                <span>{item[2]}：</span>
                                <input
                                    type={type}
                                    autoComplete="off"
                                    name={item[0]}
                                    onChange={this.onChange}
                                    value={value}
                                />
                                {unit === null ? null : <span style={{ marginLeft: 8 }}>{unit}</span>}
                            </div>
                        }

                        return element;
                    })
                }
                <button onClick={() => this.module._add()}>新增</button>
            </div>
        )
    }
}

export default EditForm;