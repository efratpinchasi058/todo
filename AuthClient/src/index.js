// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
// import ReactDOM from 'react-dom/client';
import reactDOM from 'react-dom/client';
import App from './App';

// const container = document.getElementById('root');
const root =reactDOM.createRoot (document.getElementById('root'));
root.render(<App />); // מציג את ה-App
