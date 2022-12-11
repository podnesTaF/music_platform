import React from 'react';
import {wrapper} from '../store';
import {AppProps} from 'next/app';
import '../styles/globals.css'

class MyApp extends React.Component<AppProps> {S
    render() {
        const {Component, pageProps} = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(MyApp);