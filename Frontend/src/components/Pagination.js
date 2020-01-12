import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { fetchStocks } from '../actions';

class Pagination extends Component {

    generatePages(){
        const {totalItem} = this.props;
        const {itemPerPage} = this.props;
        const limit = totalItem / itemPerPage;
        const pages = _.range(1, limit + 1);
        return _.map(pages, page => {
            return <Link key={page} 
                         to={`/cart?pageIndex=${page}`}
                         className={this.props.pageIndex == page ? 'active': ''}
                         onClick={() => {
                                            this.props.fetchStocks(page, itemPerPage);
                                            this.props.updatePageIndexCursor(page);
                                        }
                                 }>
                        {page}
                    </Link>
        });
    }

    render() {
        return (
        <div className="pagination">
            {this.generatePages()}
        </div>
        );
    }
}
export default withRouter(connect(null, {fetchStocks})(Pagination));