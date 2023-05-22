import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import api from "./../../service/api";
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import { NotificationManager } from 'react-notifications'
import { Button } from 'react-bootstrap';
import {BsFillTrashFill} from "react-icons/bs"


function Table({ columns, data }) {
  
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({columns, data,})

  // Render the UI for your table
  return (
    <BTable striped hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
  )
}

const List = () => {


  const [products, setProducts] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
          {
            Header: 'Product name',
            accessor: 'name',
          },
          {
            Header: 'Price',
            Cell: ({row}) => {
              var price = row.original.price;
              return '$' + parseFloat(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }
          },
          {
            Header: 'Category',
            accessor: 'category_name',
          },
          {
            Header: 'Category Tax (%)',
            accessor: 'category_tax',
          },
          {
            Header: ' ',
            Cell: ({row}) => {
              var product_id = row.original.id;
              
              const Delete = function (product_id) {
                if(product_id > 0){
                  api.post("product/delete.php", {id: product_id}).then((response) => {
                    if(response.data.status === 'success'){
                      NotificationManager.success('Product deleted with success!', 'Success!');
                      getProducts();
                    }
                    else{
                      NotificationManager.error(response.data.message, 'Error!');
                    }
                  })
                  .catch((err) => {
                    NotificationManager.error('Oops! Unable delete product. Try again.', 'Error');
                  });
                }
              }

              return <Button variant="secondary" size="sm" onClick={() => Delete(product_id)}><BsFillTrashFill /></Button>
            }
          },
        ],
      }
    ],
    []
  )

  async function getProducts () {
    try {
      const products = await api.get('product/get.php');
      setProducts(products.data);
    } catch (error) {
      NotificationManager.error('Oops! Unable to load categories. Reload the page, please.', 'Error!');
    }
  }

  useEffect(() => {
      getProducts();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'><h2>Product</h2><h6 className='subtitle'>List</h6></div>
      </div>
      <div className='row'>
        <div className='col'>
          <hr></hr>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {products.length > 0 && <Table columns={columns} data={products} />}
          {
            products.length === 0 && 
            <Alert key="secondary" variant="secondary">
                No record =(
            </Alert>
          }
        </div>
      </div>
    </div>
  );
};

export default List;