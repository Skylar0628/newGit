import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';
import AdminDialog from '../../component/AdminDialog';

import Pagination from '@mui/material/Pagination';


import Swal from 'sweetalert2'

export default function AdminProduct() {
  const [ type,setType ] = useState('add');
  const [ temProduce,setTemProduce ] = useState({});

  
  const [ rows, setrows ] = useState([]);
  const [ pagination,setPaginaion ] = useState({});
  const [ open,setOpen ] = useState(false);

  const handleOpen = (type,temProduce)=> {
    setOpen(true);
    setType(type);
    setTemProduce(temProduce);
  }
  const handleClose = ()=> {
    setOpen(false) 
  }
 
  useEffect(()=> {
    // 取出token
    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('MyToken='))
    ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = token;
    getProducts();
  },[]);

  const getProducts = async()=> {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_REACT_API}/admin/products`)
      console.log('getProducts:',res);
      setrows(res.data.products);
  }

  const itemsPerPage = 5; // 每页显示的项目数
  const totalPages = Math.ceil(rows.length / itemsPerPage); // 总页数
  const [currentPage, setCurrentPage] = useState(1); // 当前页的状态

  // 处理分页变化的函数
  const handlePagination = (event, page) => {
    setCurrentPage(page);
  };

  const deleteSwa = (row)=> {
    Swal.fire({
      title: `確定刪除${row.title}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        (async()=>{
          await axios.delete(`/v2/api/${process.env.REACT_APP_REACT_API}/admin/product/${row.id}`)
        })();
        Swal.fire(
          '刪除成功!',
          'Your file has been deleted.',
          'success'
        )
        getProducts();
      }
    })
  }


  return (
    <Box>
      <Stack style={{ textAlign:'start' }}>
        <h1>產品列表(改名)</h1>
      </Stack>
     
      <Stack sx={{ marginBottom:'1.2rem' }}>
        <Button variant='contained' sx={{width:'100px'}} onClick={()=>handleOpen('add',{})}>
           新增列表
        </Button>
      </Stack>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550, maxHeight:'300px', minHeight:'300px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>分類</TableCell>
            <TableCell align="right">名稱</TableCell>
            <TableCell align="right">售價</TableCell>
            <TableCell align="right">啟用狀態</TableCell>
            <TableCell align="right">編輯</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {rows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((row, index) => (
          <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.category}
          </TableCell>
          <TableCell align="right">{row.title}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.is_enabled? '啟用':'未啟用'}</TableCell>
          <TableCell align="right">
            <Stack direction='row' justifyContent='space-end'>
              {/* 編輯 */}
            <IconButton >
             <EditIcon/>
            </IconButton>
              {/* 刪除 */}
            <IconButton onClick={()=>deleteSwa(row)}> 
              <DeleteIcon/>
            </IconButton>
            </Stack>
           
          </TableCell>
        </TableRow>
        ))}
        
        </TableBody>
      </Table>
    </TableContainer>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end',marginTop:'1.2rem' }}>
     <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePagination}/> 
     
    </Box>
   

    <AdminDialog type={type} temProduce={temProduce} open={open} handleClose={handleClose} getProducts={getProducts}/>
  </Box>
    
  );
}