import axios from '../utils/config/axios.config.js';

/**
 * Login Method
 * @param {string} email to login a user
 * @param {string} password to login a user
 * @returns 
 */
export const login = (email, password) => {

  const body = {
    email,
    password
  };

  return axios.post('/auth/login', body)
};

/**
 * Register Method
 * @param {string} name to register a user
 * @param {string} lastname to register a user
 * @param {string} email to register a user
 * @param {string} password to register a user
 * @returns 
 */
export const register = (name, lastname, email, password) => {
  
  const body = {
    name,
    lastname,
    email,
    password
  };

  return axios.post('/auth/register', body)
};