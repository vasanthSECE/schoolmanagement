import API from '../../utils/api';
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getRequest,
  getFailed,
  getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await API.post(`/${role}Login`, fields);
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    dispatch(authError(message));
  }
};

export const registerUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await API.post(`/${role}Reg`, fields);
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data));
    } else if (result.data.school) {
      dispatch(stuffAdded());
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Registration failed';
    dispatch(authError(message));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await API.get(`/${address}/${id}`);
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch user';
    dispatch(getError(message));
  }
};

export const deleteUser = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  dispatch(getFailed("Sorry, the delete function has been disabled for now."));
};

export const updateUser = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await API.put(`/${address}/${id}`, fields);
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Update failed';
    dispatch(getError(message));
  }
};

export const addStuff = (fields, address) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await API.post(`/${address}Create`, fields);
    if (result.data.message) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to add';
    dispatch(authError(message));
  }
};
export const deleteStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await API.delete(`/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to delete';
    dispatch(getError(message));
  }
};