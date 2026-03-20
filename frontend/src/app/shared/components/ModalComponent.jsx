import { Box, Typography, Modal, Grid } from "@mui/material";
import { ButtonComponent } from "./ButtonComponent";

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

export const ModalComponent = ({ open, onClose, modalTitle, modalText }) => {
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
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalText}
          </Typography>
          <Grid
            container
            spacing={10}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              justifyContent: 'end'
            }}
          >
            <Grid  size={5}>
              <ButtonComponent
                type="submit"
                buttonTitle="Delete"
                size={"large"}
                sx={{
                  width: "100%",
                  height: "50px",
                  mt: 4,
                  fontSize: "17px",
                  textTransform: "none",
                  letterSpacing: "1.2px",
                  backgroundColor: "var(--primary)",
                }}
              />
            </Grid>
            <Grid size={5}>
              <ButtonComponent
                type="submit"
                buttonTitle="Edit"
                size={"large"}
                sx={{
                  width: "100%",
                  height: "50px",
                  mt: 4,
                  fontSize: "17px",
                  textTransform: "none",
                  letterSpacing: "1.2px",
                  backgroundColor: "var(--secondary)",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};
