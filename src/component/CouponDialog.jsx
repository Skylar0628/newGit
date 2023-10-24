import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  Grid } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


export default function CouponDialog({open,handleClose,getCoupons,type,temCoupons}) {

  const [ date,setDate ] = useState(new Date());
  console.log(date)

  const [ tempData, setTempData ] = useState({
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: "testCode"
  });

  useEffect(()=> {
    if (type==='add') {
      setTempData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: "testCode"
      })
      setDate(new Date())
    } else if(type==='edit'){
      setTempData(temCoupons)
      setDate(new Date(tempData.due_date))
    }
  },[type,temCoupons]);


  
  const handleChange = (e)=> {
    const { name, value } = e.target;
    if (name === 'is_enabled'){
      setTempData({...tempData, [name]: +e.target.checked});
    }
    else{
      setTempData({...tempData, [name]: value});
    }
 
  }
 
  const onSubmit = async()=> {

    let api = `/v2/api/${process.env.REACT_APP_REACT_API}/admin/coupon`
    let method = 'post' 
    if(type === 'edit'){
      api= `/v2/api/${process.env.REACT_APP_REACT_API}/admin/coupon/${temCoupons.id}`
      method = 'put'
    }
      try {
         const res = await axios[method](api,{
           data: {
            ...tempData,
            due_date: date.getTime(),
           }
         })
         console.log(res);
         getCoupons();
         handleClose();
      } catch (error) {
         console.log(error)
      }
  }

  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {type === 'add'? '新稱優惠券':'編輯優惠券'}
        </DialogTitle>
        <DialogContent>
          <Grid container direction='row' justifyContent='space-between'>
           <Grid xs={12}>
           <TextField
              autoFocus
              margin="dense"
              id="title"
              label="標題"
              type="text"
              variant="outlined"
              size='small'
              name='title'
              value={tempData.title}
              onChange={handleChange}
            />
           </Grid>
           <Grid xs={6}>
           <TextField
              autoFocus
              margin="dense"
              label="折扣 (%)"
              type="text"
              variant="outlined"
              size='small'
              name='percent'
              value={tempData.percent}
              onChange={handleChange}
            />
           </Grid>
           <Grid xs={6}>
           <TextField
              autoFocus
              margin="dense"
              id="title"
              label="到期日"
              type="date"
              variant="outlined"
              size='small'
              name='due_date'
              value={
                `${date.getFullYear.toString}-
                 ${(date.getMonth() + 1).toString().padStart(2,0)}-
                 ${date.getDate.toString().padStart(2,0)}`}
              onChange={
                (e)=> setDate(new Date(e.target.value))}
            />
           </Grid>
           <Grid xs={6}>
           <TextField
              autoFocus
              margin="dense"
              id="title"
              label="優惠碼"
              type="text"
              variant="outlined"
              size='small'
              placeholder='請輸入優惠碼...'
              name='code'
              value={tempData.code}
              onChange={handleChange}
            />
           </Grid>

           <Grid xs={12}>
               <FormControlLabel 
                control={<Checkbox  name='is_enabled' checked={tempData.is_enabled} onChange={handleChange} />} 
                label="是否啟用" />
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={onSubmit}>
            儲存
          </Button>
        </DialogActions>

        
      </Dialog>
    </div>
  );
}