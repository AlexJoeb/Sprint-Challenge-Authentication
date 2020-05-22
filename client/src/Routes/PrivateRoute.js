import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => token ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }} />
                )
            }
        />
    );
};

export default connect(({ token }) => ({ token }))(PrivateRoute);