import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { DOMMessageResponse, DOMMessage } from './types'

function App() {
  const [title, setTitle] = React.useState(8);
  const buttonHandler = () => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
    /**
     * Sends a single message to the content script(s) in the specified tab,
     * with an optional callback to run when a response is sent back.
     *
     * The runtime.onMessage event is fired in each content script running
     * in the specified tab for the current extension.
     */
      chrome.tabs.sendMessage(
      tabs[0].id || 0,
      { type: 'GET_DOM' } as DOMMessage,
      (response: DOMMessageResponse) => {
        setTitle(response.test)
      });
    });
  }


  return (
    <div className="App">
      <button onClick={buttonHandler}>LCick</button>
      <div>
      {title}
      </div>
    </div>
  );
}

export default App;
