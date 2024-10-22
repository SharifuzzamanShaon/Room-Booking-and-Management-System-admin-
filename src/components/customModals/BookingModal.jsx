"use client";
import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ReservationDatePick from "../ReservationDatePick";

const BookingModal = ({ isOpenModal, setOpenModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Modal
        open={isOpenModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-white rounded-[8px] shadow-lg p-4">
          <Typography
            className={"text-white"}
            variant="h6"
            component="h2"
          >
            <ReservationDatePick />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingModal;
