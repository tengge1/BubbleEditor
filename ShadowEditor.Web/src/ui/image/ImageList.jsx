import './css/ImageList.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon.jsx';
import IconButton from '../form/IconButton.jsx';
import Input from '../form/Input.jsx';

/**
 * 图片列表
 * @author tengge / https://github.com/tengge1
 */
class ImageList extends React.Component {
    constructor(props) {
        super(props);

        const { onClick, onEdit, onDelete } = props;

        this.state = {
            pageSize: 6,
            pageNum: 0,
        };

        this.handleFirstPage = this.handleFirstPage.bind(this);
        this.handleLastPage = this.handleLastPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);

        this.handleClick = this.handleClick.bind(this, onClick);
        this.handleEdit = this.handleEdit.bind(this, onEdit);
        this.handleDelete = this.handleDelete.bind(this, onDelete);
    }

    render() {
        const { className, style, data, firstPageText, lastPageText, currentPageText, previousPageText, nextPageText } = this.props;
        const { pageSize, pageNum } = this.state;

        const totalPage = this.getTotalPage();

        const current = data.filter((n, i) => {
            return i >= pageSize * pageNum && i < pageSize * (pageNum + 1);
        });

        return <div className={classNames('ImageList', className)} style={style}>
            <div className={'content'}>
                {current.map(n => {
                    return <div className={'item'} name={n.id} key={n.id} onClick={this.handleClick}>
                        {n.src ?
                            <img className={'img'} src={n.src}></img> :
                            <div className={'no-img'}>
                                <Icon icon={n.icon}></Icon>
                            </div>}
                        <div className={'title'}>{n.title}</div>
                        {n.cornerText && <div className={'cornerText'}>{n.cornerText}</div>}
                        <IconButton className={'edit'} icon={'edit'} name={n.id} onClick={this.handleEdit}></IconButton>
                        <IconButton className={'delete'} icon={'delete'} name={n.id} onClick={this.handleDelete}></IconButton>
                    </div>;
                })}
            </div>
            <div className={'page'}>
                <IconButton icon={'backward'} title={firstPageText} onClick={this.handleFirstPage}></IconButton>
                <IconButton icon={'left-triangle2'} title={previousPageText} onClick={this.handlePreviousPage}></IconButton>
                <Input className={'current'} value={(pageNum + 1).toString()} title={currentPageText} disabled={true} />
                <IconButton icon={'right-triangle2'} title={nextPageText} onClick={this.handleNextPage}></IconButton>
                <IconButton icon={'forward'} title={lastPageText} onClick={this.handleLastPage}></IconButton>
                <div className={'info'}>
                    共<span>{totalPage}</span>页
                </div>
            </div>
        </div>;
    }

    handleFirstPage() {
        this.setState({
            pageNum: 0,
        });
    }

    handleLastPage() {
        const totalPage = this.getTotalPage();

        this.setState({
            pageNum: totalPage < 1 ? 0 : totalPage - 1,
        });
    }

    handleNextPage() {
        this.setState(state => {
            const totalPage = this.getTotalPage();

            return {
                pageNum: state.pageNum < totalPage - 1 ? state.pageNum + 1 : totalPage - 1,
            };
        });
    }

    handlePreviousPage() {
        this.setState(state => {
            return {
                pageNum: state.pageNum > 0 ? state.pageNum - 1 : 0,
            };
        });
    }

    handleClick(onClick, event) {
        event.stopPropagation();

        const id = event.target.getAttribute('name');
        const data = this.props.data.filter(n => n.id === id)[0];

        onClick && onClick(data, event);
    }

    handleEdit(onEdit, name, event) {
        event.stopPropagation();

        const data = this.props.data.filter(n => n.id === name)[0];

        onEdit && onEdit(data, event);
    }

    handleDelete(onDelete, name, event) {
        event.stopPropagation();

        const data = this.props.data.filter(n => n.id === name)[0];

        onDelete && onDelete(data, event);
    }

    getTotalPage() {
        const total = this.props.data.length;
        const pageSize = this.state.pageSize;
        return total % pageSize === 0 ? total / pageSize : parseInt(total / pageSize) + 1;
    }
}

ImageList.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
    onClick: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    firstPageText: PropTypes.string,
    lastPageText: PropTypes.string,
    currentPageText: PropTypes.string,
    previousPageText: PropTypes.string,
    nextPageText: PropTypes.string,
};

ImageList.defaultProps = {
    className: null,
    style: null,
    data: [],
    onClick: null,
    onEdit: null,
    onDelete: null,
    firstPageText: 'First Page',
    lastPageText: 'Last Page',
    currentPageText: 'Current Page',
    previousPageText: 'Previous Page',
    nextPageText: 'Next Page',
};

export default ImageList;