import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    authModal: false,
    enUz: false,
    uzEn: false,
    enUzEdit: {
      open: false,
      data: {},
    },
    uzEnEdit: {
      open: false,
      data: {},
    },
    enUzEditStack: {
      open: false,
      data: {},
    },
    uzEnStackEdit: {
      open: false,
      data: {},
    },
    verificationModal: {
      open: false,
      data: {},
    },
  },
  reducers: {
    setAuthModal(state) {
      state.authModal = !state.authModal;
    },
    setEnUzModal(state) {
      state.enUz = !state.enUz;
    },
    setUzEnModal(state) {
      state.uzEn = !state.uzEn;
    },
    setEnUzEditModal(state, { payload }) {
      state.enUzEdit = { open: !state.enUzEdit.open, data: payload };
    },
    setUzEnEditModal(state, { payload }) {
      state.uzEnEdit = { open: !state.uzEnEdit.open, data: payload };
    },
    setEnUzEditStackModal(state, { payload }) {
      state.enUzEditStack = { open: !state.enUzEditStack.open, data: payload };
    },
    setUzEnEditStackModal(state, { payload }) {
      state.uzEnStackEdit = { open: !state.uzEnStackEdit.open, data: payload };
    },
    setVerificationModal(state, { payload }) {
      state.verificationModal = {
        open: !state.verificationModal.open,
        data: payload,
      };
    },
  },
});

export const {
  setAuthModal,
  setEnUzModal,
  setUzEnModal,
  setEnUzEditModal,
  setUzEnEditModal,
  setEnUzEditStackModal,
  setUzEnEditStackModal,
  setVerificationModal,
} = modalSlice.actions;
export default modalSlice.reducer;
