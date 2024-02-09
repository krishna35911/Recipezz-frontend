import React from 'react';
import Sidebar from './Sidebar';
import { Table } from 'react-bootstrap';

function Allusers() {
  return (
    <div className='d-flex'>
      <div><Sidebar /></div>
      <div className='mx-auto my-5'>
        <h2 className='fw-bold mt-5 mb-5 text-center'>All Users</h2>
        <Table striped bordered hover style={{width:'800px'}}>
      <thead className='text-center'>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email Id</th>
          <th>No of recipes added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><i class="fa-regular fa-trash-can text-danger"></i></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td><i class="fa-regular fa-trash-can text-danger"></i></td>
        </tr>
      </tbody>
    </Table>
      </div>
    </div>
  );
}

export default Allusers;
