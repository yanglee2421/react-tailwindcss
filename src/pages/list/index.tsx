// MUI Imports
import {
  List,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemAvatar,
  Radio,
  ListItemText,
  DialogActions,
  Box,
  ListItemSecondaryAction,
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

// Components Imports
import {} from "@/components";

export function Component() {
  return (
    <>
      <Button variant="outlined">upgrade</Button>
      <Dialog open={true} fullWidth>
        <DialogTitle>Select Payment Card</DialogTitle>
        <DialogContent>
          <List sx={{ height: 360 }}>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
            </ListItemButton>
            <ListItemButton component="label">
              <ListItemAvatar>
                <Radio />
              </ListItemAvatar>
              <ListItemText>**** **** **** 4242</ListItemText>
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </DialogContent>
        <DialogActions>
          <Box
            display={"flex"}
            gap={2}
            justifyContent={"center"}
            width={"100%"}
          >
            <Button variant="outlined" color="secondary">
              cancel
            </Button>
            <Button variant="contained">confirm</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
