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


export default function AdminDialog({open,handleClose,getProducts,type,temProduce}) {

  const [ tempData, setTempData ] = useState({
    title: "",
    category: "",
    origin_price: 100,
    price: 300,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
  });

  useEffect(()=> {
    if (type==='add') {
      setTempData({
        title: "",
        category: "",
        origin_price: 100,
        price: 300,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
      })
    } else if(type==='edit'){
      setTempData(temProduce)
    }
  },[type,temProduce]);


  
  const handleChange = (e)=> {
    const { name, value } = e.target;
    if(['price','origin_price'].includes(name)){
      setTempData({...tempData, [name]: Number(value)});
    } else if (name === 'is_enabled'){
      setTempData({...tempData, [name]: +e.target.checked});
    }
    else{
      setTempData({...tempData, [name]: value});
    }
 
  }
 
  const onSubmit = async()=> {
    let api = `/v2/api/${process.env.REACT_APP_REACT_API}/admin/product`
    let method = 'post' 
    if(type === 'edit'){
      api= `/v2/api/${process.env.REACT_APP_REACT_API}/admin/product/${temProduce.id}`
      method = 'put'
    }
      try {
         const res = await axios[method](api,{
          data: tempData
         })
         console.log(res);
         getProducts();
         handleClose();
      } catch (error) {
         console.log(error)
      }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {type === 'add'? '新稱產品列表':'編輯產品列表'}
        </DialogTitle>
        <DialogContent>
          <Grid container direction='row' justifyContent='space-between'>
            <Grid xs={3}>
            <Grid xs={11}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="輸入圖片網址"
              type="text"
              variant="outlined"
              size='small'
            />
            </Grid>
            <Grid xs={11}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="上傳圖片"
              type="file"
              size='small'
              variant="outlined"
            />
            </Grid>
            </Grid>

            <Grid xs={8}>
              <Grid xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  name='title'
                  label="標題"
                  type="text"
                  fullWidth
                  size='small'
                  variant="outlined"
                  value={tempData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid container direction='row'>
              <Grid xs={6}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name='category'
                  label="分類"
                  type="text"
                  size='small'
                  variant="outlined"
                  value={tempData.category}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={6}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="單位"
                  type="text"
                  size='small'
                  name='unit'
                  variant="outlined"
                  value={tempData.unit}
                  onChange={handleChange}
                />
              </Grid>
              </Grid>
            

              <Grid container direction='row'>
              <Grid xs={6}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  name='price'
                  label="原價"
                  type="number"
                  size='small'
                  variant="outlined"
                  value={tempData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={6}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name='origin_price'
                  label="售價"
                  type="number"
                  size='small'
                  variant="outlined"
                  value={tempData.origin_price}
                  onChange={handleChange}
                />
              </Grid>
              </Grid>
              <hr />
              <Grid xs={12}>
              <TextField
                  multiline
                  minRows={3}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="產品描述"
                  type="text"
                  size='small'
                  variant="outlined"
                  fullWidth
                  name='description'
                  value={tempData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid xs={12}>
              <TextField
                  multiline
                  minRows={3}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="說明內容"
                  type="text"
                  size='small'
                  variant="outlined"
                  fullWidth
                  name='content'
                  value={tempData.content}
                  onChange={handleChange}
                />
              </Grid>

              <Grid xs={12}>
               <FormControlLabel 
                control={<Checkbox  name='is_enabled' checked={tempData.is_enabled} onChange={handleChange} />} 
                label="是否啟用" />
              </Grid>
            </Grid>
          
          </Grid>
         
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={onSubmit}>
            {type === 'add'? '確認新增':'確認編輯'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}