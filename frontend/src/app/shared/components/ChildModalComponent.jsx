import { Modal, Box, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ChildModalComponent = ({
  subModalTitle,
  subModalText,
  openChildModal,
  setOpenChildModal,
  subModalActions,
}) => {
  return (
    <>
      <Modal
        open={openChildModal}
        onClose={() => setOpenChildModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">{subModalTitle}</h2>
          <p id="child-modal-description">{subModalText}</p>
        {subModalActions}
        </Box>
      </Modal>
    </>
  );
};