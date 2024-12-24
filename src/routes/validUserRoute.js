// import React from 'react';

const validUserRoute = () => {
    const userData = localStorage.getItem('userEmail');
    console.log(userData);

    return userData;
};

export default validUserRoute();
