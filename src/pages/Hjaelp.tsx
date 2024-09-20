import React from 'react';
import ComposeEmail from './components/ComposeMail';
import Inbox from './components/Inbox';
import Header from './components/Header';

const Hjaelp: React.FC = () => {
  return (
    <>
        <Header />
            <div>
            <h1>Mail System</h1>
            <ComposeEmail />
            <Inbox />
        </div>
    </>
    
  );
};

export default Hjaelp;
