import { Box, Typography, Modal, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalComponent = ({ open, onClose, title, children, actions }) => {


  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Divider sx={{m: 4}}></Divider>
          {children}
          <Divider sx={{ mt: 4}}></Divider>
         {actions}
        </Box>
      </Modal>
    </Box>
  );
};
