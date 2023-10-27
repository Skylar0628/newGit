import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const Message = () => {

    const [ Message, setMessage ] = useState({
        type:'success', 
        title:'成功',
        text:'這是一段成功的訊息'
    })
    // 開關
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    // Fragment 裡面的關閉按鈕
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

  return (
    <div>
      <Button onClick={handleClick}>吐司元件</Button>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="吐司元件內容"
        action={action}
      />
    </div>
  )
}

export default Message
