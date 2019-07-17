import './css/SelectProperty.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Select from '../form/Select.jsx';

/**
 * 文本属性
 * @author tengge / https://github.com/tengge1
 */
class SelectProperty extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this, props.onChange);
    }

    render() {
        const { className, style, options, name, value, disabled } = this.props;

        return <Select
            className={classNames('SelectProperty', className)}
            style={style}
            options={options}
            name={name}
            value={value}
            disabled={disabled}
            onInput={this.handleChange}></Select>;
    }

    handleChange(onChange, value, name, event) {
        onChange && onChange(value, name, event);
    }
}

SelectProperty.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

SelectProperty.defaultProps = {
    className: null,
    style: null,
    options: [],
    name: null,
    value: '',
    disabled: false,
    onChange: null,
};

export default SelectProperty;