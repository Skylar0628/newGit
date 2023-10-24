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
import CouponDialog from '../../component/CouponDialog';
import Pagination from '@mui/material/Pagination';

import Swal from 'sweetalert2'


export default function AdminCoupon() {
  const [ type,setType ] = useState('add');
  const [ temCoupons,setTemCoupons ] = useState({});

  
  const [ coupons, setCoupons ] = useState([]);
  const [ open,setOpen ] = useState(false);

  const handleOpen = (type,TemCoupons)=> {
    setOpen(true);
    setType(type);
    setTemCoupons(TemCoupons);
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
    getCoupons();
  },[]);

    const getCoupons = async(page=1)=> {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_REACT_API}/admin/coupons`)
      console.log('coupons:',res);
      setCoupons(res.data.coupons);
  }

  const itemsPerPage = 5; // 每页显示的项目数
  const totalPages = Math.ceil(coupons.length / itemsPerPage); // 总页数
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
          await axios.delete(`/v2/api/${process.env.REACT_APP_REACT_API}/admin/coupon/${row.id}`)
        })();
        Swal.fire(
          '刪除成功!',
          'Your file has been deleted.',
          'success'
        )
        getCoupons();
      }
    })
  }

  return (
    <Box>
      <Stack style={{ textAlign:'start' }}>
        <h1>優惠券列表(修)</h1>
      </Stack>
      <Stack sx={{ marginBottom:'1.2rem' }}>
        <Button variant='contained' sx={{width:'100px'}} onClick={()=>handleOpen('add',{})}>
           新增列表
        </Button>
      </Stack>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
       
            <TableCell align="right">標題</TableCell>
            <TableCell align="right">折扣</TableCell>
            <TableCell align="right">到期</TableCell>
            <TableCell align="right">優惠碼</TableCell>
            <TableCell align="right">啟用狀態</TableCell>
            <TableCell align="right">編輯</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {coupons
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((row, index) => (
          <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >

          <TableCell align="right">{row.title}</TableCell>
          <TableCell align="right">{row.percent}</TableCell>
          <TableCell align="right">{new Date(row.due_date).toDateString()}</TableCell>
          <TableCell align="right">{row.code}</TableCell>
          <TableCell align="right">{row.is_enabled? '啟用':'未啟用'}</TableCell>
          <TableCell align="right">
            <Stack direction='row' justifyContent='space-end'>
            <IconButton onClick={()=> handleOpen('edit', row)}>
             <EditIcon/>
            </IconButton>

            <IconButton onClick={()=> deleteSwa(row)}>
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
   

    <CouponDialog type={type} temCoupons={temCoupons} open={open} handleClose={handleClose} getCoupons={getCoupons}/>
  </Box>
    
  );
}