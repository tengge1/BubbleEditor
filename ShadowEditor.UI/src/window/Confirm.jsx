import './css/Confirm.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Window from './Window.jsx';
import Content from '../common/Content.jsx';
import Buttons from '../common/Buttons.jsx';
import Button from '../form/Button.jsx';

/**
 * 询问框
 */
class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.handleOK = this.handleOK.bind(this, props.onOK);
        this.handleCancel = this.handleCancel.bind(this, props.onCancel);
        this.handleClose = this.handleClose.bind(this, props.onClose);
    }

    render() {
        const { className, style, title, children, hidden, mask, okText, cancelText } = this.props;

        return <Window
            className={className}
            style={style}
            title={title}
            hidden={hidden}
            mask={mask}
            onClose={this.handleClose}>
            <Content>{children}</Content>
            <Buttons>
                <Button onClick={this.handleOK}>{okText}</Button>
                <Button onClick={this.handleCancel}>{cancelText}</Button>
            </Buttons>
        </Window>;
    }

    handleOK(onOK, event) {
        onOK && onOK(event);
    }

    handleCancel(onCancel, event) {
        onCancel && onCancel(event);
    }

    handleClose(onClose, event) {
        onClose && onClose(event);
    }
}

Confirm.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    children: PropTypes.node,
    hidden: PropTypes.bool,
    mask: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOK: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
};

Confirm.defaultProps = {
    className: null,
    style: null,
    title: 'Message',
    children: null,
    hidden: false,
    mask: true,
    okText: 'OK',
    cancelText: 'Cancel',
    onOK: null,
    onCancel: null,
    onClose: null,
};

export default Confirm;