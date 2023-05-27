const express = require("express");

function isAuth() {
    return (req, res, next) => {
        if (req.employer) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.employer) {
            next();
        } else {
            res.status(401).json({ message: 'You are allready signed in' });
        }
    }
}

module.exports = {
    isAuth,
    isGuest,
}