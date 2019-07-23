import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { itemCount, pageSize,currentPage } = this.props;
        console.log(currentPage);
        const pageCount = Math.ceil(itemCount / pageSize);
        if (pageCount == 1) return null;
        const pages = _.range(1, pageCount + 1);
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination" >

                    {pages.map(page =>
                        <li key={page} className="page-item"><a className="page-link" onClick={() => this.props.onPageChange(page)}>{page}</a></li>)
                    }
             
                
            
            </ul>
        </nav>)
    }
}

export default Pagination;
